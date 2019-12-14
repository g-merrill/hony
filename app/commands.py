import click
from flask.cli import with_appcontext

from . import db
from .models import User, Key

@click.command(name='reset_db')
@with_appcontext
def reset_db():
  db.drop_all()
  db.create_all()