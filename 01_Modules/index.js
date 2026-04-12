// Modules

// 1. Built in modules
// 2. Third party modules
// 3. Custom modules

// 1. Built in modules
const os = require('os');
console.log(os.type());
console.log(os.platform());
console.log(os.homedir());
console.log(os.freemem());
console.log(os.totalmem());
console.log(os.cpus());

const fs = require('fs');
const content = fs.readFileSync('data.txt', 'utf-8');
console.log(content);

fs.writeFileSync('data.txt', 'Hello World!');
const newContent = fs.readFileSync('data.txt', 'utf-8');
console.log(newContent);

const colors = require('colors');
console.log('Hello World!'.green);
console.log('Hello World!'.red);
console.log('Hello World!'.blue);
console.log('Hello World!'.yellow);

// 2. Third party modules
// 3. Custom modules
