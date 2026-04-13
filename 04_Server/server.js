const http = require('node:http');

const server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello World!</h1>', 'utf8', function (err) {
    if (err) {
      console.error('Error writing response:', err);
    }
  });
  res.end('This is the end of the response.');
});
// console.log(server);

server.listen(3000, function () {
  console.log(`The server started successfully on port ${3000}`);
});
