// Events are anything that is happening in our application. We can listen to these events and execute some code when they occur. This is called event-driven programming.

// In Node.js, we can use the built-in 'events' module to create and handle events. The 'events' module provides a class called 'EventEmitter' that we can use to create our own event emitters.

const EventEmitter = require('events');

// create an instance of the EventEmitter class
const emitter = new EventEmitter();

// listen to an event

emitter.on('greet', (name) => {
  console.log(`Hello ${name}!`);
});

// emit the event
emitter.emit('greet', 'Hammad');
emitter.emit('greet', 'John');

const emitter2 = new EventEmitter();

emitter2.once('Welcome', () => {
  console.log('Welcome to our application!');
});

// emit the event but it will only be listened to once
emitter2.emit('Welcome');
emitter2.emit('Welcome'); // it will not be listened to because it was already listened to once
