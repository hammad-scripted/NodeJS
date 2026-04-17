const { drizzle } = require('drizzle-orm/node-postgres');

// Connect to the PostgreSQL database using Drizzle ORM
// postgre://:<username> :<password>@localhost/:<database_name>
const db = drizzle('postgres://postgres:admin@localhost:5432/mydb');

module.exports = db;
