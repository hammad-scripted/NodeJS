import { booksTable } from '../models';
import { db } from '../drizzle';
import { eq } from 'drizzle-orm';
export const getAllBooks = async (req, res) => {
  try {
    const books = await db.select().from(booksTable);
    res.json(books);
  } catch (err) {
    console.log(err);
  }
};

export const getBookById = async (req, res) => {
  try {
    const id = req.params.id;

    const book = await db
      .select()
      .from(booksTable)
      .where((table) => eq(table.id, id))
      .limit(1);
    if (!book) {
      return res.status().json({ error: `Book with id:${id} does not exist!` });
    } else {
      return res
        .status(200)
        .json({ success: `Book with id:${id} exist!`, book: book });
    }
  } catch (error) {
    console.log(error);
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
      .where((table) => eq(table.id, id))
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
