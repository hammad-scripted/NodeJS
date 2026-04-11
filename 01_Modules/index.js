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
const content = fs.readFileSync('01_Modules/data.txt', 'utf-8');
console.log(content);
