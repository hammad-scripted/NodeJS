import express from 'express';
const router = express.Router();

import {
  getAllAuthors,
  getAuthorById,
  deleteAuthor,
  createAuthor,
  updateAuthor,
} from '../controllers/author.controller.js';

import { get } from 'node:http';

router.get('/', getAllAuthors);
router.get('/:id', getAuthorById);
router.post('/', createAuthor);
router.delete('/:id', deleteAuthor);
router.put('/:id', updateAuthor);
export default router;
