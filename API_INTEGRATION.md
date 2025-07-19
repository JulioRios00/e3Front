# E3Audio Frontend - API Integration Guide

## 🚀 API Integration Complete!

The frontend is now connected to the E3Audio NestJS API backend. All authentication and user management flows are integrated with real API endpoints.

## 📋 What's Been Implemented

### ✅ **API Layer**
- **API Client** (`/src/lib/api.ts`): Base HTTP client with authentication headers
- **Auth Service** (`/src/services/auth.service.ts`): Login, register, profile management
- **Admin Service** (`/src/services/admin.service.ts`): Admin-only user management endpoints

### ✅ **Authentication System**
- **Updated Auth Hook** (`/src/hooks/use-auth.tsx`): Real API integration with JWT tokens
- **Login Form** (`/src/components/auth/login-form.tsx`): Connected to `/auth/login` endpoint
- **Registration Form** (`/src/components/auth/registration-form-complete.tsx`): Connected to `/auth/register` endpoint

### ✅ **Admin Dashboard**
- **Admin Hook** (`/src/hooks/use-admin.tsx`): Admin-specific data management
- **Admin Page** (`/src/app/admin/page.tsx`): Real user data from API with role-based access control

## 🔧 Environment Setup

### Environment Variables (`.env.local`)
```bash
NEXT_PUBLIC_API_URL=https://e3-api-d64fcc5bd009.herokuapp.com
NODE_ENV=development
```

### API Backend Requirements
- **Backend API**: Running on Heroku at `https://e3-api-d64fcc5bd009.herokuapp.com`
- **CORS**: Must be enabled for `http://localhost:3000` (frontend)
- **JWT**: Backend issues JWT tokens for authentication
- **SSL**: HTTPS connection to Heroku backend

## 🔐 Authentication Flow

### 1. **User Registration**
```
POST /auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "11999999999",
  "birthday": "1990-01-01"
}
```

### 2. **User Login**
```
POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

### 3. **Protected Routes**
All authenticated requests include:
```
Authorization: Bearer <jwt_token>
```

## 🎯 User Experience Flow

### **Public Users** (Not Authenticated)
1. **Landing Page**: Can browse services, see pricing
2. **Contact Buttons**: Redirect to `/services` page (no contact forms)
3. **Services Page**: Can view all services, basic information
4. **Register/Login**: Access to registration and login forms

### **Authenticated Users**
1. **Landing Page**: Same as public, but with authentication state
2. **Services Page**: Can view services
3. **Profile Page**: Access to user profile management
4. **Logout**: Clear authentication and redirect to public view

### **Admin Users** (Role: ADMIN)
1. **All User Features**: Plus admin-specific functionality
2. **Admin Dashboard**: `/admin` - User management, birthday tracking
3. **User Details**: `/admin/users/:id` - Individual user management
4. **Role-Based Access**: Automatic redirection if not admin

## 📊 API Endpoints Used

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login  
- `GET /auth/profile` - Get current user profile

### Admin (Requires ADMIN role)
- `GET /admin/users` - Get all users
- `GET /admin/users/:id` - Get specific user
- `GET /admin/birthdays/today` - Today's birthdays
- `GET /admin/birthdays/upcoming?days=7` - Upcoming birthdays

## 🛠 Development Notes

### **Error Handling**
- All API calls include proper error handling
- User-friendly error messages displayed in UI
- Authentication errors trigger logout and redirect

### **Loading States**
- Loading spinners during API calls
- Disabled buttons during form submissions
- Loading overlays for data fetching

### **Security**
- JWT tokens stored in localStorage
- Automatic token validation on app load
- Role-based access control for admin features
- Protected routes redirect unauthorized users

## 🚀 Next Steps

### **API Backend Setup**
✅ **Backend API**: Already running on Heroku at `https://e3-api-d64fcc5bd009.herokuapp.com`
✅ **Database**: PostgreSQL database configured on Heroku
✅ **CORS**: Backend should allow requests from `http://localhost:3000`

### **Testing**
1. **Registration**: Create a new user account at `/register`
2. **Login**: Test authentication flow at `/login`
3. **Admin**: Create an admin user to test admin dashboard
4. **Services**: Test service browsing and navigation

### **Production Deployment**
1. **Environment Variables**: Already configured for Heroku backend
2. **HTTPS**: Secure connections enabled via Heroku
3. **CORS**: Backend CORS should be configured for your production domain

## ⚡ Quick Start

✅ **Backend API**: Already running on Heroku
✅ **Frontend**: Running on `http://localhost:3000`
1. **Register a User** at `/register`
2. **Login** at `/login`
3. **Browse Services** at `/services`
4. **Admin Access**: Promote user to ADMIN role in database, then visit `/admin`

The application now has full API integration with the Heroku backend and is ready for testing!
