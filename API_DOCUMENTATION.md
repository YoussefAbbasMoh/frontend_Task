# Backend API Documentation for Frontend Developers

## 🌐 Base URL
```
https://backend-api-production-31ad.up.railway.app
```

## 📋 Table of Contents
- [Overview](#overview)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
- [Data Models](#data-models)
- [Error Handling](#error-handling)
- [Frontend Integration Examples](#frontend-integration-examples)
- [TypeScript Types](#typescript-types)
- [Testing](#testing)

---

## Overview

This RESTful API provides endpoints for managing users and roles in a Node.js backend with MongoDB.

### Health Check
**GET** `/health`

Check if the API server is running.

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

## Authentication

Currently, the API does not require authentication. All endpoints are publicly accessible.

---

## API Endpoints

### 1. Get All Users

**Endpoint:** `GET /api/users`

**Description:** Retrieves all users from the database.

**Request:**
```http
GET /api/users
```

**Response Success (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "696aeccb949f3d1dc73590c4",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "roleId": 1,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "696aeccb949f3d1dc73590c5",
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "roleId": 2,
      "createdAt": "2024-01-15T10:31:00.000Z",
      "updatedAt": "2024-01-15T10:31:00.000Z"
    }
  ],
  "count": 2
}
```

**Response Empty:**
```json
{
  "success": true,
  "data": [],
  "count": 0
}
```

**Response Error (500):**
```json
{
  "success": false,
  "error": "Failed to fetch users",
  "message": "Error details here"
}
```

---

### 2. Get All Roles

**Endpoint:** `GET /api/roles`

**Description:** Retrieves all available roles from the database.

**Request:**
```http
GET /api/roles
```

**Response Success (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "696aeccb949f3d1dc73590be",
      "roleId": 1,
      "name": "Admin",
      "description": "Administrator role with full access",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "696aeccb949f3d1dc73590bf",
      "roleId": 2,
      "name": "User",
      "description": "Standard user role",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "696aeccb949f3d1dc73590c0",
      "roleId": 3,
      "name": "Moderator",
      "description": "Moderator role with limited admin access",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "count": 3
}
```

**Response Error (500):**
```json
{
  "success": false,
  "error": "Failed to fetch roles",
  "message": "Error details here"
}
```

---

### 3. Add User (Create New User)

**Endpoint:** `POST /api/users`

**Description:** Creates a new user in the database.

**Request Headers:**
```http
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "roleId": 1
}
```

**Request Body Schema:**
- `name` (string, required): User's full name
- `email` (string, required): User's email address (must be unique)
- `roleId` (number, required): Role ID (must exist in roles collection)

**Response Success (201 Created):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "_id": "696aeccb949f3d1dc73590c4",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "roleId": 1,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Response Error - Missing Fields (400 Bad Request):**
```json
{
  "success": false,
  "error": "Missing required fields: name, email, and roleId are required"
}
```

**Response Error - Invalid Role (400 Bad Request):**
```json
{
  "success": false,
  "error": "Role with roleId 999 does not exist"
}
```

**Response Error - Duplicate Email (400 Bad Request):**
```json
{
  "success": false,
  "error": "Email already exists"
}
```

**Response Error - Server Error (500):**
```json
{
  "success": false,
  "error": "Failed to create user",
  "message": "Error details here"
}
```

---

## Data Models

### User Model
```typescript
interface User {
  _id: string;
  name: string;
  email: string;
  roleId: number;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
}
```

### Role Model
```typescript
interface Role {
  _id: string;
  roleId: number;
  name: string;
  description: string;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
}
```

### API Response Wrapper
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  message?: string;
  error?: string;
}
```

---

## Error Handling

The API uses standard HTTP status codes:

- **200 OK** - Successful GET requests
- **201 Created** - Successful POST requests (user created)
- **400 Bad Request** - Invalid request data or validation errors
- **404 Not Found** - Route not found
- **500 Internal Server Error** - Server-side errors

All error responses follow this structure:
```json
{
  "success": false,
  "error": "Error message",
  "message": "Detailed error message (optional)"
}
```

### Common Error Scenarios

1. **Missing Required Fields**
   - Status: 400
   - Error: "Missing required fields: name, email, and roleId are required"

2. **Duplicate Email**
   - Status: 400
   - Error: "Email already exists"

3. **Invalid Role ID**
   - Status: 400
   - Error: "Role with roleId {id} does not exist"

4. **Server Errors**
   - Status: 500
   - Error: "Failed to fetch users" or "Failed to create user"

---

## Frontend Integration Examples

### React with TypeScript + React Query (TanStack Query)

#### 1. Service Layer: `services/users.service.ts`

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_BASE_URL = 'https://backend-api-production-31ad.up.railway.app';

// Types
export interface User {
  _id: string;
  name: string;
  email: string;
  roleId: number;
  createdAt: string;
  updatedAt: string;
}

export interface UsersResponse {
  success: boolean;
  data: User[];
  count: number;
}

export interface AddUserPayload {
  name: string;
  email: string;
  roleId: number;
}

export interface AddUserResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface ApiError {
  success: false;
  error: string;
  message?: string;
}

// Query Keys
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

// Get All Users
export const useGetAllUsers = () => {
  return useQuery<UsersResponse, ApiError>({
    queryKey: userKeys.lists(),
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/api/users`);
      
      if (!response.ok) {
        const error: ApiError = await response.json();
        throw error;
      }
      
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
};

// Add User Mutation
export const useAddUser = () => {
  const queryClient = useQueryClient();

  return useMutation<AddUserResponse, ApiError, AddUserPayload>({
    mutationFn: async (payload: AddUserPayload) => {
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw error;
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};
```

#### 2. Service Layer: `services/roles.service.ts`

```typescript
import { useQuery } from '@tanstack/react-query';

const API_BASE_URL = 'https://backend-api-production-31ad.up.railway.app';

// Types
export interface Role {
  _id: string;
  roleId: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface RolesResponse {
  success: boolean;
  data: Role[];
  count: number;
}

export interface ApiError {
  success: false;
  error: string;
  message?: string;
}

// Query Keys
export const roleKeys = {
  all: ['roles'] as const,
  lists: () => [...roleKeys.all, 'list'] as const,
};

// Get All Roles
export const useGetAllRoles = () => {
  return useQuery<RolesResponse, ApiError>({
    queryKey: roleKeys.lists(),
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/api/roles`);
      
      if (!response.ok) {
        const error: ApiError = await response.json();
        throw error;
      }
      
      return response.json();
    },
    staleTime: 30 * 60 * 1000, // 30 minutes (roles don't change often)
    gcTime: 60 * 60 * 1000, // 1 hour
  });
};
```

#### 3. Component: `components/AddUserForm.tsx`

```typescript
import React, { useState } from 'react';
import { useAddUser } from '../services/users.service';
import { useGetAllRoles } from '../services/roles.service';

export const AddUserForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roleId, setRoleId] = useState<number | ''>('');
  const [error, setError] = useState<string | null>(null);

  const { data: rolesData, isLoading: rolesLoading } = useGetAllRoles();
  const addUserMutation = useAddUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !email || !roleId) {
      setError('All fields are required');
      return;
    }

    try {
      await addUserMutation.mutateAsync({
        name,
        email,
        roleId: Number(roleId),
      });

      // Reset form on success
      setName('');
      setEmail('');
      setRoleId('');
      alert('User created successfully!');
    } catch (err: any) {
      setError(err.error || 'Failed to create user');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-user-form">
      <h2>Add New User</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter full name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="role">Role:</label>
        <select
          id="role"
          value={roleId}
          onChange={(e) => setRoleId(e.target.value ? Number(e.target.value) : '')}
          required
          disabled={rolesLoading}
        >
          <option value="">Select a role</option>
          {rolesData?.data.map((role) => (
            <option key={role._id} value={role.roleId}>
              {role.name} - {role.description}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={addUserMutation.isPending || rolesLoading}
      >
        {addUserMutation.isPending ? 'Creating...' : 'Add User'}
      </button>
    </form>
  );
};
```

#### 4. Component: User List with Loading/Error States

```typescript
import React from 'react';
import { useGetAllUsers } from '../services/users.service';

export const UserList: React.FC = () => {
  const { data, isLoading, isError, error, refetch } = useGetAllUsers();

  // Loading State
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner">Loading users...</div>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="error-container">
        <h3>Error loading users</h3>
        <p>{error?.error || 'An unknown error occurred'}</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  // Empty State
  if (!data || data.count === 0) {
    return (
      <div className="empty-container">
        <p>No users found. Add a user to get started!</p>
      </div>
    );
  }

  // Success State - Display Users
  return (
    <div className="user-list">
      <h2>Users ({data.count})</h2>
      <div className="users-grid">
        {data.data.map((user) => (
          <div key={user._id} className="user-card">
            <h3>{user.name}</h3>
            <p className="email">{user.email}</p>
            <p className="role-id">Role ID: {user.roleId}</p>
            <p className="created-date">
              Created: {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

## TypeScript Types

### Complete Type Definitions

Create a file `types/api.types.ts`:

```typescript
// User Types
export interface User {
  _id: string;
  name: string;
  email: string;
  roleId: number;
  createdAt: string;
  updatedAt: string;
}

// Role Types
export interface Role {
  _id: string;
  roleId: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// API Request/Response Types
export interface AddUserPayload {
  name: string;
  email: string;
  roleId: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  message?: string;
}

export interface ApiError {
  success: false;
  error: string;
  message?: string;
}

export interface UsersResponse extends ApiResponse<User[]> {
  data: User[];
  count: number;
}

export interface RolesResponse extends ApiResponse<Role[]> {
  data: Role[];
  count: number;
}

export interface AddUserResponse extends ApiResponse<User> {
  message: string;
  data: User;
}

// Health Check Types
export interface HealthResponse {
  status: 'OK';
  message: string;
}
```

---

## Testing

### Using cURL

```bash
# Health Check
curl https://backend-api-production-31ad.up.railway.app/health

# Get All Users
curl https://backend-api-production-31ad.up.railway.app/api/users

# Get All Roles
curl https://backend-api-production-31ad.up.railway.app/api/roles

# Add User
curl -X POST https://backend-api-production-31ad.up.railway.app/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","roleId":1}'
```

### Using JavaScript Fetch

```javascript
// Get All Users
const response = await fetch('https://backend-api-production-31ad.up.railway.app/api/users');
const data = await response.json();
console.log(data);

// Add User
const newUser = await fetch('https://backend-api-production-31ad.up.railway.app/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    roleId: 1,
  }),
});
const result = await newUser.json();
console.log(result);
```

### Using Postman

1. **Collection:** Create a new collection "Backend API"
2. **Base URL:** `https://backend-api-production-31ad.up.railway.app`
3. **Endpoints:**
   - GET `/health`
   - GET `/api/users`
   - GET `/api/roles`
   - POST `/api/users` (with JSON body)

---

## Best Practices

### 1. Error Handling
Always check the `success` field in responses before accessing `data`:

```typescript
const response = await fetch(`${API_BASE_URL}/api/users`);
const result = await response.json();

if (result.success) {
  // Use result.data
  console.log(result.data);
} else {
  // Handle error
  console.error(result.error);
}
```

### 2. Loading States
Always show loading indicators while fetching data:

```typescript
const { data, isLoading } = useGetAllUsers();

if (isLoading) return <Spinner />;
```

### 3. Empty States
Handle empty data gracefully:

```typescript
if (data?.count === 0) {
  return <EmptyState message="No users found" />;
}
```

### 4. Type Safety
Use TypeScript types for all API responses:

```typescript
const response: UsersResponse = await fetch(...).then(r => r.json());
```

### 5. Query Caching
Use React Query's caching to reduce API calls:

```typescript
staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
```

---

## Support & Issues

For issues or questions, please contact the backend team or refer to the repository:
- GitHub: https://github.com/YoussefAbbasMoh/frontend_Task.git

---

**Last Updated:** January 2024
**API Version:** 1.0.0
**Base URL:** `https://backend-api-production-31ad.up.railway.app`

