import express from 'express';
import books from '../db/book.js';
const router = express.Router();

router.get('/', (req, res) => {
  res.json(books);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Id mus be an integer!' });
  }

  const book = books.find((e) => e.id == id);
  if (!book) {
    return res
      .status(404)
      .json({ error: `Book with id:${id} does not exist!` });
  } else {
    return res
      .status(200)
      .json({ success: `Book with id:${id} exist!`, book: book });
  }
});

router.post('/', (req, res) => {
  console.log(req.headers);
  console.log(req.body);

  const { title, Author } = req.body;

  if (!title || title == '' || !Author || Author == '') {
    return res.status(400).json({ error: 'Title and Author are required!' });
  }
  const id = books.length + 1;
  const newBook = { id: id, title, Author };
  books.push(newBook);
  return res.status(201).json({
    message: `Book added successfully with id:${id}   `,
  });
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: `Id mus be an integer!` });
  }

  const bookIndex = books.findIndex((e) => e.id === id);
  if (bookIndex < 0) {
    return res
      .status(404)
      .json({ error: { error: `Book with id:${id} does not exist!` } });
  } else {
    books.splice(bookIndex, 1);
    return res.status(200).json({ message: 'book deleted' });
  }
});

export default router;
