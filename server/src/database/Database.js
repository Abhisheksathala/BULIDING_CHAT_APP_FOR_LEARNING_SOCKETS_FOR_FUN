import mongoose from 'mongoose';

const URL = process.env.MONGO_URI;

if (!URL) {
  throw new Error('MONGO_URL is not defined in environment variables');
}

const connectDB = async () => {
  try {
    const connectinstance = await mongoose.connect(URL);
    if (!connectinstance) {
      throw new Error('Failed to connect to MongoDB');
    }
    console.log(`MongoDB connected: ${connectinstance.connection.host}`);
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;
