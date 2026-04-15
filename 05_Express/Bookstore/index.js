const colors = require('colors');
const PORT = 8000;
const express = require('express');

const app = express();

const books = [
  { id: 1, title: 'Book one', Author: 'Author one' },
  { id: 2, title: 'Book two', Author: 'Author two' },
  { id: 3, title: 'Book three', Author: 'Author three' },
];

app.get('/books', (req, res) => {
  res.json(books);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.green);
});
