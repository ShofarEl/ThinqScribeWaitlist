# Backend Deployment Guide for ThinqScribe

## Quick Deployment Steps for Render.com

1. **Create a MongoDB Database**
   - Use MongoDB Atlas (free tier): https://www.mongodb.com/cloud/atlas
   - Create a cluster, database user, and get your connection string

2. **Deploy to Render**
   - Go to https://render.com and log in
   - Create a new Web Service
   - Connect your GitHub repository
   - Configure:
     - Name: `thinqscribe-waitlist-api`
     - Environment: `Node`
     - Build Command: `cd backend && npm install`
     - Start Command: `cd backend && npm start`

3. **Add Environment Variables**
   - NODE_ENV: `production`
   - MONGODB_URI: `your_mongodb_connection_string`
   - CORS_ORIGIN: `https://thinqscribe.com`
   - JWT_SECRET: `generate_a_secure_random_string`

4. **Deploy and Test**
   - After deployment, your API will be at: `https://thinqscribe-waitlist-api.onrender.com`
   - Test the health endpoint: `https://thinqscribe-waitlist-api.onrender.com/api/health`

5. **Update Frontend Configuration**
   - Make sure your frontend's API_BASE_URL points to your new backend URL

## Troubleshooting

If you see "Backend server not available" in your frontend:

1. Check if your backend is deployed and running
2. Verify the API URL in your frontend matches your Render URL
3. Check CORS settings in the backend
4. Look at browser console for specific error messages

Need more help? Run the `backend-test.js` script to diagnose connection issues. 