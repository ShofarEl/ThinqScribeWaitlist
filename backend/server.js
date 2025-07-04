import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './config.js';
import waitlistRoutes from './routes/waitlist.js';

const app = express();

// Middleware
app.use(cors({
  origin: [config.CORS_ORIGIN, 'http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Routes
app.use('/api/waitlist', waitlistRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'ThinqScribe Waitlist API is running',
    timestamp: new Date().toISOString(),
    environment: config.NODE_ENV
  });
});

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to ThinqScribe Waitlist API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      waitlist: '/api/waitlist',
      stats: '/api/waitlist/stats/overview'
    }
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: config.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🔄 Shutting down gracefully...');
  await mongoose.connection.close();
  console.log('✅ MongoDB connection closed');
  process.exit(0);
});

// Start server
const startServer = async () => {
  await connectDB();
  
  app.listen(config.PORT, () => {
    console.log(`🚀 Server running on port ${config.PORT}`);
    console.log(`📍 Environment: ${config.NODE_ENV}`);
    console.log(`🔗 API URL: http://localhost:${config.PORT}`);
    console.log(`📊 Health check: http://localhost:${config.PORT}/api/health`);
  });
};

startServer().catch(error => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});