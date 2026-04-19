import express from 'express';
const router = express.Router();

import {
  createBook,
  getAllBooks,
  updateBook,
} from '../controllers/book.controller.js';
import { getBookById } from '../controllers/book.controller.js';
import { deleteBook } from '../controllers/book.controller.js';
router.get('/', getAllBooks);

router.get('/:id', getBookById);

router.post('/', createBook);

router.delete('/:id', deleteBook);
router.put('/:id', updateBook);

export default router;
