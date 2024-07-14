import mongoose from 'mongoose';
import { env } from '../utils/env.js';

export const initMongoDb = async () => {
  try {
    const user = env('MONGO_USER');
    const password = env('MONGO_PASSWORD');
    const url = env('MONGO_URL');
    const db = env('MONGO_DB');
    await mongoose.connect(
      `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority`,
    );
  } catch (error) {
    console.log('Error while setting up mongo connection', error);
    process.exit(1);
    throw error;
  }
};
