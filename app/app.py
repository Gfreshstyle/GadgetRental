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

def get_userbyemail(email):
    return spcall("get_userbyemail", (email,))

# Logout
@app.route('/logout', methods=['POST'])
def logout():
    session.pop('logged_in', None)
    session.clear()
    return jsonify({'message': 'Successfuly logged out'})