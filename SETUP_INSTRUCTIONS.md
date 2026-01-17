# Quick Setup Instructions

## 1. Create .env file

Create a file named `.env` in the root directory with the following content:

```
MONGODB_URI=mongodb+srv://yoabbasabsai_db_user:7N2MZphasPMvL5uj@cluster0.kqeydvy.mongodb.net/backend-api?retryWrites=true&w=majority
PORT=3000
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Seed the Database (Create initial 3 users and roles)

```bash
npm run seed
```

## 4. Start the Server

```bash
# Development mode (auto-reload)
npm run dev

# Or production mode
npm start
```

## 5. Test the APIs

Once the server is running on http://localhost:3000:

- **Get all users:** GET http://localhost:3000/api/users
- **Get all roles:** GET http://localhost:3000/api/roles
- **Add user:** POST http://localhost:3000/api/users
  ```json
  {
    "name": "New User",
    "email": "newuser@example.com",
    "roleId": 1
  }
  ```

## Deployment

The project is ready to deploy to:
- **Render.com** (recommended)
- Railway.app
- Cyclic.sh
- Fly.io

Make sure to set the `MONGODB_URI` environment variable in your deployment platform!

