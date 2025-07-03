# Quick Setup Guide

## Prerequisites
- Node.js (v14+)
- MongoDB (local installation or MongoDB Atlas)

## Step 1: Environment Setup

Create a `.env` file in the `backend` directory with:

```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/thinqscribe-waitlist
JWT_SECRET=your_jwt_secret_key_here_change_in_production
```

For MongoDB Atlas, replace the MONGODB_URI with your Atlas connection string.

## Step 2: Install Dependencies

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## Step 3: Start the Application

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

### Terminal 2 - Frontend
```bash
cd frontend
npm start
```

## Step 4: Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api/health
- Admin Dashboard: http://localhost:3000/admin

## Troubleshooting

1. **MongoDB Connection Error**: Ensure MongoDB is running locally or check your Atlas connection string
2. **Port Already in Use**: Change the PORT in backend/.env file
3. **CORS Issues**: The backend is configured to accept requests from localhost:3000 and localhost:3001

## Testing the Application

1. Open http://localhost:3000
2. Fill out the waitlist form
3. Navigate to /admin to view all entries
4. Test filtering, sorting, and search functionality