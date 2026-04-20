import express from 'express';
import db from '../db/index.js';
import { usersTable } from '../db/schema.js';
import { randomBytes } from 'node:crypto';
import { createHmac } from 'node:crypto';
import { eq } from 'drizzle-orm';
const router = express.Router();

router.get('/', (req, res) => {
  console.log('Testing');
});

router.post('/signup', async (req, res) => {
  const { name, age, email, password } = req.body;
  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));
  if (existingUser.length > 0) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const salt = randomBytes(256).toString('hex');
  const hashedPassword = createHmac('sha256', salt)
    .update(password)
    .digest('hex');

  const newUser = await db
    .insert(usersTable)
    .values({ name, age, email, password: hashedPassword, salt })
    .returning();
  res
    .status(201)
    .json({ message: 'User created successfully', user: newUser[0] });
});
router.post('/login', (req, res) => {
  console.log('Login route hit');
});
export default router;
