const EventEmitter = require('events');
const colors = require('colors');

class ChatRoom extends EventEmitter {
  constructor() {
    super();
    this.users = new Set();
  }
  join(user) {
    this.users.add(user);
    console.log(`${user} joined the chat room`.green);
    this.emit('userJoined', user);
  }

  sendMessage(user, message) {
    if (this.users.has(user)) {
      console.log(`${user} sent a message: ${message}`.blue);
      this.emit('messageSent', { user, message });
    } else {
      console.log(`${user} is not in the chat room`.red);
    }
  }
  leave(user) {
    if (this.users.has(user)) {
      this.users.delete(user);
      console.log(`${user} left the chat room`.yellow);
      this.emit('userLeft', user);
    } else {
      console.log(`${user} is not in the chat room`.red);
    }
  }
}

module.exports = ChatRoom;
