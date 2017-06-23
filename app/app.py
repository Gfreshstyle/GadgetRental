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

