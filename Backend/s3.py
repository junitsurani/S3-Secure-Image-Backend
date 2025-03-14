import boto3
import os
from werkzeug.utils import secure_filename

# Load AWS S3 credentials from environment variables
S3_BUCKET = os.getenv("S3_BUCKET_NAME")
S3_REGION = os.getenv("S3_REGION")
AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_KEY")

# Initialize S3 client
s3_client = boto3.client(
    "s3",
    region_name=S3_REGION,
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY,
)

def upload_to_s3(file, user_id):
    """Uploads file to AWS S3 and returns the file URL"""
    # Generate a secure filename with user-specific folder
    filename = f"user_{user_id}/{secure_filename(file.filename)}"
    
    # Upload file to S3 bucket
    s3_client.upload_fileobj(
        file,
        S3_BUCKET,
        filename,
        ExtraArgs={"ACL": "private", "ContentType": file.content_type},
    )
    
    # Construct file URL
    file_url = f"https://{S3_BUCKET}.s3.{S3_REGION}.amazonaws.com/{filename}"
    return file_url
