import { pgTable, uuid, varchar, text } from 'drizzle-orm/pg-core';

export const booksTable = pgTable('books', {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
});
