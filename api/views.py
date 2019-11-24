from flask import Blueprint, jsonify, request
from flask_sqlalchemy import Pagination
from . import db
from .models import Story

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
  stories_list = Story.query.paginate(33, 10)
  stories = []

  for story in stories_list.items:
    stories.append({ 'content': story.content, 'url': story.url, 'timestamp': story.timestamp, 'sequence': story.sequence, 'location': story.location, 'storylength': story.storylength, 'microfashion': story.microfashion })

  return jsonify({ 'stories': stories })