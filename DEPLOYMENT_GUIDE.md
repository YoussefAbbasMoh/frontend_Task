# Deployment Guide

## ✅ Code Successfully Pushed to GitHub
Repository: https://github.com/YoussefAbbasMoh/frontend_Task.git

## 🚀 Deploy to Render.com (Recommended - Easiest)

### Step 1: Sign up and Create Web Service
1. Go to [https://render.com](https://render.com)
2. Sign up/Login (you can use GitHub to sign in)
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub account if not already connected
5. Select repository: **`YoussefAbbasMoh/frontend_Task`**

### Step 2: Configure Service
- **Name:** `backend-api` (or any name you prefer)
- **Region:** Choose closest to you
- **Branch:** `main`
- **Root Directory:** Leave empty (root)
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

### Step 3: Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"**

Add this variable:
- **Key:** `MONGODB_URI`
- **Value:** `mongodb+srv://yoabbasabsai_db_user:7N2MZphasPMvL5uj@cluster0.kqeydvy.mongodb.net/backend-api?retryWrites=true&w=majority`

### Step 4: Deploy
- Click **"Create Web Service"**
- Render will automatically build and deploy your app
- Wait for deployment to complete (2-5 minutes)
- Your app will be available at: `https://your-app-name.onrender.com`

### Step 5: Seed the Database (Important!)
After deployment, you need to run the seed script once to create initial users and roles.

**Option A: Using Render Shell**
1. Go to your service on Render
2. Click **"Shell"** tab
3. Run: `npm run seed`

**Option B: Using local machine**
Update the MongoDB connection in your local `.env` temporarily and run:
```bash
npm run seed
```

---

## 🚂 Alternative: Deploy to Railway

1. Go to [https://railway.app](https://railway.app)
2. Sign up/Login with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select your repository
5. Add environment variable:
   - `MONGODB_URI` = `mongodb+srv://yoabbasabsai_db_user:7N2MZphasPMvL5uj@cluster0.kqeydvy.mongodb.net/backend-api?retryWrites=true&w=majority`
6. Railway auto-deploys! Your app URL will be shown.

---

## 📋 Testing the Deployed API

Once deployed, test these endpoints:

### 1. Get All Users
```bash
GET https://your-app-url.onrender.com/api/users
```

### 2. Get All Roles
```bash
GET https://your-app-url.onrender.com/api/roles
```

### 3. Add New User
```bash
POST https://your-app-url.onrender.com/api/users
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "roleId": 1
}
```

### Test using curl:
```bash
# Get users
curl https://your-app-url.onrender.com/api/users

# Get roles
curl https://your-app-url.onrender.com/api/roles

# Add user
curl -X POST https://your-app-url.onrender.com/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","roleId":1}'
```

---

## 🔍 Health Check
Test if server is running:
```
GET https://your-app-url.onrender.com/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

