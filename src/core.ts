import { Handler } from './types'

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
