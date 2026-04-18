import { pgTable, uuid, varchar, text, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { authorsTable } from './author-model.js';

export const booksTable = pgTable(
  'books',
  {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 255 }).notNull(),
    description: text(),
    authorId: uuid()
      .references(() => authorsTable.id)
      .notNull(),
  },
  (table) => [
    index('idx_books').using(
      'gin',
      sql`to_tsvector('english', ${table.title} || ' ' || ${table.description}) `,
    ),
  ],
);
