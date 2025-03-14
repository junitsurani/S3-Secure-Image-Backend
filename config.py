import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "postgresql://junitsurani:Junitsurani1@@localhost/secure_image_db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "f3a9b7c4d8e1a2f7b5c3d6e9a4b8f2d1e7c5a9f3d6b4e2c1a7d9f8b6c3e2d5a")
    S3_BUCKET_NAME = os.getenv("S3_BUCKET_NAME", "secure-image-storage")
    S3_REGION = os.getenv("S3_REGION", "eu-north-1")
