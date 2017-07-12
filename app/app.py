from flask import Flask, request, jsonify, session, abort, escape, app, g
import json, os, sys
import flask
from config import *
from passlib.hash import sha256_crypt, oracle10
from werkzeug.security import generate_password_hash, check_password_hash
from simplecrypt import encrypt, decrypt
import hashlib
from itsdangerous import URLSafeTimedSerializer
from datetime import timedelta



app = Flask(__name__)
app.secret_key = "a_random_secret_key_$%#!@"

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

    complete_fields = fname is not '' and mname is not '' and lname is not '' and password is not '' and role_id is not '' and email is not '' and mobile_no is not '' and address is not ''

    if invalid(email):
        return jsonify({'status': 'Error', 'message': 'Invalid Email address'})

    elif complete_fields is False:
        return jsonify({"status": "Error", "message": "Please fill the required field/s"})

    else:
        hashed_password = generate_password_hash(password, method='sha256')
        res = spcall('new_user', (fname, mname, lname, email, hashed_password, address, str(mobile_no), role_id), True)

        if 'Error' in str(res[0][0]):
            return jsonify({'status': 'Error', 'message': res[0][0]})

        else:
            return jsonify({"status": "Ok", "message": res[0][0]})

    return res


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
        
        else:
            return jsonify({"status": "Ok", "message": res[0][0]})
   
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
                'gadget_brand_id': str(r[7]),
                'gadget_category_id': str(r[8]),
                'gadget_owner_id': str(r[9]),
                'is_rented': str(r[10]),
                'is_active': str(r[11])
                })

        return jsonify({"status": "Ok", "message": "Ok", "entries": res})


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
                    'id': str(id), 
                    'gadget_name': str(r[1]),
                    'gadget_description': str(r[2]),
                    'gadget_model': str(r[3]),
                    'gadget_color': str(r[4]),
                    'gadget_image': str(r[5]),
                    'rental_rate': str(r[6]),
                    'gadget_brand_id': str(r[7]),
                    'gadget_category_id': str(r[8]),
                    'gadget_owner_id': str(r[9]),
                    'is_rented': str(r[10]),
                    'is_active': str(r[11])
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
                    'id': str(id), 
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
            'gadget_image': r[4], 'rental_rate': str(r[5]), 'Brands.brand_name': r[6],'Category.category_name': r[7], 
            'UserAccount.first_name' : r[8]})

    return jsonify({'status': 'OK', 'message' : res[0][0]})



@app.route('/gadgets/', methods =['PUT'])
def update_gadget():
    jsn = json.loads(request.data)

    id = jsn.get('id','')
    gadget_name = jsn.get('gadget_name', '')
    gadget_description = jsn.get('gadget_description', '')
    gadget_model = jsn.get('gadget_model', '')
    gadget_color = jsn.get('gadget_color', '')
    gadget_image = jsn.get('gadget_image', '')
    rental_rate = jsn.get('rental_rate', '')
    gadget_brand_id = jsn.get('gadget_brand_id', '')
    gadget_category_id = jsn.get('gadget_category_id','')
    gadget_owner_id = jsn.get('gadget_owner_id', '')


    spcall('update_gadget', (id,
        gadget_name,
        gadget_description,
        gadget_model,
        gadget_color,
        gadget_image,
        rental_rate,
        gadget_brand_id,
        gadget_category_id,
        gadget_owner_id), True)

    return jsonify({'status': 'OK'})



@app.route('/gadget/', methods= ['POST'])
def rent_gadget():
    jsn = json.loads(request.data)

    res = spcall('rent_gadget', ( jsn['transaction_date'], jsn['rent_due_date'], jsn['gadget_id'], jsn['user_id']), True)

    if 'Error' in str(res[0][0]):
        return jsonify ({'status': 'Error', 'message': res[0][0]})

    return jsonify ({'status': 'Error', 'message': res[0][0]})

@app.route('/gadget/', methods=['PUT'])
def delete_gadget():
    jsn = json.loads(request.data)

    id = jsn.get('id', '')

    spcall('delete', (id), True)

    return jsonify({'status': 'OK'})
    

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


    