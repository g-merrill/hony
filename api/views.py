from flask import Blueprint, jsonify, request, render_template
from flask_sqlalchemy import Pagination
from flask_login import login_required, current_user
from random import randint
from . import db
from .models import User, Story, Key

api = Blueprint('api', __name__)

# FOR DEV PURPOSES ONLY
@api.route('/api/stories/add_story', methods=['POST'])
def add_story():
  story_data = request.get_json()

  new_story = Story(content=story_data['content'], url=story_data['url'], timestamp=story_data['timestamp'], sequence=story_data['sequence'], location=story_data['location'], storylength=story_data['storylength'], microfashion=story_data['microfashion'])

  db.session.add(new_story)
  db.session.commit()
  return 'Done', 201

@api.route('/api/stories')
def stories():
  # stories_list = Story.query.paginate(33, 10)
  stories_list = Story.query.all()
  stories = []

  search = request.args.get('search')
  api_key = request.args.get('key')
  # workaround below, until I properly connect key to a user
  # valid_keystring = api_key
  valid_keystring = Key.query.filter_by(keystring=api_key).first()

  if valid_keystring:
    # for story in stories_list.items:
    for story in stories_list:
      # if story matches search or there is no search, append this story
      if not search or search.lower() in story.content.lower() or (story.location and search.lower() in story.location.lower()) or search.lower() in story.timestamp.lower() or search.lower() in story.storylength.lower():
        stories.append({ 'id': story.id, 'content': story.content, 'url': story.url, 'timestamp': story.timestamp, 'sequence': story.sequence, 'location': story.location, 'storylength': story.storylength, 'microfashion': story.microfashion })
    return jsonify({ 'number_of_stories': len(stories), 'stories': stories })
  else:
    return 'ERROR: please provide valid API Key', 401


@api.route('/api/keys/new', methods=['POST'])
def add_key():
  user_data = request.get_json()
  email = user_data['email']
  user = User.query.filter_by(email=email).first()
  if user.key:
    return jsonify({ 'id': user.key.id, 'keystring': user.key.keystring, 'user_id': user.id })
  possible_chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  generated_key = ''
  for i in range(6):
    objIndex = randint(0, 61)
    generated_key += possible_chars[objIndex]
  new_key = Key(keystring=generated_key, user=user)
  user.key = new_key
  db.session.add(new_key)
  db.session.add(user)
  db.session.commit()
  return jsonify({ 'id': new_key.id, 'keystring': new_key.keystring, 'user_id': user.id })

@api.route('/api/users/<int:id>')
@login_required
def get_user(id):
  user = User.query.filter_by(id=id).first()
  return jsonify({
    'id': user.id,
    'email': user.email,
    'name': user.name,
    'key': user.key.keystring if user.key else None
  })


# FOR DEV PURPOSES ONLY
@api.route('/api/keys')
def keys():
  keys_list = Key.query.all()
  keys = []
  for key in keys_list:
    keys.append({ 'id': key.id, 'keystring': key.keystring, 'user_id': key.user_id, 'user': key.user.email })
  return jsonify({ 'keys': keys })

# FOR DEV PURPOSES ONLY
@api.route('/api/keys/delete_all')
def delete_keys():
  keys_list = Key.query.all()
  for key in keys_list:
    db.session.delete(key)
  db.session.commit()
  return 'All API keys have been deleted', 201

# @api.route('/api/keys/<int:key_id>')
# def authenticate_key():
#   key = Key.query.filter_by()
#   # if a key is found, return all good

#   # else return error
#   return jsonify({ 'stories': stories })

# FOR DEV PURPOSES ONLY
@api.route('/api/users')
def users():
  users_list = User.query.all()
  users = []
  for user in users_list:
    users.append({ 'id': user.id, 'email': user.email, 'password': user.password, 'name': user.name, 'key': user.key.keystring if user.key else None })
  return jsonify({ 'users': users })

# FOR DEV PURPOSES ONLY
@api.route('/api/users/delete_all')
def delete_users():
  users_list = User.query.all()
  for user in users_list:
    db.session.delete(user)
  db.session.commit()
  return 'All users have been deleted', 201