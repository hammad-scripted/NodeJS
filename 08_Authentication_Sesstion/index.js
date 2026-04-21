import express from 'express';
import router from './routes/user.routes.js';
import db from './db/index.js';
import { usersTable } from './db/schema.js';
import { userSession } from './db/schema.js';

import { eq } from 'drizzle-orm';
const app = express();

app.use(express.json());
app.use(async (req, res, next) => {
  const sessionId = req.headers['session-id'];
  if (!sessionId) {
    return next();
  }
  const currentSession = await db
    .select({
      sessionId: userSession.id,
      id: usersTable.id,
      userId: userSession.userId,
      name: usersTable.name,
      email: usersTable.email,
    })
    .from(userSession)
    .rightJoin(usersTable, eq(userSession.userId, usersTable.id))
    .where(eq(userSession.id, sessionId));
  if (currentSession.length === 0) {
    return next();
  }
  req.user = currentSession[0];
  next();
});

app.use('/users', router);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
