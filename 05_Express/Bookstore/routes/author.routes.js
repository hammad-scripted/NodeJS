import express from 'express';
const router = express.Router();

import {
  getAllAuthors,
  getAuthorById,
} from '../controllers/author.controller.js';
import { get } from 'node:http';

router.get('/', getAllAuthors);
router.get('/:id', getAuthorById);
export default router;
