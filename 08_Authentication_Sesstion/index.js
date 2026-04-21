import express from 'express';
import router from './routes/user.routes.js';
import adminRouter from './routes/admin.routes.js';
import db from './db/index.js';
import { usersTable } from './db/schema.js';
import { userSession } from './db/schema.js';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import { authenticationMiddleware } from './middlewares/auth.middleware.js';

const app = express();

app.use(express.json());
app.use(authenticationMiddleware);

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

app.use('/users', router);
app.use('/admin', adminRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
