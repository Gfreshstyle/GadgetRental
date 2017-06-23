from flask import Flask, request, jsonify, session, abort, escape, app, g
import json, os, sys
import flask
from config import *
from flask_session import Session
# from redissession import RedisSessionInterface
from flask_multisession import RedisSessionInterface
from redis import Redis
from passlib.hash import sha256_crypt, oracle10
from werkzeug.security import generate_password_hash, check_password_hash
# from that_queue_module import queue_daemon
from simplecrypt import encrypt, decrypt
import hashlib
from itsdangerous import URLSafeTimedSerializer
from datetime import timedelta



app = Flask(__name__)
app.secret_key = "a_random_secret_key_$%#!@"
# app.config['SECRET_KEY'] = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
# app.session_interface = RedisSessionInterface()
# app.config['REDIS_QUEUE_KEY'] = 'my_queue'
# queue_daemon(app)

# redis = Redis()

@app.route('/')
def hello_world():
    return "hello world!"

# Login
@app.route('/login', methods=['GET' ,'POST'])
def login():
    jsn = json.loads(request.data)

    if invalid(jsn['email']):
        return jsonify({'status': 'Error', 'message': 'Invalid Email address'})

    pas = hashlib.md5(jsn['password'].encode()).hexdigest()

    res = spcall('login', (
        jsn['email'],
        pas,), True)

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    if len(res) == 0:
        return jsonify({'status': 'Invalid credentials'})

    if 'Invalid credentials' in str(res[0][0]):
        return jsonify({'status': 'Invalid credentials', 'message': res[0][0]})

    if 'Login successful' in str(res[0][0]):
        session['logged_in'] = True
        session['email'] = jsn['email']
        user = get_userbyemail(session['email'])
        session['email'] = jsn['email']
        session['user_id'] = user[0][1]
        session['first_name'] = user[0][2]
        session['last_name'] = user[0][3]
        session['address1'] = user[0][4]
        session['mobile_no'] = str(user[0][5])
        session['is_admin'] = user[0][6]
        session['is_customer'] = user[0][7]
        user_id = session['user_id']

        rescategory = spcall('get_category', (user_id,), )

        if 'Error' in str(rescategory):
            return jsonify({'status': 'Error', 'message': res[0][0]})

        recscategory = []
        for r in rescategory:
            recscategory.append({'category_name': str(r[0]), 'user_id': r[1]})

        print res[0][0]

        print ('email:' +session['email'])
        print recscategory

        recsuser = []
        for r in user:
            recsuser.append({'email': session['email'], 'user_id': session['user_id'], 'first_name': session['first_name'], 'last_name': session['last_name'],
                            'address1': session['address1'], 'mobile_no': session['mobile_no'],
                            'is_admin': session['is_admin'], 'is_customer': session['is_customer']})

        print recsuser

        return jsonify({'status': 'Login successful', 'message': res[0][0], 'categories': recscategory, 'countcategories': len(recscategory),
                'userinfo': recsuser, 'countuserinfo': len(recsuser)})
    # else:
    #     session['logged_in'] = False
    #     return jsonify({'status': 'Invalid credentials'})

@app.route('/owner/update/<owner_id>', methods=['PUT'])
def update_gadgetowner(owner_id):
    jsn = json.loads(request.data)

    owner_id = jsn.get('owner_id', '')
    owner_first_name = jsn.get('owner_first_name', '')
    owner_last_name = jsn.get('owner_last_name', '')
    owner_address1 = jsn.get('owner_address1', '')
    owner_mobile_no = jsn.get('owner_mobile_no', '')

    print (jsn)

    res = spcall('update_gadgetowner', (
        owner_id,
        owner_first_name,
        owner_last_name,
        owner_address1,
        owner_mobile_no), True)

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})
    else:
        return jsonify({'status': 'Ok'})    

def get_userbyemail(email):
    return spcall("get_userbyemail", (email,))

