import { Handler, Routes, RouteRequest } from './types';

export class NotFoundError extends Error {
  constructor(url: string) {
    super(`Couldn't find route: ${url}`);
  }
}

export const initHandler: Handler = function(req, res, next) {
  try {
    const splitUrls = (req as RouteRequest).url.split('/').filter(url => url !== '');
    req._splitUrls = splitUrls;
    req._splitUrlsCursor = 0;
    req._splitUrlsLength = splitUrls.length;
    return next();
  } catch (e) {
    return next(e);
  }
};

export function routingHandler(routes: Routes): Handler {
  const fixedRoutes: Routes = {};
  for (const path in routes) {
    const fixedPath = path.replace(/^\//, '');
    fixedRoutes[fixedPath] = routes[path];
  }

  return (req, res, next) => {
    if (req._splitUrlsCursor >= req._splitUrlsLength) return next();
    const partialUrl = req._splitUrls[req._splitUrlsCursor];
    const handler = fixedRoutes[partialUrl];
    req._splitUrlsCursor++;
    if (handler) {
      return handler(req, res, next);
    } else {
      return next(new NotFoundError(req.url));
    }
  };
}
