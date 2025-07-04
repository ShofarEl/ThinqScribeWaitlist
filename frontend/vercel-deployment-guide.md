# Vercel Deployment Guide for ThinqScribe Waitlist

This guide will help you deploy the ThinqScribe waitlist frontend to Vercel.

## Prerequisites

- A GitHub account with this repository
- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Your domain (thinqscribe.com) ready to be configured

## Step 1: Connect to Vercel

1. Log in to your Vercel account
2. Click "Add New..." > "Project"
3. Connect your GitHub account if not already connected
4. Select this repository from the list

## Step 2: Configure Project Settings

Configure the following settings:

- **Framework Preset**: Create React App
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `build`

## Step 3: Set Environment Variables

Add the following environment variables:

```
REACT_APP_API_URL=https://thinqscribewaitlist.onrender.com/api
```

## Step 4: Deploy

Click "Deploy" to start the deployment process. Vercel will build and deploy your frontend.

## Step 5: Set Up Custom Domain

1. After deployment, go to Project Settings > Domains
2. Add your domain: `thinqscribe.com`
3. Follow the instructions to verify domain ownership
4. Configure DNS settings as instructed by Vercel

## Step 6: Configure Routing for /waitlist Path

To serve the waitlist at `thinqscribe.com/waitlist`:

1. Go to Project Settings > Rewrites
2. Add a new rewrite:
   - Source: `/waitlist`
   - Destination: `/`
3. Add another rewrite:
   - Source: `/waitlist/:path*`
   - Destination: `/:path*`

## Step 7: Test the Deployment

1. Visit `https://thinqscribe.com/waitlist` to see the waitlist form
2. Fill out the form to test the submission process
3. Confirm that the form submits successfully to your backend

## Troubleshooting

If you encounter issues:

1. **CORS errors**: Make sure your backend CORS settings include your Vercel domain
2. **API connection errors**: Verify that the REACT_APP_API_URL is correct
3. **Build failures**: Check the build logs for specific errors

## Next Steps

Once your waitlist is deployed:

1. Set up analytics to track form submissions
2. Consider adding social sharing features
3. Plan for the full website launch at the root domain 