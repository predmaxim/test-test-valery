import mongoose from 'mongoose';
import {MONGO_URI} from './libs/constants';

const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  mongoose.connect(MONGO_URI)
    .then(() => console.log(`⚡️[️MONGOOSE]: Connected to DB`))
    .catch((err) => console.log('❌ [MONGOOSE]:', err));
};

export default dbConnect;
