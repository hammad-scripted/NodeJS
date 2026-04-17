const db = require('./db');
const { userTable } = require('./drizzle/schema');

async function getAllUsers() {
  const users = await db.select().from(userTable);
  console.log(users);
}

async function createUser({ id, name, email }) {
  await db.insert(userTable).values({ id, name, email });
}

async function main() {
  await createUser({
    id: 1,
    name: 'Hammad',
    email: 'hammad@gmail.com',
  });

  await createUser({
    id: 2,
    name: 'Adnaan',
    email: 'adnaan@gmail.com',
  });

  await getAllUsers();
}

main();
