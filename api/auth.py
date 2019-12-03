from flask import Blueprint, jsonify, render_template, redirect, url_for, request, flash
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required
from .models import User
from . import db

auth = Blueprint('auth', __name__)

# will need to switch these templates over to React frontend:
# /login
# /profile
# /signup

@auth.route('/auth/login', methods=['POST'])
def login_post():
  login_data = request.get_json()
  email = login_data['email']

  user = User.query.filter_by(email=email).first()

  password = login_data['password']
  remember = True if login_data['remember'] == 'true' else False

  if not user or not check_password_hash(user.password, password):
    return jsonify({
      'message': 'Please check your login details and try again.'
    })

  login_user(user, remember=remember)

  return jsonify({
    'id': user.id,
    'email': user.email,
    'name': user.name
  })

@auth.route('/auth/signup', methods=['POST'])
def signup_post():
  signup_data = request.get_json()
  email = login_data['email']
  name = login_data['name']
  password = login_data['password']

  user = User.query.filter_by(email=email).first()

  if user:
    return jsonify({
      'message': 'Email address already exists.'
    })
  
  new_user = User(email=email, name=name, password=generate_password_hash(password, method='sha256'))

  db.session.add(new_user)
  db.session.commit()

  return jsonify({
    'id': new_user.id,
    'email': new_user.email,
    'name': new_user.name
  })

@auth.route('/auth/logout')
@login_required
def logout():
  logout_user()
  return 'Logged out', 200