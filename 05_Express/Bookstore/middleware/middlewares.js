import express from 'express';
import fs from 'node:fs';

export const jsonParser = express.json();
export const middlewareA = (req, res, next) => {
  console.log('I am Middleware A');
  next();
};
export const logger = (req, res, next) => {
  const log = `\n[${Date.now}] ${req.method} ${req.url} ${req.path}`;
  fs.appendFileSync('logs.txt', log, 'utf-8');
  next();
};
