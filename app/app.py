from flask import Flask, request, jsonify, session, abort, escape, app, g
import json, os, sys
import flask
from config import *
from passlib.hash import sha256_crypt, oracle10
from werkzeug.security import generate_password_hash, check_password_hash
import hashlib
from itsdangerous import URLSafeTimedSerializer
from datetime import timedelta



app = Flask(__name__)
app.secret_key = "a_random_secret_key_$%#!@"

SECRET_KEY = "a_random_secret_key_$%#!@"
login_serializer = URLSafeTimedSerializer(SECRET_KEY)

@app.route('/')
def hello():
    return "Hello! :)"


# Signup
@app.route('/signup', methods=['POST'])
def signup():
    jsn = json.loads(request.data)

    fname = jsn['fname']
    mname = jsn['mname']
    lname = jsn['lname']
    email = jsn['email']
    password = jsn['password']
    address = jsn['address']
    mobile_no = jsn['mobile_no']
    role_id = jsn['role_id']
    

    pw_hash = hashlib.md5(password.encode())

    res = spcall('new_user', (fname, mname, lname, email, pw_hash.hexdigest(), address, str(mobile_no), role_id), True)

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    elif res[0][0] != 'Ok':
        return jsonify ({'status': 'Error', 'message': res[0][0]})

    elif invalid(email):
        return jsonify({'status': 'Error', 'message': 'Invalid Email address'})

    else:
        return jsonify({"status": "Ok", "message": res[0][0]})


def get_auth_token(email, password):
    """
    Encode a secure token for cookie
    """
    data = [email, password]
    return login_serializer.dumps(data)


def load_token(token):
    """
    The Token was encrypted using itsdangerous.URLSafeTimedSerializer which
    allows us to have a max_age on the token itself.  When the cookie is stored
    on the users computer it also has a exipry date, but could be changed by
    the user, so this feature allows us to enforce the exipry date of the token
    server side and not rely on the users cookie to exipre.
    source: http://thecircuitnerd.com/flask-login-tokens/
    """
    days = timedelta(days=14)
    max_age = days.total_seconds()

    # Decrypt the Security Token, data = [username, hashpass]
    data = login_serializer.loads(token, max_age=max_age)

    return data[0] + ':' + data[1]


@app.route('/decrypt', methods=['POST'])
def decr():
    credentials = json.loads(request.data)
    token = credentials['token']

    return jsonify({'status': 'Ok', 'token': load_token(token)})


@app.route('/home/<string:token>', methods=['GET'])
def index(token):
    days = timedelta(days=14)
    max_age = days.total_seconds()

    # Decrypt the Security Token, data = [username, hashpass]
    email = login_serializer.loads(token, max_age=max_age)

    user = spcalls.spcall('get_user_by_email', (email,))
    entry = []

    for u in user:
        entry.append({'id': u[0], 'fname': u[1], 'mname': u[2], 'lname': u[3], 'email': u[10], 'role': u[8]})

    return jsonify({'status': 'Ok', 'message': 'Welcome user', 'data': entry})



@app.route('/login/', methods=['POST'])
def login():
    jsn = json.loads(request.data)

    email = jsn['email_address']
    password = jsn['password']  

    pw_hash = hashlib.md5(password.encode())
    check_email_password = spcall('check_email_password', (email, pw_hash.hexdigest(), ))
    token = get_auth_token(email, pw_hash.hexdigest())


    if not email or not password:
        return jsonify ({'status': 'Error', 'message': 'Please fill the required field/s'})
    
    elif check_email_password[0][0] == 'Ok':
        user = spcall('get_user_by_email', (email,))
        res = []

        r = user[0]
        res.append({   
                'id': str(r[0]), 
                'fname': str(r[1]), 
                'mname': str(r[2]), 
                'lname': str(r[3]),
                'email': str(r[4]),
                'role_id': str(r[8])
                })

        return jsonify({"status": "Ok", "message": "Ok", "entries": res, "token": token})  
    
    elif check_email_password[0][0] != 'Ok':
        return jsonify({"status": "Error", "message": check_email_password[0][0]})


