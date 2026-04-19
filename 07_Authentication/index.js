import express from 'express';

const app = express();
app.use(express.json());
const DIARY = {};
const EMAILS = new Set();
app.post('/signup', (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const generateToken = () => {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 16; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  const user = { username, password, email, token: generateToken() };
  EMAILS.add(user.email);
  DIARY[username] = user;
  console.log(DIARY);
  console.log(EMAILS);
  if (EMAILS.has(email)) {
    return res.status(400).json({ message: 'Email already exists' });
  }
  res.status(201).json({ message: 'User registered successfully', user });
});

app.post('/me', (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }
  const user = Object.values(DIARY).find((user) => user.token === token);
  if (!user) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  res.status(200).json({ message: 'User authenticated successfully', user });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
