import { reduceHandlers } from '../src/core';
import { initHandler, routingHandler } from '../src/route'
import { Handler } from '../src/types';

test("reduceHandlers", () => {
  const called: any[] = []
  const handler1: Handler = (req, res, next) => {
    called.push(1)
    next()
  }
  const handler2: Handler = (req, res, next) => {
    called.push(2)
    next()
  }
  const handler3: Handler = (req, res, next) => {
    called.push(3)
    next()
  }
  const handler = reduceHandlers(handler1, handler2, handler3)
  handler({}, {}, (e) => {
    if (e) throw e
    called.push(4)
  })
  expect(called).toStrictEqual([1, 2, 3, 4])
});

test("initHandler", () => {
  let _req: any
  const substituteHandler: Handler = (req, res, next) => {
    _req = req
  }
  const rootHandler = reduceHandlers(initHandler, substituteHandler)
  rootHandler({
    url: '/test/aiueo'
  }, {}, (e) => {
    if (e) throw e
  })
  expect(_req).toStrictEqual({
    url: '/test/aiueo',
    _splitUrls: ['test', 'aiueo'],
    _splitUrlsCursor: 0,
    _splitUrlsLength: 2
  })
});

test("routingHandler", () => {
  const testRoute = (url: string) => {
    const called: string[] = []
    const a: Handler = (req, res, next) => {
      called.push('a')
      next()
    }
    const b: Handler = (req, res, next) => {
      called.push('b')
      next()
    }
    const router = routingHandler({
      '/a': a,
      '/b': reduceHandlers(b, routingHandler({
        '/a': a,
        '/b': b
      }))
    })
    const handler = reduceHandlers(initHandler, router)

    handler({ url }, {}, (e) => {
      if (e) throw e
    })
    const expected = url.split('/').filter(url => url)
    expect(called).toStrictEqual(expected)
  }
  
  testRoute('/a')
  testRoute('/b/a')
  testRoute('/b/b')
});