import { Request, Response, Handler, Routes } from './types'
import { reduceHandlers, flattenRoutes } from './utils'

function main() {
  const req: Request = {
    test: 'h'
  }
  const res: Response = {
    json() {
    }
  }
  const mw1: Handler = (req, res, next) => {
    console.log('1')
    next()
  }
  const mw2: Handler = (req, res, next) => {
    console.log('2')
    next()
  }

  const handlerA: Handler = reduceHandlers(mw1, mw2, (req, res) => {
    console.log('A')
    res.json()
  })

  const handlerB: Handler = (req, res) => {
    console.log('B')
  }

  const handlerC: Handler = (req, res) => {
    console.log('C')
  }

  const handlerD: Handler = (req, res) => {
    console.log('C')
  }

  const cxdiveRouter: Routes = {
    '/user': handlerA,
    '/': handlerD,
  }

  const eventRouter: Routes = {
    '/cxdive': cxdiveRouter,
    '/anv': handlerB
  }

  const rootRouter: Routes = {
    '/event': eventRouter,
    '/health': handlerC,
  }

  const routes = flattenRoutes(rootRouter)

  const handler = routes['/event/cxdive/']
  console.log(handler, routes)
  if (handler) {
    handler(req, res, (err) => {
      if (err) throw err
      console.log('end')
    })
  }
}

main()