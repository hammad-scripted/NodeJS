import { booksTable } from '../models/book-model.js';
import db from '../db/index.js';
import { eq } from 'drizzle-orm';
import { ilike } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
export const getAllBooks = async (req, res) => {
  const searchQuery = req.query.search;
  if (searchQuery) {
    {
      try {
        const books = await db
          .select()
          .from(booksTable)
          .where(
            sql`to_tsvector('english', ${booksTable.title}) @@ to_tsquery('english', ${searchQuery}) OR to_tsvector('english', ${booksTable.description}) @@ to_tsquery('english', ${searchQuery})`,
          );
        if (books.length === 0) {
          return res.status(404).json({
            message: `No books found matching the search query: ${searchQuery}`,
          });
        } else {
          return res.json(books);
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  } else {
    try {
      const books = await db.select().from(booksTable);
      return res.json(books);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

export const getBookById = async (req, res) => {
  try {
    const id = req.params.id;

    const book = await db
      .select()
      .from(booksTable)
      .where(eq(booksTable.id, id))
      .limit(1);
    if (book.length === 0) {
      return res
        .status(404)
        .json({ error: `Book with id:${id} does not exist!` });
    } else {
      return res
        .status(200)
        .json({ success: `Book with id:${id} exist!`, book: book });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createBook = async (req, res) => {
  try {
    const { title, description, authorId } = req.body;
    if (
      !title ||
      title == '' ||
      !description ||
      description == '' ||
      !authorId ||
      authorId == ''
    ) {
      return res
        .status(400)
        .json({ error: 'Title, description, and AuthorId are required!' });
    }
    const newBook = await db
      .insert(booksTable)
      .values({ title, description, authorId })
      .returning({
        id: booksTable.id,
      });
    return res.status(201).json({
      message: `Book added successfully with id:${newBook[0].id}   `,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteBook = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedBook = await db
      .delete(booksTable)
      .where(eq(booksTable.id, id))
      .returning({ id: booksTable.id });
    if (deletedBook.length === 0) {
      return res
        .status(404)
        .json({ error: `Book with id:${id} does not exist!` });
    } else {
      return res
        .status(200)
        .json({ message: `Book with id:${id} deleted successfully!` });
    }
  } catch (error) {
    console.log(error);
  }
};
