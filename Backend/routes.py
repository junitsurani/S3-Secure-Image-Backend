import os
import openai
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from database import db
from models import Image
from s3 import upload_to_s3

# Create a Blueprint for image-related routes
image_bp = Blueprint("image", __name__)

# client = openai.OpenAI(
#     api_key=os.environ.get("OPENAI_API_KEY"),
# )

@image_bp.route("/upload", methods=["POST"])
@jwt_required()
def upload_image():
    """Handles image upload, saves metadata in the database, and uploads to S3"""
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    user_id = get_jwt_identity()
    
    # Upload file to S3 and get the file URL
    file_url = upload_to_s3(file, user_id)
    # prompt = f"Describe the following image: {file}"
    
    # response = client.chat.completions.create(
    #     model="gpt-4o",
    #     messages=[{"role": "system", "content": "You are an AI image analyst."},
    #               {"role": "user", "content": prompt}]
    # )
    
    # description = response["choices"][0]["message"]["content"]

    # Store file info in the database
    new_image = Image(user_id=user_id, filename=file.filename, s3_url=file_url)
    db.session.add(new_image)
    db.session.commit()

    return jsonify({"message": "File uploaded successfully!", "file_url": file_url}), 201

@image_bp.route("/list", methods=["GET"])
@jwt_required()
def list_images():
    """Lists all images uploaded by the authenticated user"""
    user_id = get_jwt_identity()
    
    # Retrieve all images uploaded by the user
    images = Image.query.filter_by(user_id=user_id).all()
    
    return jsonify([
        {"id": img.id, "filename": img.filename, "url": img.s3_url, "uploaded_at": img.uploaded_at}
        for img in images
    ]), 200
