import express from 'express';
import db from '../db/index.js';
import { usersTable } from '../db/schema.js';

import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
const app = express();
const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const users = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
      })
      .from(usersTable);
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Failed to fetch users', error });
  }
});
export default router;
