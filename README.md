# handler

## 設計哲学

> All you need is handler

## Utilities

### reduceHandlers

複数のハンドラーを一つのハンドラーにまとめる関数

```ts
const handler: Handler = reduceHandlers(handlerA, handlerB, handlerC);
```

### Routing

#### initHandler

ルーティングをするために必要なハンドラー。一番始めに呼ぶ必要がある。

```ts
const rootHandler: Handler = reduceHandlers(initHandler, router);
```

#### routingHandler

ルーティングをするハンドラーを作る関数

```ts
const handler: Handler = routingHandler({
  '/routeA': handlerA,
  '/routeB': handlerB
});

const handler2: Handler = routingHandler({
  '/routeA': routingHandler({
    '/subRouteA': handlerA
  }),
  '/routeB': handlerB
});
```
