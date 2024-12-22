import mongoose from 'mongoose';

let isConnected = false; // To prevent multiple connections

const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/alumni';

    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined. Please check your .env file.');
    }

    console.log('Attempting to connect to MongoDB:', MONGODB_URI);

    const conn = await mongoose.connect(MONGODB_URI); // Removed options here
    isConnected = true;
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
