import express from 'express';
import router from './routes/user.routes.js';
import db from './db/index.js';
import { usersTable } from './db/schema.js';
import { userSession } from './db/schema.js';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
const app = express();

app.use(express.json());
app.use(async (req, res, next) => {
  // const sessionId = req.headers['session-id'];
  // if (!sessionId) {
  //   return next();
  // }
  // const currentSession = await db
  //   .select({
  //     sessionId: userSession.id,
  //     id: usersTable.id,
  //     userId: userSession.userId,
  //     name: usersTable.name,
  //     email: usersTable.email,
  //   })
  //   .from(userSession)
  //   .rightJoin(usersTable, eq(userSession.userId, usersTable.id))
  //   .where(eq(userSession.id, sessionId));
  // if (currentSession.length === 0) {
  //   return next();
  // }
  // req.user = currentSession[0];
  // next();

  //!   approach 2 using jwt token
  const tokenHeader = req.headers['authorization'];
  if (!tokenHeader) {
    return next();
  }
  if (!tokenHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid token format' });
  } else {
    const token = tokenHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
});

app.use('/users', router);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