@app.route('/owner/<string:owner_first_name>/<string:owner_last_name>', methods=['POST'])
def new_owner(owner_first_name, owner_last_name):
    jsn = json.loads(request.data)

    res = spcall('new_owner', (
        jsn['owner_first_name'],
        jsn['owner_last_name'],
        jsn['owner_address1'],
        jsn['owner_mobile_no'],), True)

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    return jsonify({'status': 'Ok', 'message': res[0][0]})


# Logout
@app.route('/logout', methods=['POST'])
def logout():
    session.pop('logged_in', None)
    session.clear()
    return jsonify({'message': 'Successfuly logged out'})

@app.route('/register', methods=['POST'])
def new_customer():
    jsn = json.loads(request.data)

    pas = hashlib.md5(jsn['password'].encode()).hexdigest()

    if invalid(jsn['email']):
        return jsonify({'status': 'Error', 'message': 'Invalid Email address'})

    res = spcall('new_customer', (
        jsn['email'],
        pas), True)
    
    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    if 'Email already exists' in str(res[0][0]):
        return jsonify({'status': 'Email already exists', 'message': res[0][0]})

    if len(res) == 0:
        return jsonify({'status': 'Password Mismatch'})

    return jsonify({'status': 'Ok', 'message': res[0][0]})

# Get customers
@app.route('/customers', methods=['GET'])
def get_customers():
    res = spcall('get_customers', ())

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    recs = []
    for r in res:
        recs.append({'user_id': r[0], 'first_name': str(r[1]), 'last_name': str(r[2]), 'address1': str(r[3]), 'mobile_no': str(r[4]), 'email': str(r[5]), 'password': str(r[6]),
                    'is_admin': str(r[7]), 'is_customer': str(r[8])})

    return jsonify({'status': 'Ok', 'entries': recs, 'count': len(recs)})

@app.route('/owner/<string:owner_first_name>/<string:owner_last_name>', methods=['POST'])
def new_owner(owner_first_name, owner_last_name):
    jsn = json.loads(request.data)

    res = spcall('new_owner', (
        jsn['owner_first_name'],
        jsn['owner_last_name'],
        jsn['owner_address1'],
        jsn['owner_mobile_no'],), True)

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    return jsonify({'status': 'Ok', 'message': res[0][0]})

@app.route('/account/<string:user_id>', methods=['GET'])
def useraccount(user_id):
    res = spcall('get_userprofile', (user_id,), )

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    recs = []
    for r in res:
        recs.append({'user_id': str(r[0]), 'first_name': str(r[1]), 'last_name': str(r[2]), 'address1': str(r[3]), 
            'mobile_no': str(r[4]), 'email': str(r[5])})

    print recs

    return jsonify({'status': 'Ok', 'entries': recs, 'count': len(recs)})

@app.route('/account/update/<string:user_id>', methods=['PUT'])
def update_useraccount(user_id):
    jsn = json.loads(request.data)

    user_id = jsn.get('user_id', '')
    first_name = jsn.get('first_name', '')
    last_name = jsn.get('last_name', '')
    address1 = jsn.get('address1', '')
    mobile_no = jsn.get('mobile_no', '')
    email = jsn.get('email', '')

    print (jsn)

    res = spcall('update_useraccount', (
        user_id,
        first_name,
        last_name,
        address1,
        mobile_no,
        email), True)

    print res
    
    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})
    else:
        return jsonify({'status': 'Ok'})



@app.route('/owner/<string:owner_first_name>/<string:owner_last_name>', methods=['POST'])
def new_owner(owner_first_name, owner_last_name):
    jsn = json.loads(request.data)

    res = spcall('new_owner', (
        jsn['owner_first_name'],
        jsn['owner_last_name'],
        jsn['owner_address1'],
        jsn['owner_mobile_no'],), True)

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    return jsonify({'status': 'Ok', 'message': res[0][0]})