# Get User Profile
@app.route('/users/<int:id>/', methods=['GET'])
def get_user_by_id(id):
    user = spcall('get_userprofile',(id,))
    res = []

    if len(user) == 0:
        return jsonify({"status": "Error", "message": "No User Found", "entries": []})

    elif 'Error' in str(user[0][0]):
        return jsonify({"status": "Error", "message": user[0][0]})

    else:
        r = user[0]
        res.append({   
                'id': str(id), 
                'fname': str(r[1]), 
                'mname': str(r[2]), 
                'lname': str(r[3]),
                'email': str(r[4]),
                'password': str(r[5]),
                'address': str(r[6]),
                'mobile_no': str(r[7]),
                'role_id': str(r[8])
                })

        return jsonify({"status": "Ok", "message": "Ok", "entries": res})


# Update User Profile
@app.route('/users/update/<int:user_id>/', methods=['PUT'])
def update_useraccount(user_id):
    jsn = json.loads(request.data)

    fname = jsn['fname']
    mname = jsn['mname']
    lname = jsn['lname']
    email = jsn['email']
    address = jsn['address']
    mobile_no = jsn['mobile_no']

    res = spcall('update_useraccount',(user_id, fname, mname, lname, email, address, mobile_no), True)

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})
    else:
        return jsonify({'status': 'Ok'})


# Add new gadget
@app.route('/gadgets/', methods=['POST'])
def new_gadget():
    jsn = json.loads(request.data)

    gadget_name = jsn['gadget_name']
    gadget_description = jsn['gadget_description']
    gadget_model = jsn['gadget_model']
    gadget_color = jsn['gadget_color']
    gadget_image = jsn['gadget_image']
    rental_rate = jsn['rental_rate']
    gadget_brand_id = jsn['gadget_brand_id']
    gadget_category_id = jsn['gadget_category_id']
    gadget_owner_id = jsn['gadget_owner_id']
 
    complete_fields = gadget_name is not '' and gadget_description is not '' and gadget_model is not '' and gadget_color is not '' and gadget_image is not '' and rental_rate is not '' and gadget_brand_id is not '' and gadget_category_id is not '' and gadget_owner_id is not ''

    if complete_fields is True:
        res = spcall('new_gadget', (gadget_name, gadget_description, gadget_model, gadget_color, gadget_image, rental_rate, gadget_brand_id, gadget_category_id, gadget_owner_id), True)

        if 'Error' in str(res[0][0]):
            return jsonify({'status': 'Error', 'message': res[0][0]})
        
        elif res[0][0] == 'Ok':
            return jsonify({"status": "Ok", "message": res[0][0]})
        
        else:
            return jsonify({"status": "Error", "message": res[0][0]})
   
    elif complete_fields is False:
        return jsonify({"status": "Error", "message": "Please fill the required field/s"})


# View Gadget
@app.route('/gadgets/<int:id>/', methods=['GET'])
def get_gadget_by_id(id):
    gadget = spcall('get_gadget_by_id',(id,))
    res = []

    if len(gadget) == 0:
        return jsonify({"status": "Error", "message": "No Gadget Found", "entries": []})

    elif 'Error' in str(gadget[0][0]):
        return jsonify({"status": "Error", "message": gadget[0][0]})

    else:
        r = gadget[0]
        res.append({   
                'id': str(id), 
                'gadget_name': str(r[1]),
                'gadget_description': str(r[2]),
                'gadget_model': str(r[3]),
                'gadget_color': str(r[4]),
                'gadget_image': str(r[5]),
                'rental_rate': str(r[6]),
                'gadget_brand_name': str(r[7]),
                'gadget_category_name': str(r[8]),
                'gadget_owner_first_name': str(r[9]),
                'is_rented': str(r[10])
                })

        return jsonify({"status": "Ok", "message": "Ok", "entries": res, "count": len(res)})


