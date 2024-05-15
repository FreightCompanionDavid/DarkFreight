import os
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient(os.getenv('MONGODB_URI'))
db = client.get_database('darkflow')
video_tutorials_collection = db.get_collection('video_tutorials')

def add_video_tutorial(title, description, url):
    """
    Add a new video tutorial to the database.
    
    :param title: Title of the video tutorial
    :param description: Description of the video tutorial
    :param url: URL of the video tutorial
    :return: Inserted video tutorial document
    """
    video_tutorial = {
        'title': title,
        'description': description,
        'url': url
    }
    result = video_tutorials_collection.insert_one(video_tutorial)
    return result.inserted_id

def get_video_tutorials():
    """
    Retrieve all video tutorials from the database.
    
    :return: List of video tutorial documents
    """
    return list(video_tutorials_collection.find())

def get_video_tutorial_by_id(tutorial_id):
    """
    Retrieve a single video tutorial by its ID.
    
    :param tutorial_id: ID of the video tutorial
    :return: Video tutorial document
    """
    return video_tutorials_collection.find_one({'_id': tutorial_id})

def update_video_tutorial(tutorial_id, title=None, description=None, url=None):
    """
    Update an existing video tutorial.
    
    :param tutorial_id: ID of the video tutorial to update
    :param title: New title of the video tutorial (optional)
    :param description: New description of the video tutorial (optional)
    :param url: New URL of the video tutorial (optional)
    :return: Updated video tutorial document
    """
    update_fields = {}
    if title:
        update_fields['title'] = title
    if description:
        update_fields['description'] = description
    if url:
        update_fields['url'] = url
    
    result = video_tutorials_collection.update_one(
        {'_id': tutorial_id},
        {'$set': update_fields}
    )
    return result.modified_count

def delete_video_tutorial(tutorial_id):
    """
    Delete a video tutorial by its ID.
    
    :param tutorial_id: ID of the video tutorial to delete
    :return: Deleted count
    """
    result = video_tutorials_collection.delete_one({'_id': tutorial_id})
    return result.deleted_count
