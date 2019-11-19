import click
from flask.cli import with_appcontext

from . import db
from .models import Story

@click.command(name='reset_stories')
@with_appcontext
def reset_stories():
  db.drop_all()
  db.create_all()