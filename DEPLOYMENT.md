# Deployment Guide for ThinqScribe Waitlist

## 🚀 Deploy to Render.com

### Prerequisites
- Render.com account
- MongoDB Atlas database (or other MongoDB hosting)
- Domain: thinqscribe.com

### Step 1: Prepare MongoDB Atlas

1. **Create MongoDB Atlas Cluster**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Create a new cluster (M0 Free tier works)
   - Set up database access (username/password)
   - Set up network access (add 0.0.0.0/0 for Render)

2. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Add database name: `?retryWrites=true&w=majority`

### Step 2: Deploy Backend API

1. **Create Web Service on Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repository

2. **Configure Backend Service**
   - **Name**: `thinqscribe-waitlist-api`
   - **Environment**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Starter ($7/month)

3. **Set Environment Variables**
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/thinqscribe-waitlist?retryWrites=true&w=majority
   JWT_SECRET=your_secure_jwt_secret_here
   CORS_ORIGIN=https://thinqscribe.com
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note the URL: `https://thinqscribe-waitlist-api.onrender.com`

### Step 3: Deploy Frontend

1. **Create Static Site on Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "Static Site"
   - Connect your GitHub repository

2. **Configure Frontend Service**
   - **Name**: `thinqscribe-waitlist`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/build`
   - **Plan**: Starter (Free)

3. **Set Environment Variables**
   ```
   REACT_APP_API_URL=https://thinqscribe-waitlist-api.onrender.com/api
   ```

4. **Deploy**
   - Click "Create Static Site"
   - Wait for deployment to complete
   - Note the URL: `https://thinqscribe-waitlist.onrender.com`

### Step 4: Configure Custom Domain

1. **Add Custom Domain**
   - Go to your frontend service settings
   - Click "Custom Domains"
   - Add: `thinqscribe.com/waitlist`

2. **Configure DNS**
   - Add CNAME record in your domain provider:
     - **Name**: `waitlist`
     - **Value**: `thinqscribe-waitlist.onrender.com`

3. **SSL Certificate**
   - Render will automatically provision SSL certificate
   - Wait for DNS propagation (up to 48 hours)

### Step 5: Test Deployment

1. **Test API Health**
   ```
   curl https://thinqscribe-waitlist-api.onrender.com/api/health
   ```

2. **Test Frontend**
   - Visit: `https://thinqscribe.com/waitlist`
   - Test the waitlist form
   - Check that data is saved to MongoDB

### Step 6: Monitor and Maintain

1. **Set up Monitoring**
   - Enable Render's built-in monitoring
   - Set up alerts for downtime

2. **Database Monitoring**
   - Monitor MongoDB Atlas metrics
   - Set up alerts for storage/performance

3. **Backup Strategy**
   - MongoDB Atlas provides automatic backups
   - Consider additional backup solutions

## 🔧 Environment Variables Reference

### Backend (.env)
```bash
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/thinqscribe-waitlist?retryWrites=true&w=majority
JWT_SECRET=your_secure_jwt_secret_here
CORS_ORIGIN=https://thinqscribe.com
```

### Frontend (.env.production)
```bash
REACT_APP_API_URL=https://thinqscribe-waitlist-api.onrender.com/api
GENERATE_SOURCEMAP=false
```

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure CORS_ORIGIN is set correctly
   - Check that frontend URL matches exactly

2. **MongoDB Connection Issues**
   - Verify connection string format
   - Check network access settings in Atlas
   - Ensure username/password are correct

3. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Check build logs for specific errors

4. **Domain Issues**
   - Verify DNS propagation
   - Check SSL certificate status
   - Ensure CNAME record is correct

### Support
- Render Documentation: https://render.com/docs
- MongoDB Atlas Documentation: https://docs.atlas.mongodb.com
- Application Logs: Available in Render dashboard

## 📊 Performance Optimization

1. **Enable Caching**
   - Set up CDN for static assets
   - Configure browser caching headers

2. **Database Optimization**
   - Add indexes for frequently queried fields
   - Monitor query performance

3. **Frontend Optimization**
   - Enable gzip compression
   - Optimize images and assets
   - Use React production build

---

**Deployment completed! Your waitlist will be available at: https://thinqscribe.com/waitlist** 