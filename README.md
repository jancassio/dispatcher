# Dispatcher

[![Twitter: @jancassio](https://img.shields.io/badge/contact-@jancassio-blue.svg)](https://twitter.com/jancassio)
[![npm version](https://badge.fury.io/js/%40jancassio%2Fdispatcher.svg)](https://www.npmjs.com/package/@jancassio/dispatcher)

A very simple, lightweight and easy-to-use dispatcher object.

## Why another dispatcher?

There are my reasons to re-invent a dispatcher object for javascript projects.

1. So many features probably you don't (or never) use.
2. Heavy file output.
3. Not so easy to extend or not flexible.
4. Dependencies.
5. Needs some compiler/transpiler to use with ES5 (classic javascript syntax).

## What this dispatcher is?

1. Enough features, only emit, listen and unlisten events.
2. Lightweight for any kind of project.
3. Easy to extend, pretty simple flexibility.
4. Zero dependencies.
5. Works perfectly in ES5 and ES6.

## Usages

Here is the most simple way

```javascript
import Dispatcher from '@jancassio/dispatcher';

// Constant to be reused in event types, useful to avoid typos, across usage.
const EVENT_GO = 'event.go';

// A dispatcher's event handler.
function onEventGo (event) {
  console.log('[ onEventGo ]',
    'event.type: ', event.type,
    'event.payload', event.payload
  )
  
  // For unlisten/unsubscribe event. 
  Dispatcher.off( EVENT_GO, this.onEventGO );
}

// An action to emit event.
function sendEvent () {
  Dispatcher.emit(EVENT_GO, {message:"Hello World"});
}

// Register onEventGo to be called when 'event.go' be emitted.
Dispatcher.on(EVENT_GO, this.onEventGo);

// send the event after 1 second
setTimeout(this.sendEvent.bind(this), 1000);

```

Sometimes, you want to extend to be part of your structure, no problem.

```javascript
import Dispatcher from '@jancassio/dispatcher';

function MyClass () {}

MyClass.prototype = Object.create(Dispatcher, {
  constructor: MyClass
});

```

Some situations require to handle many emitters with a single handlers, also
you need to flag _"who is emitting an event?"_, ok here is.

```javascript
import Dispatcher from '@jancassio/dispatcher';

// Constant to be reused in event types, useful to avoid typos, across usage.
// ES6 classProperties module available only
var EVENT_GO = (id = 0) => { return `event.go.${id}` };
// or ES5
// var EVENT_GO = function (id) { return 'event.go.' + (id || 0); }

// A dispatcher's event handler.
function onEventGo (event) {
  console.log('[ onEventGo ]',
    'event.type: ', event.type,
    'event.payload', event.payload
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
I really like to receive feedbacks. Bugs, features, etc, are always welcome.
I just want to make sure, this dispatcher is helpful and works as excpected to
everyone.

## License
### MIT
