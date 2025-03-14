import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI1;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI,{
        tls: true,  // Ensure TLS is enabled
        tlsAllowInvalidCertificates: false,  // Set to false for production
        dbName: "aims_portal",
        serverSelectionTimeoutMS: 5000,  // Shorter timeout for debugging
        socketTimeoutMS: 10000
    }).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
