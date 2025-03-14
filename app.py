from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from config import Config
from database import db
from auth import auth_bp
from routes import image_bp

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Register authentication and image-related routes
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(image_bp, url_prefix="/images")

# Initialize extensions
CORS(app)  # Enable Cross-Origin Resource Sharing (CORS)
db.init_app(app)  # Initialize database with Flask app
jwt = JWTManager(app)  # Initialize JWT for authentication

# Create database tables within the app context
with app.app_context():
    db.create_all()

@app.route("/")
def home():
    """Root endpoint for API health check"""
    return {"message": "Secure Image App API is running!"}

if __name__ == "__main__":
    app.run(debug=True)
