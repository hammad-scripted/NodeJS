const colors = require('colors');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
  res.status(201).end('End !');
});
app.listen(3000, () => {
  console.log(colors.green('Server is running on port 3000'));
});