# Logout
@app.route('/logout', methods=['POST'])
def logout():
    session.pop('logged_in', None)
    session.clear()
    return jsonify({'message': 'Successfuly logged out'})

 @app.route('/owner/update/<owner_id>', methods=['PUT'])
def update_gadgetowner(owner_id):
    jsn = json.loads(request.data)

    owner_id = jsn.get('owner_id', '')
    owner_first_name = jsn.get('owner_first_name', '')
    owner_last_name = jsn.get('owner_last_name', '')
    owner_address1 = jsn.get('owner_address1', '')
    owner_mobile_no = jsn.get('owner_mobile_no', '')

    print (jsn)

    res = spcall('update_gadgetowner', (
        owner_id,
        owner_first_name,
        owner_last_name,
        owner_address1,
        owner_mobile_no), True)

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})
    else:
        return jsonify({'status': 'Ok'})
@app.route('/category', methods=['GET'])
def get_categories():
    res = spcall('get_category', ())

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    recs = []
    for r in res:
        recs.append({'category_name': str(r[0])})

    return jsonify({'status': 'Ok', 'entries': recs, 'count': len(recs)})

# Get all brands
@app.route('/brand', methods=['GET'])
def get_brands():
    res = spcall('get_brand', ())

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    recs = []
    for r in res:
        recs.append({'brand_name': str(r[0])})

    return jsonify({'status': 'Ok', 'entries': recs, 'count': len(recs)})
# Update gadget
@app.route('/gadget/update/<string:gadget_item_id>', methods=['PUT'])
def update_gadget(gadget_item_id):
    jsn = json.loads(request.data)

    gadget_item_id = jsn.get('gadget_item_id', '')
    gadget_color = jsn.get('gadget_color', '')
    gadget_model = jsn.get('gadget_model', '')
    gadget_rental_rate = jsn.get('gadget_rental_rate', '')
    gadget_image = jsn.get('gadget_image', '')
    gadget_scale = jsn.get('gadget_scale', '')
    gadget_ram = jsn.get('gadget_ram', '')
    gadget_memory = jsn.get('gadget_memory', '')
    gadget_description = jsn.get('gadget_description', '')
    gadget_category_name = jsn.get('gadget_category_name', '')
    gadget_owner_id = jsn.get('gadget_owner_id', '')
    gadget_brandname = jsn.get('gadget_brandname', '')

    print (jsn)

    res = spcall('update_gadget', (
        gadget_plate_number,
        gadget_color,
        gadget_brandname,
        gadget_model,
        gadget_rental_rate,
        gadget_image,
        gadget_scale,
        gadget_ram,
        gadget_memory,
        gadget_description,
        gadget_owner_id,
        gadget_category_name,), True)

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})
    else:
        return jsonify({'status': 'Ok'})
        
@app.route('/gadget/itemid/<string:gadget_item_id>/<string:user_id>', methods=['GET'])
def get_gadgetbyitemid(gadget_itemid, user_id):
    res = spcall('get_gadgetbyitemid', (gadget_item_id, user_id,), )

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    recs = []
    for r in res:
        recs.append({'gadget_item_id': str(r[0]), 'gadget_color': str(r[1]), 'gadget_brandname': str(r[2]), 'gadget_model': str(r[3]), 'gadget_rental_rate': str(r[4]),
            'gadget_image': str(r[5]), 'gadget_scale': str(r[6]), 'gadget_ram': str(r[7]), 'gadget_memory': str(r[8]), 'gadget_description': str(r[9]), 'gadget_owner_id': r[10], 'gadget_category_name': str(r[11]), 'user_id': r[12]})       

    return jsonify({'status': 'Ok', 'entries': recs, 'count': len(recs)})

