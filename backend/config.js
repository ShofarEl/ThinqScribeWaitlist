import dotenv from 'dotenv';

dotenv.config();

export const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/thinqscribe-waitlist',
  JWT_SECRET: process.env.JWT_SECRET || 'fallback_jwt_secret_for_development',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'https://thinqscribe.com'
}; 