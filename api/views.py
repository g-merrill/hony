from flask import Blueprint, jsonify, request
from . import db
from .models import Story

api = Blueprint('api', __name__)

@api.route('/api/stories/add_story', methods=['POST'])
def add_story():
  story_data = request.get_json()

  new_story = Story(content=story_data['content'], url=story_data['url'])

  db.session.add(new_story)
  db.session.commit()

  return 'Done', 201

@api.route('/api/stories')
def stories():
  stories_list = Story.query.all()
  stories = []

  for story in stories_list:
    stories.append({ 'content': story.content, 'url': story.url, 'timestamp': story.timestamp, 'sequence': story.sequence, 'location': story.location, 'storylength': story.storylength, 'microfashion': story.microfashion })

  return jsonify({ 'stories': stories })