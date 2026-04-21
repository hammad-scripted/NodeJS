import express from 'express';
import { User } from '../models/user.model.js';
import { randomBytes, createHmac } from 'node:crypto';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  } else {
    const salt = randomBytes(256).toString('hex');
    const hashedPassword = createHmac('sha256', salt)
      .update(password)
      .digest('hex');
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      salt,
    });
    return res.status(201).json({
      message: 'User registered successfully',
      data: { id: user._id },
    });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({
    email,
  });
  if (!existingUser) {
    return res.status(400).json({
      error: `User with ${email} does not exist`,
    });
  }
  //// password hashing
  const salt = existingUser.salt;
  const hashedPassword = createHmac('sha256', salt)
    .update(password)
    .digest('hex');
  if (hashedPassword !== existingUser.password) {
    return res.status(400).json({
      error: 'Invalid email or password',
    });
  }
  const payload = {};
});
export default router;
