import mongoose from 'mongoose';

const connection = async () => {
  try {
    await mongoose.connect(process.env['MONGO_URI']);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Failed to connect MongoDB');
  }
};

export default connection;
