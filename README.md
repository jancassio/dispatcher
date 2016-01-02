# Dispatcher

[![Twitter: @jancassio](https://img.shields.io/badge/contact-@jancassio-blue.svg?style=flat)](https://twitter.com/jancassio)

A very simple, lightweight and easy-to-use dispatcher object.

## Why another dispatcher

1. So many features you probably don't (or never) use.
2. Heavy file output.
3. Not flexible.
4. Dependencies.
5. Needs some compiler/transpiler to use with ES5 (classic javascript syntax).

## Usages

Here is the most simple way

```javascript
Dispatcher = require('dispatcher');

// Constant to be reused in event types, useful to avoid typos, across usage.
const EVENT_GO = 'event.go';

// A dispatcher's event handler.
function onEventGo (event) {
  console.log('[ onEventGo ]',
    'event.type: ', event.type,
    'event.payload', payload
  )
}

// An action to emit event.
function sendEvent () {
  Dispatcher.emit(EVENT_GO, {message:"Hello World"});
}

// Register onEventGo to be called when 'event.go' be emitted.
Dispatcher.on(EVENT_GO, onEventGo);

// send the event after 1 second
setTimeout(this.sendEvent.bind(this), 1000);

```

Sometimes, you want to extend to be part of your structure, no problem.

```javascript
Dispatcher = require('dispatcher');

function MyClass () {}

MyClass.prototype = Object.create(Dispatcher, {
  constructor: MyClass
});

```

Some situations require to handle many emitters with a single handlers, also
you need to flag _"who is emitting an event?"_, ok here is.

```javascript
Dispatcher = require('dispatcher');

// Constant to be reused in event types, useful to avoid typos, across usage.
// ES6 classProperties module available only
var EVENT_GO = (id = 0) => { return `event.go.${id}` };
// or ES5
// var EVENT_GO = function (id) { return 'event.go.' + (id || 0); }

// A dispatcher's event handler.
function onEventGo (event) {
  console.log('[ onEventGo ]',
    'event.type: ', event.type,
    'event.payload', payload
  )
}

// An action to emit event.
function sendEvent (id) {
  Dispatcher.emit(EVENT_GO(id), {message:"Hello World"});
}

// Register onEventGo to be called when 'event.go' be emitted.


// Dirty simple example of emit many events to a single handler with
// a event identifier.

for (var i = 100; i > 0; i--) {
  Dispatcher.on(EVENT_GO(i), onEventGo);
  setTimeout(this.sendEvent.bind(this, i), 1000)
}

```

## Contribution
I really like to receive feedbacks. Bugs, features, etc are welcome. I just want
to make sure, this dispatcher is helpful.

## License
### MIT
