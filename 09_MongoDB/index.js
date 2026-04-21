import express from 'express';
import { connectDb } from './connection.js';
import 'dotenv/config';
const app = express();

connectDb(process.env.MONGODB_URL).then(() => console.log('Connected to DB'));
app.listen(3000, () => {
  console.log(` Server is listening on PORT:3000`);
});
