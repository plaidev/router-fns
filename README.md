# router-fns : absolutely simple routing libary

Absolutely simple, so that strong. All you need is handler, as with linux's process. It's just that.

## Installation

```
$ npm i -SE router-fns
```

## Usage

### Handler

Express-like handler.

```ts
const handler = (req, res, next) => {
  try {
    // do something
    next();
  } catch (e) {
    next(e);
  }
};
```

### reduceHandlers

Reduce multiple handlers into one handler.
This reducer is designed to implement middleware pattern.

```ts
import { reduceHandlers } from 'router-fns';
const handler = reduceHandlers(handlerA, handlerB, handlerC);
```

### initHandler

A handler which initializes request object for routing. It is required to be called before routing.

```ts
import { reduceHandlers, initHandler } from 'router-fns';
const rootHandler = reduceHandlers(initHandler, router);
```

### routingHandler

Create a handler which aims to route recieved request to appropriate handler.

```ts
import { routingHandler, initHandler } from 'router-fns';

const router = routingHandler({
  '/routeA': routingHandler({
    '/subRouteA': handlerA
  }),
  '/routeB': handlerB
});
const rootHandler = reduceHandlers(initHandler, router);

rootHandler({ url: '/routeA/subRouteA' }, {}, e => {
  if (e) throw e;
});
```
