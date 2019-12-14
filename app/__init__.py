import os
from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

db = SQLAlchemy()

from .commands import reset_db

def create_app():
  app = Flask(__name__, static_folder='build')

  app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
  app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')

  db.init_app(app)

  login_manager = LoginManager()
  login_manager.login_view = 'auth.login'
  login_manager.init_app(app)

  from .models import User

  @login_manager.user_loader
  def load_user(user_id):
    return User.query.get(int(user_id))

  from .auth import auth as auth_blueprint
  app.register_blueprint(auth_blueprint)

  from .views import api
  app.register_blueprint(api)

  # Serve React App
  @app.route('/', defaults={'path': ''})
  @app.route('/<path:path>')
  def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
      return send_from_directory(app.static_folder, path)
    else:
      return send_from_directory(app.static_folder, 'index.html')

  app.cli.add_command(reset_db)

  return app