const EventEmitter = require('events');
const colors = require('colors');
class ChatApp extends EventEmitter {
  //   method
  sendMessage(msg) {
    console.log(`Message sent, ${msg}`.green);
    this.emit('messageSent', msg);
  }
}

const chat = new ChatApp();
// ? listen to the 'messageSent' event and execute the callback function when the event is emitted
chat.on('messageSent', (msg) => {
  console.log(`You sent a message: ${msg}`.blue);
});

// ? emit the 'messageSent' event and pass the message as an argument to the callback function
chat.sendMessage('Hello World!');
