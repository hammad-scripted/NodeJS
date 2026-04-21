import express from 'express';
import { connectDb } from './connection.js';
import 'dotenv/config';
import userRouter from './routes/user.routes.js';
const app = express();

app.use(express.json());
app.use('/users', userRouter);
connectDb(process.env.MONGODB_URL).then((conn) =>
  console.log(`Connected to DB ${conn.connection.name}`),
);

app.listen(3000, () => {
  console.log(` Server is listening on PORT:3000`);
});
