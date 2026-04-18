import chalk from 'chalk';
const PORT = 3000;
// const fs = require('node:fs');

// const express = require('express');
import express from 'express';

const app = express();

import bookRouter from './routes/book.routes.js';
import authorRouter from './routes/author.routes.js';
import { jsonParser, middlewareA, logger } from './middleware/middlewares.js';
// ! middleware

app.use(jsonParser);
app.use(middlewareA);
app.use(logger);
// // routes

app.use('/books', bookRouter);
app.use('/authors', authorRouter);

app.listen(PORT, () => {
  console.log(chalk.green(`Server is running on port ${PORT}`));
});
