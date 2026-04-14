const http = require('node:http');
// http is a global module, so we don't need to install it using npm. We can directly require it in our code.
// const http is a object that contains all the methods and properties of the http module. We can use it to create a server and handle requests and responses.
// http.createServer() is a method that creates a new HTTP server. It takes a callback function as an argument, which is called every time a request is made to the server. The callback function takes two arguments: req (the request object) and res (the response object).
// server==> is a variable that holds the reference to the server created by http.createServer(). We can use this variable to listen for incoming requests and handle them accordingly.So its a server object that we can use to listen for incoming requests and handle them accordingly. We can also use it to close the server when we are done with it.
const server = http.createServer((req, res) => {
  // req and res are objects that represent the incoming request and the outgoing response, respectively. We can use these objects to read data from the request and write data to the response.
  // req and res are instances of the http.IncomingMessage and http.ServerResponse classes, respectively. They have various properties and methods that we can use to handle the request and response.
  // various properties of req include url, method, headers, etc. We can use these properties to get information about the incoming request and handle it accordingly. For example, we can check the url property to determine which endpoint the request is targeting and respond accordingly.
  // various methods of res include writeHead(), write(), end(), etc. We can use these methods to set the status code and headers of the response, write data to the response body, and end the response when we are done with it.
  console.log(req.url);
  console.log(req.headers);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Hello, World!' }));
});
// server.listen() is a method that starts the server and listens for incoming requests on a specified port. It takes two arguments: the first is the port number (in this case, 8000), and the second is a callback function that is called when the server starts successfully. In this example, we log a message to the console indicating that the server has started successfully on port 8000.
server.listen(8000, () => {
  console.log(`The server started successfully on port ${8000}`);
});
