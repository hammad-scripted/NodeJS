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
