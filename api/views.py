from flask import Blueprint, jsonify, request
from flask_sqlalchemy import Pagination
from random import randint
from . import db
from .models import Story, Key

api = Blueprint('api', __name__)

@api.route('/api/stories/add_story', methods=['POST'])
def add_story():
  story_data = request.get_json()

  new_story = Story(content=story_data['content'], url=story_data['url'], timestamp=story_data['timestamp'], sequence=story_data['sequence'], location=story_data['location'], storylength=story_data['storylength'], microfashion=story_data['microfashion'])

  db.session.add(new_story)
  db.session.commit()

  return 'Done', 201

@api.route('/api/stories')
def stories():
  search = request.args.get('search')
  # api_key = request.args.get('key')

  # stories_list = Story.query.paginate(33, 10)
  stories_list = Story.query.all()
  stories = []

  # for story in stories_list.items:
  # if api_key:
  for story in stories_list:
    # if story matches search or there is no search, append this story
    if not search or search in story.content or (story.location and search in story.location) or search in story.timestamp or search in story.storylength:
      stories.append({ 'id': story.id, 'content': story.content, 'url': story.url, 'timestamp': story.timestamp, 'sequence': story.sequence, 'location': story.location, 'storylength': story.storylength, 'microfashion': story.microfashion })
  return jsonify({ 'stories': stories })
  # else:
  #   return 'ERROR: please provide valid API Key', 401

# 
# 
# 
@api.route('/api/keys/new')
def add_key():
  possible_chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  generated_key = ''
  for i in range(6):
    objIndex = randint(0, 61)
    generated_key += possible_chars[objIndex]
  new_key = Key(keystring=generated_key)
  db.session.add(new_key)
  db.session.commit()
  return jsonify({ 'api_key': new_key })
# 
# 
# 

@api.route('/api/keys')
def keys():
  keys_list = Key.query.all()
  keys = []
  for key in keys_list:
    keys.append({ 'id': key.id, 'keystring': key.keystring })
  return jsonify({ 'keys': keys })



# @api.route('/api/keys/<int:key_id>')
# def authenticate_key():
#   key = Key.query.filter_by()
#   # if a key is found, return all good

#   # else return error
#   return jsonify({ 'stories': stories })