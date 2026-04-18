import { authorsTable } from '../models/author-model.js';
import db from '../db/index.js';
import { eq } from 'drizzle-orm';

export const getAllAuthors = async (req, res) => {
  try {
    const authors = await db.select().from(authorsTable);
    return res.json(authors);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAuthorById = async (req, res) => {
  try {
    const id = req.params.id;
    const author = await db
      .select()
      .from(authorsTable)
      .where(eq(authorsTable.id, id));
    if (author.length === 0) {
      return res
        .status(404)
        .json({ error: `Author with id:${id} does not exist!` });
    } else {
      return res.json(author);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createAuthor = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    if (!firstName || !lastName || !email) {
      return res
        .status(400)
        .json({ error: 'Missing required fields: firstName, lastName, email' });
    } else {
      const newAuthor = await db
        .insert(authorsTable)
        .values({ firstName, lastName, email })
        .returning();
      if (newAuthor.length > 0) {
        {
          return res.status(201).json({
            success: 'Author created successfully',
            author: newAuthor[0],
          });
        }

        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteAuthor = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedAuthor = await db
      .delete(authorsTable)
      .where(eq(authorsTable.id, id))
      .returning();
    if (deletedAuthor.length === 0) {
      return res
        .status(404)
        .json({ error: `Author with id:${id} does not exist!` });
    } else {
      return res
        .status(200)
        .json({ message: `Author with id:${id} deleted successfully!` });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const updateAuthor = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedAuthor = await db
      .update(authorsTable)
      .set(req.body)
      .where(eq(authorsTable.id, id))
      .returning();
    if (updatedAuthor.length === 0) {
      return res
        .status(404)
        .json({ error: `Author with id:${id} does not exist!` });
    } else {
      return res
        .status(200)
        .json({ message: `Author with id:${id} updated successfully!` });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
