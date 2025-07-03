import mongoose from 'mongoose';
import { config } from './config.js';

// Multiple MongoDB connection strategies
const connectionStrategies = [
  // Strategy 1: Use provided URI (Atlas or custom)
  {
    name: 'Provided URI',
    uri: config.MONGODB_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
      bufferCommands: false,
      bufferMaxEntries: 0
    }
  },
  // Strategy 2: Local MongoDB with localhost
  {
    name: 'Local MongoDB (localhost)',
    uri: 'mongodb://localhost:27017/thinqscribe-waitlist',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 3000,
      family: 4
    }
  },
  // Strategy 3: Local MongoDB with 127.0.0.1
  {
    name: 'Local MongoDB (127.0.0.1)',
    uri: 'mongodb://127.0.0.1:27017/thinqscribe-waitlist',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 3000,
      family: 4
    }
  }
];

export const connectDB = async () => {
  let connected = false;
  let lastError;

  for (const strategy of connectionStrategies) {
    if (connected) break;

    try {
      console.log(`🔄 Trying ${strategy.name}...`);
      console.log(`📍 URI: ${strategy.uri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')}`);

      await mongoose.connect(strategy.uri, strategy.options);
      
      console.log(`✅ MongoDB connected successfully using ${strategy.name}`);
      connected = true;
      break;

    } catch (error) {
      console.log(`❌ ${strategy.name} failed: ${error.message}`);
      lastError = error;
      
      // Disconnect any partial connections
      if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
      }
    }
  }

  if (!connected) {
    console.error('❌ All MongoDB connection strategies failed!');
    console.error('💡 Troubleshooting:');
    console.error('   1. Install MongoDB locally: https://www.mongodb.com/try/download/community');
    console.error('   2. Start MongoDB service: net start MongoDB (Windows) or brew services start mongodb (Mac)');
    console.error('   3. Or fix your MongoDB Atlas connection');
    console.error('   4. Check your .env file for correct MONGODB_URI');
    
    if (config.NODE_ENV === 'production') {
      throw lastError;
    } else {
      console.log('🔄 Starting in development mode without database...');
      console.log('📝 API will work but data won\'t persist until MongoDB is connected');
    }
  }

  return connected;
};

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('🚨 Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('📴 Mongoose disconnected from MongoDB');
});

export default mongoose; 