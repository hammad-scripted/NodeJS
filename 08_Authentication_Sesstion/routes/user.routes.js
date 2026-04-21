import express from 'express';
import db from '../db/index.js';
import { usersTable } from '../db/schema.js';
import { userSession } from '../db/schema.js';
import { randomBytes, createHmac } from 'node:crypto';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
const router = express.Router();

/* Helper function for hashing password */
function hashPassword(password, salt) {
  return createHmac('sha256', salt).update(password).digest('hex');
}

/* SIGNUP */
router.post('/signup', async (req, res) => {
  try {
    const { name, age, email, password } = req.body;

    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate salt
    const salt = randomBytes(32).toString('hex');

    // Hash password
    const hashedPassword = hashPassword(password, salt);

    const newUser = await db
      .insert(usersTable)
      .values({
        name,
        age,
        email,
        password: hashedPassword,
        salt,
      })
      .returning();

    res.status(201).json({
      message: 'User created successfully',
      user: newUser[0],
    });
  } catch (error) {
    res.status(500).json({ message: 'Signup failed', error });
  }
});

/* LOGIN */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    // User not found
    if (users.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const currentUser = users[0];

    // Hash entered password using saved salt
    const hashedPassword = hashPassword(password, currentUser.salt);

    // Compare hashes
    if (hashedPassword !== currentUser.password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const session = await db
      .insert(userSession)
      .values({ userId: currentUser.id })
      .returning();

    const payload = {
      userId: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.status(200).json({
      message: 'Login successful',
      user: currentUser.name,
      sessionId: session[0].id,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed', error });
  }
});

router.get('/', async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  return res.status(200).json({
    message: 'Authorized',
    data: user,
  });
});

router.patch('/', async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const { name, email } = req.body;
  await db
    .update(usersTable)
    .set({ name, email })
    .where(eq(usersTable.id, user.id));

  return res.json({ message: 'User updated successfully', data: user });
});

export default router;
