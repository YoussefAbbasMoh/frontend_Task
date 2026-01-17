# 🚀 Quick Deploy to Render.com

Your code is ready on GitHub: https://github.com/YoussefAbbasMoh/frontend_Task.git

## Step-by-Step Deployment

### 1. Go to Render.com
Visit: https://render.com and sign up/login (free account)

### 2. Create New Web Service
- Click **"New +"** button → Select **"Web Service"**
- Click **"Connect GitHub"** if not already connected
- Select repository: **`YoussefAbbasMoh/frontend_Task`**

### 3. Configure Service (Auto-filled if using render.yaml)
- **Name:** `backend-api`
- **Environment:** `Node`
- **Branch:** `main`
- **Root Directory:** (leave empty)
- **Build Command:** `npm install`
- **Start Command:** `npm start`

### 4. Add Environment Variable
- Scroll to **"Environment Variables"** section
- Click **"Add Environment Variable"**
- **Key:** `MONGODB_URI`
- **Value:** `mongodb+srv://yoabbasabsai_db_user:7N2MZphasPMvL5uj@cluster0.kqeydvy.mongodb.net/backend-api?retryWrites=true&w=majority`

### 5. Deploy
- Click **"Create Web Service"** at the bottom
- Wait 2-5 minutes for deployment
- Your app URL will be: `https://backend-api.onrender.com` (or similar)

### 6. Seed Database (IMPORTANT!)
After first deployment, you need to seed the database:

**Option A: Using Render Shell**
1. In your Render dashboard, click on your service
2. Go to **"Shell"** tab
3. Run: `npm run seed`

**Option B: Using local terminal**
Your local `.env` already has the connection string. Just run:
```bash
npm run seed
```

### 7. Test Your Deployed API
Once deployed, your API will be at: `https://backend-api-XXXX.onrender.com`

Test endpoints:
- Health: `https://your-app-url.onrender.com/health`
- Get Users: `https://your-app-url.onrender.com/api/users`
- Get Roles: `https://your-app-url.onrender.com/api/roles`
- Add User: POST `https://your-app-url.onrender.com/api/users`

### 8. Test with Script
After deployment, update the URL in test-api.js and run:
```bash
node test-api.js https://your-app-url.onrender.com
```

---

## ⚡ Quick Test Commands (after deployment)

```bash
# Health check
curl https://your-app-url.onrender.com/health

# Get all users
curl https://your-app-url.onrender.com/api/users

# Get all roles
curl https://your-app-url.onrender.com/api/roles

# Add new user
curl -X POST https://your-app-url.onrender.com/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"New User","email":"new@example.com","roleId":1}'
```

---

**Note:** Render free tier sleeps after 15 minutes of inactivity. First request after sleep may take 30-60 seconds to wake up.

