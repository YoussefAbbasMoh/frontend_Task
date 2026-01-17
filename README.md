# Backend API - Node.js with MongoDB

A RESTful API backend built with Node.js, Express, and MongoDB.

## Features

- ✅ GET /api/users - Get all users
- ✅ GET /api/roles - Get all roles
- ✅ POST /api/users - Add a new user

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

3. Update the `.env` file with your MongoDB connection string:
```
MONGODB_URI=your_mongodb_connection_string_here
PORT=3000
```

4. Seed the database with initial data (3 users and 3 roles):
```bash
npm run seed
```

5. Start the server:
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:3000` (or the port specified in your `.env` file).

## API Endpoints

### 1. Get All Users
**GET** `/api/users`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "roleId": 1,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ],
  "count": 1
}
```

### 2. Get All Roles
**GET** `/api/roles`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "roleId": 1,
      "name": "Admin",
      "description": "Administrator role with full access",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ],
  "count": 1
}
```

### 3. Add User
**POST** `/api/users`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "roleId": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "roleId": 1,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

## Deployment

### Free Deployment Options

#### Option 1: Render (Recommended - Easy Setup)
1. Sign up at [render.com](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variable: `MONGODB_URI` with your MongoDB connection string
7. Deploy!

#### Option 2: Railway
1. Sign up at [railway.app](https://railway.app)
2. Create a new project from GitHub
3. Add environment variable: `MONGODB_URI`
4. Deploy automatically

#### Option 3: Fly.io
1. Install Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. Run `fly launch`
3. Add secret: `fly secrets set MONGODB_URI=your_connection_string`
4. Deploy: `fly deploy`

#### Option 4: Cyclic.sh
1. Sign up at [cyclic.sh](https://cyclic.sh)
2. Connect your GitHub repository
3. Add environment variable: `MONGODB_URI`
4. Auto-deploys on push

### MongoDB Cloud Options (Free Tier)

#### MongoDB Atlas (Recommended)
1. Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (M0 - Free tier)
3. Create a database user
4. Whitelist IP addresses (0.0.0.0/0 for all or your deployment IP)
5. Get connection string and update `MONGODB_URI` in `.env`

## Project Structure

```
.
├── models/
│   ├── User.model.js
│   └── Role.model.js
├── routes/
│   ├── users.routes.js
│   └── roles.routes.js
├── scripts/
│   └── seed.js
├── .env.example
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## License

ISC

