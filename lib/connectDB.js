import mongoose from 'mongoose';
import { createSuperAdmin } from './initialSetup/createSuperAdmin';

// Global connection cache
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI).then(mongoose => {
      console.log('✅ MongoDB connected');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    
    // Create SuperAdmin only once
    if (!process.env.SUPER_ADMIN_CREATED) {
      await createSuperAdmin();
      process.env.SUPER_ADMIN_CREATED = 'true';
    }
    
    return cached.conn;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

export default connectDB;