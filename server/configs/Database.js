import { connect } from 'mongoose';

// Connect to MongoDB
const connectToMongoDB = async () => {
  try {
    console.log(process.env.NODE_ENV )
    if(process.env.NODE_ENV  === 'Development'){
      await connect(process.env.MONGODB_HOST_DEV);
    }
    else if (process.env.NODE_ENV  === 'Production'){
      await connect(process.env.MONGODB_HOST_PROD);
    }
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
  }
};

export default connectToMongoDB;
