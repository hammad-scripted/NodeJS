// blocking code

const fs = require('fs');
const colors = require('colors');
const data = fs.readFileSync('data.txt', 'utf-8');
console.log(data);
console.log(
  'This will be printed after the data is read from the file.'.bgBlue.white,
);

// non-blocking code
fs.readFile('data.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
});
console.log(
  'This will be printed before the data is read from the file.'.bgMagenta.white,
);
