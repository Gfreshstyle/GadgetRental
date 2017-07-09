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
    
    else:
        res = spcall('new_user', (fname, mname, lname, email, password, address, mobile_no, role_id), True)

        if 'Error' in str(res[0][0]):
            return jsonify({'status': 'Error', 'message': res[0][0]})
        
        else:
            return jsonify({"status": "Ok", "message": res[0][0]})

    return res


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
    app.run(host="0.0.0.0", debug=True)


    