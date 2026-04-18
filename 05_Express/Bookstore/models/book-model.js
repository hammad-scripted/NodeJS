import { pgTable, uuid, varchar, text } from 'drizzle-orm/pg-core';
import { authorsTable } from './author-model';

export const booksTable = pgTable('books', {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  authorId: uuid()
    .references(() => authorsTable.id)
    .notNull(),
});
