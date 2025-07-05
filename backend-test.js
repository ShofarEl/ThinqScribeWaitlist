const fetch = require('node-fetch');

const BACKEND_URL = 'https://thinqscribewaitlist.onrender.com/api';

async function testBackendConnection() {
  console.log(`Testing connection to backend at: ${BACKEND_URL}`);
  
  try {
    // Test health endpoint
    console.log('Testing health endpoint...');
    const healthResponse = await fetch(`${BACKEND_URL}/health`);
    
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('✅ Health check successful!');
      console.log('Response:', JSON.stringify(healthData, null, 2));
    } else {
      console.log(`❌ Health check failed with status: ${healthResponse.status}`);
      console.log('Response:', await healthResponse.text());
    }
  } catch (error) {
    console.error('❌ Connection error:', error.message);
    
    if (error.code === 'ENOTFOUND') {
      console.log('\nPossible issues:');
      console.log('1. The backend server is not deployed yet');
      console.log('2. The domain name is incorrect');
      console.log('3. DNS has not propagated yet');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('\nPossible issues:');
      console.log('1. The backend server is not running');
      console.log('2. The port is blocked by a firewall');
    }
    
    console.log('\nDeployment steps for backend:');
    console.log('1. Go to render.com and create an account if you don\'t have one');
    console.log('2. Create a new Web Service and connect your GitHub repository');
    console.log('3. Configure the service with these settings:');
    console.log('   - Name: thinqscribe-waitlist-api');
    console.log('   - Environment: Node');
    console.log('   - Build Command: cd backend && npm install');
    console.log('   - Start Command: cd backend && npm start');
    console.log('4. Add these environment variables:');
    console.log('   - NODE_ENV: production');
    console.log('   - CORS_ORIGIN: https://thinqscribe.com');
    console.log('   - MONGODB_URI: (your MongoDB connection string)');
    console.log('   - JWT_SECRET: (a secure random string)');
    console.log('5. Deploy the service');
  }
}

testBackendConnection(); 