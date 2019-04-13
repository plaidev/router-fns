import { Handler, Routes } from './types'

/**
 * Reduce multiple handlers into one handler.
 * This reducer is designed to implement middleware pattern.
 */
export function reduceHandlers(...handlers: Handler[]): Handler {
  return handlers.reduce((a, b) => {
    return (req, res, next) => {
      const _next = <E extends Error>(err?: E) => {
        if (err) throw err
        return b(req, res, next)
      }
      return a(req, res, _next)
    }
  })
}

/**
 * Flatten deeply nested router object
 */
export function flattenRoutes(router: Routes): { [key: string]: Handler } {
  const flattenedRoutes: { [key: string]: Handler }  = {}

  for (const key in router) {
    if (router[key] instanceof Function) {
      flattenedRoutes[key] = router[key] as Handler
    } else {
      const subRoutes = router[key] as Routes
      const flattenedSubRoutes: { [key: string]: Handler } = flattenRoutes(subRoutes)
      for (const subKey in flattenedSubRoutes) {
        flattenedRoutes[key + subKey] = flattenedSubRoutes[subKey]
      }
    }
  }
  return flattenedRoutes
}