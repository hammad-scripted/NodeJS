const colors = require('colors');
const http = require('node:http');

const server = http.createServer((req, res) => {
  if (req.url == '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Hello World!</h1>', 'utf8', function (err) {
      if (err) {
        console.error('Error writing response:', err);
      }
    });
    res.end('This is the end of the response.');
  } else if (req.url == '/contact-us') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(
      '<h1>Contact Us</h1><p>You can contact us at 123-456-7890</p>',
      'utf8',
      function (err) {
        if (err) {
          console.error('Error writing response:'.bgCyan, err);
        }
      },
    );
  } else if (req.url == '/tweet' && req.method == 'POST') {
    // Handle POST request for /tweet endpoint
    let body = '';
    // attach a listener to the 'data' event of the request object to receive the data sent in the request body. We concatenate the chunks of data received into a single string variable called body. Once all the data has been received, we attach a listener to the 'end' event of the request object, which is triggered when the entire request body has been received. Inside this listener, we log the received data to the console and send a response back to the client indicating that the tweet has been received.
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    // attach a listener to the 'end' event of the request object, which is triggered when the entire request body has been received. Inside this listener, we log the received data to the console and send a response back to the client indicating that the tweet has been received.
    req.on('end', () => {
      console.log('Received POST request for /tweet:'.bgYellow, body);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write('<h1>Tweet Received!</h1>', 'utf8', function (err) {
        if (err) {
          console.error('Error writing response:'.bgBlue, err);
        }
      });
      res.end('This is the end of the response.');
    });
  }
});

server.listen(8000, () => {
  console.log('Server started on port 8000'.bgGreen);
});
