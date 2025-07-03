import dotenv from 'dotenv';

dotenv.config();

export const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://tuboksmicheal:Jehovah1@cluster0.4u5f3pu.mongodb.net',
  JWT_SECRET: process.env.JWT_SECRET 
}; 