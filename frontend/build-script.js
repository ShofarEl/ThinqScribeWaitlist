#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('Starting custom build script...');

// Ensure we're in the frontend directory
const frontendDir = __dirname;
console.log(`Working directory: ${frontendDir}`);

try {
  // Install dependencies
  console.log('Installing dependencies...');
  execSync('npm install', { 
    stdio: 'inherit',
    cwd: frontendDir 
  });
  
  // Run build
  console.log('Building project...');
  execSync('CI=false GENERATE_SOURCEMAP=false npx react-scripts build', { 
    stdio: 'inherit',
    cwd: frontendDir,
    env: {
      ...process.env,
      CI: 'false',
      GENERATE_SOURCEMAP: 'false'
    }
  });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
} 