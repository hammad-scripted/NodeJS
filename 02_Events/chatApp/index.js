const ChatRoom = require('./chatRoom.js');

const chat = new ChatRoom();

// listen to the 'userJoined' event an execute the callback function when the event is emitted
chat.on('userJoined', (user) => {
  console.log(`Welcome ${user} to the chat room!`.magenta);
});

// listen to the 'messageSent' event and execute the callback function when the event is emitted
chat.on('messageSent', ({ user, message }) => {
  console.log(`${user} sent a message: ${message}`.grey);
});

// listen to the 'userLeft' event and execute the callback function when the event is emitted
chat.on('userLeft', (user) => {
  console.log(`${user} left the chat room`.yellow);
});

// trigger the Events;
chat.join('Hammad');
chat.sendMessage('Hammad', 'Hello everyone!');
chat.sendMessage('John', 'Hi Hammad!'); // it will not be listened to because John is not in the chat room

chat.leave('Hammad');
