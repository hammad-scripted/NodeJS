import mongoose from 'mongoose';
export const connectDb = async (connectionURL) => {
  try {
    const connection = await mongoose.connect(connectionURL);
    return connection;
  } catch (error) {
    console.log(error);
  }
};