# Get all gadgets
@app.route('/gadgets/', methods=['GET'])
def get_gadgets():
    gadget = spcall('get_gadgets',())
    res = []

    if len(gadget) == 0:
        return jsonify({"status": "Error", "message": "No Gadget Found", "entries": []})

    elif 'Error' in str(gadget[0][0]):
        return jsonify({"status": "Error", "message": gadget[0][0]})

    else:
        for r in gadget:
            res.append({   
                    'gadget_id': str(r[0]),
                    'gadget_name': str(r[1]),
                    'gadget_description': str(r[2]),
                    'gadget_model': str(r[3]),
                    'gadget_color': str(r[4]),
                    'gadget_image': str(r[5]),
                    'rental_rate': str(r[6]),
                    'brand_name': str(r[7]),
                    'category_name': str(r[8]),
                    'first_name': str(r[9]),
                    'rented': str(r[10]),
                    })

        return jsonify({"status": "Ok", "message": "Ok", "entries": res, "count": len(res)})



# Get all customers
@app.route('/customers/', methods=['GET'])
def get_customers():
    customers = spcall('get_users',('2'))
    res = []

    if len(customers) == 0:
        return jsonify({"status": "Error", "message": "No Customer Found", "entries": []})

    elif 'Error' in str(customers[0][0]):
        return jsonify({"status": "Error", "message": customers[0][0]})

    else:
        for customer in customers:
            res.append({   
                    'id': str(customer[0]), 
                    'fname': str(customer[1]), 
                    'mname': str(customer[2]), 
                    'lname': str(customer[3]),
                    'email': str(customer[4]),
                    'password': str(customer[5]),
                    'address': str(customer[6]),
                    'mobile_no': str(customer[7]),
                    'role_id': str(customer[8])
                    })

        return jsonify({"status": "Ok", "message": "Ok", "entries": res, "count": len(res)})


# View rented gadgets

@app.route ('/rentals/', methods=['GET'])
def viewrents():
    res = spcall('view_rented', ())

    if 'Error' in str(res):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    recs = []

    for r in res:
        recs.append({'gadget_name': r[0], 'gadget_description': r[1], 'gadget_model': r[2], 'gadget_color': str(r[3]),
            'gadget_image': r[4], 'rental_rate': str(r[5]), 'brand_name': r[6],'category_name': r[7], 
            'first_name' : r[8]})

    return jsonify({'status': 'OK', 'entries': recs, 'count': len(recs)})


#Update Gadget

@app.route('/gadgets/<int:id>/', methods =['PUT'])
def update_gadget(id):
    jsn = json.loads(request.data)

    gadget_name = jsn['gadget_name']
    gadget_description =  jsn['gadget_description']
    gadget_model =  jsn['gadget_model']
    gadget_color =  jsn['gadget_color']
    rental_rate =  jsn['rental_rate']


    spcall('update_gadget', (id,
        gadget_name,
        gadget_description,
        gadget_model,
        gadget_color,
        rental_rate), True)

    return jsonify({'status': 'OK'})

#Rent Gadget

@app.route('/gadget/', methods= ['POST'])
def rent_gadget():
    jsn = json.loads(request.data)

    res = spcall('rent_gadget', ( jsn['transaction_date'], jsn['rent_due_date'], jsn['rent_overdue_cost'], jsn['gadget_id'], jsn['user_id']), True)

    if 'Error' in str(res[0][0]):
        return jsonify ({'status': 'Error', 'message': res[0][0]})

    return jsonify ({'status': 'OK', 'message': res[0][0]})

# Delete Gadget
@app.route('/gadget/<int:id>/', methods=['PUT'])
def delete_gadget(id):
    spcall('delete', (id,), True)

    return jsonify({'status': 'OK'})


# Get Rent Gadget transactions
@app.route('/transaction/', methods = ['GET'])
def trans():
    res = spcall('transaction', ())

    if 'Error' in str(res):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    recs = []

    for r in res:
        recs.append({'transaction_date': r[0], 'rent_due_date': r[1], 'rent_overdue_cost': r[2], 'gadget_name': str(r[3]),
            'owner': r[4]})

    return jsonify({'status': 'OK', 'entries': recs, 'count': len(recs)})


