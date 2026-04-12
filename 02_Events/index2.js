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
chat.sendMessage('How are you?');
chat.sendMessage('Goodbye!');

// Example of using 'once' method to listen to an event only once

class User extends EventEmitter {
  introduce(name) {
    console.log(`My name is ${name}`.yellow);
    this.emit('introduced', name);
  }
}

// listen to the 'introduced' event only once
const user = new User();
user.once('introduced', (name) => {
  console.log(`Welcome ${name} to our application!`.magenta);
});

// trigger the 'introduced' event
user.introduce('Hammad');
user.introduce('John'); // it will not be listened to because it was already listened to once
