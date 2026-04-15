const colors = require('colors');
const PORT = 8000;
const fs = require('node:fs');
const express = require('express');

const app = express();

const books = [
  { id: 1, title: 'Book one', Author: 'Author one' },
  { id: 2, title: 'Book two', Author: 'Author two' },
  { id: 3, title: 'Book three', Author: 'Author three' },
];

// ! middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log('I am Middleware A');
  next();
});
app.use((req, res, next) => {
  const log = `\n[${Date.now}] ${req.method} ${req.url} ${req.path}`;
  fs.appendFileSync('logs.txt', log, 'utf-8');
  next();
});

app.get('/books', (req, res) => {
  res.json(books);
});

app.get('/books/:id', (req, res) => {
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

app.post('/books', (req, res) => {
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

app.delete('/books/:id', (req, res) => {
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
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.green);
});
