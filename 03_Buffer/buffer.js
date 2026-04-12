// Buffer is the temporary storage for binary data in Node.js. It is used to handle raw data, such as files, network streams, and more. Buffers are instances of the Buffer class and can be created using various methods.

const fs = require('node:fs');
const buffer1 = Buffer.alloc(10); // Creates a buffer of 10 bytes filled with zeros
console.log(buffer1);

const buffer2 = Buffer.from('Hello,World!');
console.log(buffer2);

const buffer3 = Buffer.from([1, 2, 3, 4, 5]);
console.log(buffer3);

const buffer4 = Buffer.allocUnsafe(10); // Creates a buffer of 10 bytes without initializing it (may contain old data)
console.log(buffer4);

const buffer5 = Buffer.from('Hello, World!', 'utf-8'); // Creates a buffer from a string with specified encoding
console.log(buffer5);
console.log(buffer5.toString());

// create and read buffer stream

const readBufferStream = fs.createReadStream('./input.txt');

const writeBufferStream = fs.createWriteStream('./output.txt');

// pip the read stream to the write stream to handle the backpressure automatically
readBufferStream.pipe(writeBufferStream);

readBufferStream.on('error', (err) => {
  console.log('Error', err);
});

writeBufferStream.on('error', (err) => {
  console.log('Error', err);
});

writeBufferStream.on('finish', () => {
  console.log('Done!');
});

readBufferStream.on('data', (chunk) => {
  console.log(chunk);
});
