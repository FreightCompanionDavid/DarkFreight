import os
import json
from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

# Database configuration
mongo_uri = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/darkflow')
client = MongoClient(mongo_uri)
db = client.get_database()
knowledge_base_collection = db['knowledge_base']

@app.route('/knowledge_base', methods=['GET'])
def get_knowledge_base():
    try:
        query = request.args.get('query', '')
        if query:
            results = knowledge_base_collection.find({"$text": {"$search": query}})
        else:
            results = knowledge_base_collection.find()
        
        knowledge_base = []
        for result in results:
            knowledge_base.append({
                "title": result.get("title"),
                "content": result.get("content"),
                "tags": result.get("tags")
            })
        
        return jsonify({"status": "success", "data": knowledge_base}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/knowledge_base', methods=['POST'])
def add_knowledge_base():
    try:
        data = request.get_json()
        title = data.get('title')
        content = data.get('content')
        tags = data.get('tags', [])

        if not title or not content:
            return jsonify({"status": "error", "message": "Title and content are required"}), 400

        knowledge_base_collection.insert_one({
            "title": title,
            "content": content,
            "tags": tags
        })

        return jsonify({"status": "success", "message": "Knowledge base entry added"}), 201
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/knowledge_base/<entry_id>', methods=['PUT'])
def update_knowledge_base(entry_id):
    try:
        data = request.get_json()
        title = data.get('title')
        content = data.get('content')
        tags = data.get('tags', [])

        if not title or not content:
            return jsonify({"status": "error", "message": "Title and content are required"}), 400

        knowledge_base_collection.update_one(
            {"_id": entry_id},
            {"$set": {
                "title": title,
                "content": content,
                "tags": tags
            }}
        )

        return jsonify({"status": "success", "message": "Knowledge base entry updated"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/knowledge_base/<entry_id>', methods=['DELETE'])
def delete_knowledge_base(entry_id):
    try:
        knowledge_base_collection.delete_one({"_id": entry_id})
        return jsonify({"status": "success", "message": "Knowledge base entry deleted"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)
