# Render Deployment Guide for ThinqScribe Backend

This guide will walk you through deploying the ThinqScribe waitlist backend API to Render.com.

## Prerequisites

1. A [Render.com](https://render.com) account
2. Your GitHub repository with the ThinqScribe code
3. A MongoDB database (you can use MongoDB Atlas free tier)

## Step 1: Create a MongoDB Database

If you don't already have a MongoDB database:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up or log in
2. Create a free tier cluster
3. Set up a database user with a strong password
4. Configure network access (IP whitelist) to allow connections from anywhere (0.0.0.0/0)
5. Get your connection string, which will look like:
   ```
   mongodb+srv://username:password@cluster0.mongodb.net/thinqscribe-waitlist
   ```

## Step 2: Deploy to Render

1. **Sign in to Render**
   - Go to [render.com](https://render.com) and log in to your account

2. **Create a New Web Service**
   - Click the "New +" button in the top right
   - Select "Web Service"

3. **Connect Your Repository**
   - Connect your GitHub account if you haven't already
   - Select the repository containing your ThinqScribe code

4. **Configure the Service**
   - **Name**: `thinqscribe-waitlist-api` (or your preferred name)
   - **Environment**: `Node`
   - **Region**: Choose the region closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave blank (if your repo has the structure as shown)
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free (or select a paid plan if you need more resources)

5. **Add Environment Variables**
   Click on "Advanced" and add the following environment variables:
   
   - **NODE_ENV**: `production`
   - **PORT**: `10000` (Render will override this with its own port)
   - **MONGODB_URI**: Your MongoDB connection string from Step 1
   - **JWT_SECRET**: Generate a secure random string (e.g., use a password generator)
   - **CORS_ORIGIN**: `https://thinqscribe.com`

6. **Deploy the Service**
   - Click "Create Web Service"
   - Render will start deploying your service, which may take a few minutes

## Step 3: Verify the Deployment

1. **Check the Logs**
   - Once deployment is complete, check the logs to ensure everything started correctly
   - Look for messages like "Server running on port..." and "MongoDB connected successfully"

2. **Test the API**
   - Your API will be available at `https://your-service-name.onrender.com`
   - Test the health endpoint: `https://your-service-name.onrender.com/api/health`
   - You should see a JSON response with `"success": true`

3. **Update Your Frontend**
   - Make sure your frontend is configured to use the correct API URL
   - The URL should be `https://your-service-name.onrender.com/api`

## Step 4: Configure Auto-Deploy (Optional)

By default, Render will automatically deploy when you push changes to your GitHub repository. If you want to change this:

1. Go to your service dashboard
2. Click "Settings"
3. Scroll down to "Auto-Deploy"
4. Choose your preferred option

## Troubleshooting

### Common Issues

1. **Connection Refused**
   - Check if your MongoDB connection string is correct
   - Ensure your IP whitelist in MongoDB Atlas includes 0.0.0.0/0

2. **CORS Errors**
   - Verify that the CORS_ORIGIN environment variable matches your frontend domain
   - Check that your backend server.js is properly configured for CORS

3. **Build Failures**
   - Check the build logs for specific errors
   - Ensure all dependencies are listed in package.json

4. **Application Errors**
   - Review the logs in the Render dashboard
   - Check for any error messages during startup

### Getting Help

If you encounter issues:

1. Check the Render documentation: [docs.render.com](https://docs.render.com)
2. Review the logs in the Render dashboard
3. Check your MongoDB Atlas dashboard for connection issues

## Next Steps

Once your backend is successfully deployed:

1. Connect your frontend to the backend
2. Test the waitlist form submission
3. Monitor your MongoDB database for new entries 