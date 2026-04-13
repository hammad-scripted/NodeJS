const http = require('node:http');

const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log(req.headers);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Hello, World!' }));
});
server.listen(8000, () => {
  console.log(`The server started successfully on port ${8000}`);
});
