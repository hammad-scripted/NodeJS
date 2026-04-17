const db = require('./db');
const { userTable } = require('./drizzle/schema');
require('dotenv/config');
async function getAllUsers() {
  const users = await db.select().from(userTable);
  console.log(users);
}

async function createUser({ id, name, email }) {
  await db.insert(userTable).values({ id, name, email });
}

async function main() {
  await createUser({
    id: 3,
    name: 'Rohan',
    email: 'rohan@gmail.com',
  });

  await createUser({
    id: 4,
    name: 'Paul',
    email: 'paul@gmail.com',
  });

  await getAllUsers();
}

main();
