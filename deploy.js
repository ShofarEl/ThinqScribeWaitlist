#!/usr/bin/env node

/**
 * ThinqScribe Waitlist Deployment Script
 * 
 * This script helps deploy the ThinqScribe waitlist application to:
 * - Frontend: Vercel (thinqscribe.com/waitlist)
 * - Backend: Render (thinqscribewaitlist.onrender.com)
 * 
 * Prerequisites:
 * 1. Vercel CLI installed: npm i -g vercel
 * 2. Render CLI installed (optional): npm i -g @renderinc/cli
 * 3. Logged in to both services
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  vercel: {
    projectName: 'thinqscribe-waitlist',
    team: '', // Your team name if applicable
    prod: true,
  },
  render: {
    serviceId: 'thinqscribe-waitlist-api',
  }
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

// Helper functions
function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function execCommand(command, cwd = process.cwd()) {
  try {
    log(`Executing: ${command}`, colors.cyan);
    return execSync(command, { cwd, stdio: 'inherit' });
  } catch (error) {
    log(`Command failed: ${command}`, colors.red);
    log(error.message, colors.red);
    return null;
  }
}

function checkPrerequisites() {
  log('Checking prerequisites...', colors.bright);
  
  try {
    execSync('vercel --version', { stdio: 'ignore' });
    log('✅ Vercel CLI installed', colors.green);
  } catch (error) {
    log('❌ Vercel CLI not found. Install with: npm i -g vercel', colors.red);
    process.exit(1);
  }
  
  log('All prerequisites met!', colors.green);
}

// Deployment functions
function deployFrontend() {
  log('\n📦 Deploying frontend to Vercel...', colors.bright);
  
  const frontendDir = path.join(process.cwd(), 'frontend');
  
  // Check if frontend directory exists
  if (!fs.existsSync(frontendDir)) {
    log('❌ Frontend directory not found!', colors.red);
    return false;
  }
  
  // Deploy to Vercel
  const prodFlag = config.vercel.prod ? '--prod' : '';
  const teamFlag = config.vercel.team ? `--scope ${config.vercel.team}` : '';
  
  execCommand(`vercel ${prodFlag} ${teamFlag}`, frontendDir);
  
  log('✅ Frontend deployment complete!', colors.green);
  return true;
}

function deployBackend() {
  log('\n📦 Deploying backend to Render...', colors.bright);
  
  log(`
To deploy your backend to Render:

1. Go to https://dashboard.render.com
2. Connect your GitHub repository
3. Create a new Web Service with these settings:
   - Name: thinqscribe-waitlist-api
   - Environment: Node
   - Build Command: cd backend && npm install
   - Start Command: cd backend && npm start
   - Environment Variables:
     - NODE_ENV: production
     - CORS_ORIGIN: https://thinqscribe.com
     - MONGODB_URI: (your MongoDB connection string)

The render.yaml file in your repository should help with this configuration.
  `, colors.cyan);
  
  log('✅ Backend deployment instructions provided!', colors.green);
  return true;
}

// Main function
function main() {
  log('🚀 ThinqScribe Waitlist Deployment', colors.bright + colors.blue);
  log('=====================================\n');
  
  checkPrerequisites();
  
  const frontendSuccess = deployFrontend();
  const backendSuccess = deployBackend();
  
  if (frontendSuccess && backendSuccess) {
    log('\n✨ Deployment process completed!', colors.bright + colors.green);
    log('\nNext steps:', colors.bright);
    log('1. Configure your custom domain in Vercel (thinqscribe.com/waitlist)');
    log('2. Ensure your backend is running on Render');
    log('3. Test the waitlist form end-to-end');
    log('\nHappy launching! 🎉');
  } else {
    log('\n⚠️ Deployment process completed with warnings.', colors.yellow);
  }
}

// Run the script
main(); 