from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from database import db
from models import User

# Create a Blueprint for authentication-related routes
auth_bp = Blueprint("auth", __name__)

# Register User
@auth_bp.route("/register", methods=["POST"])
def register():
    """Registers a new user with username, email, and password"""
    data = request.get_json()
    username, email, password = data.get("username"), data.get("email"), data.get("password")

    if not username or not email or not password:
        return jsonify({"error": "Missing required fields"}), 400

    # Check if email already exists
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400

    # Create a new user and save to the database
    new_user = User(username=username, email=email)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully!"}), 201

# Login User
@auth_bp.route("/login", methods=["POST"])
def login():
    """Authenticates user and returns JWT access token"""
    data = request.get_json()
    email, password = data.get("email"), data.get("password")

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid credentials"}), 401

    # Generate access token for the user
    access_token = create_access_token(identity=str(user.id))
    return jsonify({"access_token": access_token}), 200

# Protected Route Example
@auth_bp.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    """Retrieves profile details of the authenticated user"""
    user_id = get_jwt_identity()
    print("User ID:", user_id)
    if not isinstance(user_id, str):
        return jsonify({"msg": "Invalid token format"}), 400
    
    # Fetch user details from the database
    user = User.query.get(user_id)
    return jsonify({"username": user.username, "email": user.email}), 200
