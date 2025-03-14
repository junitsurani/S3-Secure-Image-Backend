# S3 Image Manager

## Overview
S3 Image Manager is a secure web application that allows users to upload, manage, and analyze images. The application features user authentication, image storage in Amazon S3, and optional AI-powered image analysis using ChatGPT.

## Features
- **User Authentication**: Secure login and signup system.
- **Image Upload & Management**: Users can upload images to Amazon S3 and view uploaded images.
- **Image Listing**: Users can see all their uploaded images with metadata.
- **AI Image Analysis (Optional)**: Uses ChatGPT API to generate descriptions of images.
- **Secure Storage**: Images are stored securely in Amazon S3 with proper access control.

## Technology Stack
- **Frontend**: Vite + TypeScript + React
- **Backend**: Python Flask
- **Database**: PostgreSQL
- **File Storage**: Amazon S3
- **AI Integration**: ChatGPT API 

---

## Prerequisites
Make sure you have the following installed on your system:
- **Node.js** (Latest LTS recommended) - [Download Here](https://nodejs.org/)
- **Python 3** (Latest version) - [Download Here](https://www.python.org/downloads/)
- **PostgreSQL** - [Download Here](https://www.postgresql.org/download/)
- **AWS Account** for S3 Storage - [Sign Up Here](https://aws.amazon.com/)
- **Git** (For version control) - [Download Here](https://git-scm.com/)

---

## Setup Instructions

### **1. Clone the Repository**
```sh
git clone https://github.com/junitsurani/S3-Secure-Image-Backend.git
cd s3-image-manager
```

### **2. Backend Setup (Flask + PostgreSQL)**

#### **Step 1: Create a Virtual Environment**
```sh
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

#### **Step 2: Install Dependencies**
```sh
pip install -r requirements.txt
```

#### **Step 3: Setup PostgreSQL Database**
1. Start PostgreSQL and create a new database.
2. Update `config.py` with your PostgreSQL credentials.
3. Run database migrations:
   ```sh
   flask db upgrade
   ```

#### **Step 4: Configure Environment Variables**
Create a `.env` file in the backend directory and add:
```
SECRET_KEY=your_secret_key
DATABASE_URL=postgresql://username:password@localhost:5432/your_database
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_BUCKET_NAME=your_s3_bucket
```

#### **Step 5: Start the Backend Server**
```sh
flask run
```
Backend will start at **http://127.0.0.1:5000**

---

### **3. Frontend Setup (React + Vite)**

#### **Step 1: Install Dependencies**
```sh
cd frontend
npm install
```

#### **Step 2: Configure Environment Variables**
Create a `.env` file in the `frontend` directory and add:
```
VITE_API_URL=http://127.0.0.1:5000
```

#### **Step 3: Start the Frontend Server**
```sh
npm run dev
```
Frontend will be available at **http://localhost:5173**

---

## Setting Up Amazon S3 (For Free Tier Users)
1. Sign in to your **AWS Console**.
2. Navigate to **S3** and click **Create Bucket**.
3. Enter a **unique bucket name** (e.g., `secure-image-storage`).
4. Set **Block Public Access settings** (Uncheck "Block all public access" if you want public URLs).
5. Click **Create Bucket**.
6. Go to **IAM (Identity & Access Management)** and create a new user with **S3 Full Access**.
7. Copy the **Access Key ID** and **Secret Access Key** and update your `.env` file accordingly.

---

## API Endpoints

### **Authentication**
- **Signup**: `POST /auth/signup`
- **Login**: `POST /auth/login`
- **User Profile**: `GET /auth/profile` (Requires Token)

### **Image Management**
- **Upload Image**: `POST /images/upload` (Requires Token)
- **List User Images**: `GET /images/list` (Requires Token)

#### **Example Request to List Images**
```sh
curl -X GET http://127.0.0.1:5000/images/list \  
-H "Authorization: Bearer your_jwt_token_here"
```

---

## Running the Project
1. Start the **backend**:
   ```sh
   flask run
   ```
2. Start the **frontend**:
   ```sh
   npm run dev
   ```
3. Open **http://localhost:5173** in your browser.

---

## Deployment (Optional)

### **Backend Deployment (Render / AWS EC2 / Heroku)**
1. Deploy the backend to **Render / Heroku / AWS EC2**.
2. Update `VITE_API_URL` in the frontend `.env` file to the deployed backend URL.

### **Frontend Deployment (Vercel / Netlify)**
1. Deploy frontend using **Vercel** or **Netlify**.
2. Ensure the **backend API URL** is correctly configured.

---

## Contribution
Want to contribute? Feel free to submit a **Pull Request**!

---

## License
This project is **MIT Licensed**.

---

## Author
Developed by **[Your Name]**

