# API Quick Reference Guide

## 🚀 Base URL
```
https://backend-api-production-31ad.up.railway.app
```

## 📍 Endpoints Summary

| Method | Endpoint | Description | Status Code |
|--------|----------|-------------|-------------|
| GET | `/health` | Health check | 200 |
| GET | `/api/users` | Get all users | 200 |
| GET | `/api/roles` | Get all roles | 200 |
| POST | `/api/users` | Add new user | 201 |

---

## 📝 Request Examples

### GET All Users
```bash
GET https://backend-api-production-31ad.up.railway.app/api/users
```

### GET All Roles
```bash
GET https://backend-api-production-31ad.up.railway.app/api/roles
```

### POST Add User
```bash
POST https://backend-api-production-31ad.up.railway.app/api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "roleId": 1
}
```

---

## 📦 Response Formats

### Success Response
```json
{
  "success": true,
  "data": [...],
  "count": 2
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

---

## 🔧 Common Role IDs

| roleId | Role Name | Description |
|--------|-----------|-------------|
| 1 | Admin | Administrator role with full access |
| 2 | User | Standard user role |
| 3 | Moderator | Moderator role with limited admin access |

---

## ⚡ JavaScript Fetch Examples

```javascript
// Get Users
const users = await fetch('https://backend-api-production-31ad.up.railway.app/api/users')
  .then(res => res.json());

// Get Roles
const roles = await fetch('https://backend-api-production-31ad.up.railway.app/api/roles')
  .then(res => res.json());

// Add User
const newUser = await fetch('https://backend-api-production-31ad.up.railway.app/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    roleId: 1
  })
}).then(res => res.json());
```

---

## 🔍 TypeScript Types (Quick Copy)

```typescript
interface User {
  _id: string;
  name: string;
  email: string;
  roleId: number;
  createdAt: string;
  updatedAt: string;
}

interface Role {
  _id: string;
  roleId: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface AddUserPayload {
  name: string;
  email: string;
  roleId: number;
}
```

---

**Full Documentation:** See `API_DOCUMENTATION.md` for complete details.

