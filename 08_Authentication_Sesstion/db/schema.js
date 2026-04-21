import {
  integer,
  pgTable,
  varchar,
  text,
  uuid,
  pgEnum,
  timestamp,
} from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['USER', 'ADMIN']);

export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  role: userRoleEnum().default('USER').notNull(),
  password: text().notNull(),
  salt: text().notNull(),
});

export const userSession = pgTable('user_session', {
  id: uuid().primaryKey().defaultRandom(),
  userId: integer()
    .references(() => usersTable.id)
    .notNull(), // foreign key reference to users table
  createdAt: timestamp().defaultNow().notNull(),
});