@app.route('/categories/', methods=['GET'])
def get_categories():
    categories = spcall('get_categories',())
    res = []

    if len(categories) == 0:
        return jsonify({"status": "Error", "message": "No Categories Found", "entries": []})

    elif 'Error' in str(categories[0][0]):
        return jsonify({"status": "Error", "message": categories[0][0]})

    else:
        for r in categories:
            res.append({   
                    'id': str(r[0]), 
                    'category_name': str(r[1])
                    })

        return jsonify({"status": "Ok", "message": "Ok", "entries": res, "count": len(res)})



@app.route('/brands/', methods=['GET'])
def get_brands():
    brands = spcall('get_brands',())
    res = []

    if len(brands) == 0:
        return jsonify({"status": "Error", "message": "No Brands Found", "entries": []})

    elif 'Error' in str(brands[0][0]):
        return jsonify({"status": "Error", "message": brands[0][0]})

    else:
        for r in brands:
            res.append({   
                    'id': str(r[0]), 
                    'brand_name': str(r[1])
                    })

        return jsonify({"status": "Ok", "message": "Ok", "entries": res, "count": len(res)})
        

@app.route('/rentals/<int:user_id>/', methods=['GET'])
def get_user_rented_gadgets(user_id):
    gadgets = spcall('get_rented_gadget_by_user_id', (user_id,))
    res = []

    if len(gadgets) == 0:
        return jsonify({"status": "Error", "message": "No Rented Gadgets Found", "entries": []})

    elif 'Error' in str(gadgets[0][0]):
        return jsonify({"status": "Error", "message": gadgets[0][0]})

    else:
        for gadget in gadgets:
            res.append({
                    'gadget_id': str(gadget[0]), 
                    'gadget_name': str(gadget[1]), 
                    'gadget_description': str(gadget[2]), 
                    'gadget_model': str(gadget[3]),
                    'gadget_color': str(gadget[4]),
                    'gadget_image': str(gadget[5]),
                    'rental_rate': str(gadget[6]),
                    'brand_name': str(gadget[7]),
                    'category_name': str(gadget[8]),
                    })

        return jsonify({"status": "Ok", "message": "Ok", "entries": res, "count": len(res)})


GENERIC_DOMAINS = "aero", "asia", "biz", "cat", "com", "coop", \
                  "edu", "gov", "info", "int", "jobs", "mil", "mobi", "museum", \
                  "name", "net", "org", "pro", "tel", "travel"

def invalid(emailaddress, domains=GENERIC_DOMAINS):
    """Checks for a syntactically invalid email address."""

    # Email address must be 7 characters in total.
    if len(emailaddress) < 7:
        return True  # Address too short.

    # Split up email address into parts.
    try:
        localpart, domainname = emailaddress.rsplit('@', 1)
        host, toplevel = domainname.rsplit('.', 1)
    except ValueError:
        return True  # Address does not have enough parts.

    # Check for Country code or Generic Domain.
    if len(toplevel) != 2 and toplevel not in domains:
        return True  # Not a domain name.

    for i in '-_.%+.':
        localpart = localpart.replace(i, "")
    for i in '-_.':
        host = host.replace(i, "")

    if localpart.isalnum() and host.isalnum():
        return False  # Email address is fine.
    else:
        return True  # Email address has funny characters.

@app.after_request
def add_cors(resp):
    resp.headers['Access-Control-Allow-Origin'] = flask.request.headers.get('Origin', '*')
    resp.headers['Access-Control-Allow-Credentials'] = True
    resp.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS, GET, PUT, DELETE'
    resp.headers['Access-Control-Allow-Headers'] = flask.request.headers.get('Access-Control-Request-Headers',
                                                                             'Authorization')
    # set low for debugging
    if app.debug:
        resp.headers["Access-Control-Max-Age"] = '1'
    return resp


if __name__ == '__main__':
    app.run(host="0.0.0.0", threaded=True, debug=True)


    