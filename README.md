# DEPRECATED

Please use https://github.com/auth0/auth0-common-logging

----

Common utilities to write formatted logs in auth0 components.

## Installation

```
npm i git+ssh://git@gitlab.auth0.com:devops/auth0-common-logging.git
```

## EventLogger

The watcher is a common abstraction that can subscribe to events of different node.js instances and write logs in a predefined logger.

```js

var EventLogger = require('auth0-common-logging').EventLogger
var eventLogger = new EventLogger(bunyanLogger);

eventLogger.watch(process);
eventLogger.watch(httpServer);
```


### process event logger

The process event logger emits a log entry for the following events of a node.js process instance:

-  exit signals events: `SIGTERM`, `SIGINT`
-  `uncaughtException`

In addition to these 3 events it emits and "starting" log entry inmediatelly when is called.

Please note, that subscribing to the afore mentioned events normally changes the behavior of node.js, this means that the process will not longer exit by itself, you need to subscribe and exit. Example:

```javascript
eventLogger.watch(process);

var exit = function (exitCode) {
  return function () { process.exit(exitCode); };
}

process.on('SIGTERM', exit(0))
       .on('SIGINT', exit(0))
       .on('uncaughtException', exit(1));
```

### http event logger

The http event logger log entries for the following events of a node.js process instance:

-  `listening`

## Common Streams used for logs

```javascript
var HttpWritableStream = require('auth0-common-logging').Streams.HttpWritableStream;
var httpWritableStream = new HttpWritableStream('http://url');

```