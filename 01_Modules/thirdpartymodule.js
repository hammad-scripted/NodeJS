// ? Third party modules are modules that are not built in to Node.js, but can be installed using npm (Node Package Manager).

// To install a third party module, you can use the following command in your terminal:
// npm install <module-name>
// For example, to install the 'colors' module, you can use the following command:
// npm install colors

// After installing the module, you can require it in your code and use its functionality. For example:
const colors = require('colors');
console.log('Hello World!'.green);
console.log('Hello World!'.red);
console.log('Hello World!'.blue);
console.log('Hello World!'.yellow);

const moment = require('moment');
console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
