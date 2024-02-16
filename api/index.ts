import express, {Express} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoute from './routes/posts';
import {APP_URL, MONGO_URI, PORT} from './libs/constants';

dotenv.config();

const app: Express = express();

app.use(cors({
  credentials: true,
  origin: APP_URL
}));
app.use(express.json());

app.use(postRoute);

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    app.listen(PORT,
      () => console.log(`⚡️[SERVER]: Server started on port: ${PORT}`)
    );
  } catch (error) {
    console.log(`❌ [SERVER]: ${error}`);
  }
};

start();
