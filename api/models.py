from . import db

class Story(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  content = db.Column(db.String(2500), nullable=False)
  url = db.Column(db.String(500), unique=True, nullable=False)
  timestamp = db.Column(db.String(50), nullable=True)
  sequence = db.Column(db.Boolean, default=False)
  location = db.Column(db.String(100), nullable=True)
  storylength = db.Column(db.String(10), nullable=True)
  microfashion = db.Column(db.Boolean, default=False)
  