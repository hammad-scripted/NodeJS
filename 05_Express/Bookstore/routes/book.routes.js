import express from 'express';
const router = express.Router();

import { createBook, getAllBooks } from '../controllers/book.controller.js';
import { getBookById } from '../controllers/book.controller.js';
import { deleteBook } from '../controllers/book.controller.js';
router.get('/', getAllBooks);

router.get('/:id', getBookById);

router.post('/', createBook);

router.delete('/:id', deleteBook);

export default router;
