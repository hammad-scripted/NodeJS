require('dotenv/config');
const { drizzle } = require('drizzle-orm/node-postgres');

// Connect to the PostgreSQL database using Drizzle ORM
// postgre://:<username> :<password>@localhost/:<database_name>
const db = drizzle(process.env.DATABASE_URL);

module.exports = db;