@app.route('/gadget/itemid/<string:gadget_item_id>', methods=['GET'])
def get_gadgetbyitemidinadmin(gadget_item_id):
    res = spcall('get_gadgetbyitemidinadmin', (gadget_item_id,), )

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    recs = []
    for r in res:
        recs.append({'gadget_item_id': str(r[0]), 'gadget_color': str(r[1]), 'gadget_brandname': str(r[2]), 'gadget_model': str(r[3]), 'gadget_rental_rate': str(r[4]),
            'gadget_image': str(r[5]), 'gadget_scale': str(r[6]), 'gadget_ram': str(r[7]), 'gadget_memory': str(r[8]), 'gadget_description': str(r[9]), 'gadget_owner_id': r[10], 'gadget_category_name': str(r[11])})       

    return jsonify({'status': 'Ok', 'entries': recs, 'count': len(recs)})

# Get gadget by category name

# Get all gadgets
@app.route('/gadgets/<string:user_id>', methods=['GET'])
def get_gadgets(user_id):

    print ("user_id:" + str(user_id))

    res = spcall('get_gadgets', (user_id,), )

    rescategory = spcall('get_category', (user_id,), )

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    if 'Error' in str(rescategory[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    recs = []
    for r in res:
        recs.append({'gadget_plate_number': str(r[0]), 'gadget_color': str(r[1]), 'gadget_brandname': str(r[2]), 'gadget_model': r[3],
            'gadget_rental_rate': str(r[4]), 'gadget_image': str(r[5]), 'gadget_scale': str(r[6]), 'gadget_ram': str(r[7]), 'gadget_memory': str(r[8]), 'gadget_description': str(r[9]),'gadget_owner_id': r[10], 'gadget_category_name': str(r[11]),
            'user_id': str(r[12])})

    recscategory = []
    for r in rescategory:
        recscategory.append({'category_name': str(r[0]), 'user_id': r[1]})

    return jsonify({'status': 'Ok', 'entries': recs, 'count': len(recs), 'categories': recscategory,
                'countcategories': len(recscategory)})

@app.route('/gadgets', methods=['GET'])
def get_gadgetsinadmin():

    res = spcall('get_gadgetsinadmin', (), )

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    recs = []
    for r in res:
        recs.append({'gadget_item_id': str(r[0]), 'gadget_color': str(r[1]), 'gadget_brandname': str(r[2]), 'gadget_model': r[3],
            'gadget_rental_rate': str(r[4]), 'gadget_image': str(r[5]), 'gadget_scale': str(r[6]), 'gadget_ram': str(r[7]), 'gadget_memory': str(r[8]), 'gadget_description': str(r[9]), 'gadget_owner_id': r[10], 'gadget_category_name': str(r[11])})

    return jsonify({'status': 'Ok', 'entries': recs, 'count': len(recs)})


# Add new gadget
@app.route('/gadget/<string:gadget_item_id', methods=['POST'])
def new_gadget(gadget_item_id):
    jsn = json.loads(request.data)

    res = spcall('new_gadget', (
        jsn['gadget_item_id'],
        jsn['gadget_color'],
        jsn['gadget_brandname'],
        jsn['gadget_model'],
        jsn['gadget_rental_rate'],
        jsn['gadget_image'],
        jsn['gadget_scale'],
        jsn['gadget_ram'],
        jsn['gadget_memory'],
        jsn['gadget_description'],
        jsn['gadget_owner_id'],
        jsn['gadget_category_name'],), True)

    if 'Error' in res[0][0]:
        return jsonify({'status': 'Error', 'message': res[0][0]})

    return jsonify({'status': 'Ok', 'message': res[0][0]})


# Get gadget owners
@app.route('/owners', methods=['GET'])
def get_gadgetowners():
    res = spcall('get_gadgetowners', ())

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    recs = []
    for r in res:
        recs.append({'owner_id': str(r[0]), 'owner_firstname': str(r[1]), 'owner_lastname': str(r[2]),
                    'owner_address1': str(r[3]), 'owner_mobile_no': str(r[4])})

    return jsonify({'status': 'Ok', 'entries': recs, 'count': len(recs)})

# Get gadget owner by id