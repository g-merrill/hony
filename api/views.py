from flask import Blueprint, jsonify

api = Blueprint('api', __name__)

@api.route('/api/stories/add_story', methods=['POST'])
def add_story():

  return 'Done', 201

@api.route('/api/stories')
def stories():

  stories = []

  return jsonify({ 'stories': stories })