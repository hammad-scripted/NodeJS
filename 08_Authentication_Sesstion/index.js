import express from 'express';
import router from './routes/user.routes.js';
const app = express();

app.use(express.json());
app.use('/users', router);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
