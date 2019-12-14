from flask_login import UserMixin
from . import db

class User(UserMixin, db.Model):
  id = db.Column(db.Integer, primary_key=True)
  email = db.Column(db.String(100), unique=True, nullable=False)
  password = db.Column(db.String(100), nullable=False)
  name = db.Column(db.String(100))
  key = db.relationship('Key', uselist=False, back_populates='user')

class Story(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  content = db.Column(db.String(2500), nullable=False)
  url = db.Column(db.String(500), unique=True, nullable=False)
  timestamp = db.Column(db.String(50))
  sequence = db.Column(db.Boolean, default=False)
  location = db.Column(db.String(100))
  storylength = db.Column(db.String(10))
  microfashion = db.Column(db.Boolean, default=False)
  
class Key(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  keystring = db.Column(db.String(6), unique=True, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
  user = db.relationship('User', back_populates='key')