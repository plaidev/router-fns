export interface Request {
  url: string,
  _splitUrls: string[],
  _splitUrlsCursor: number,
  _splitUrlsLength: number,
}

export interface Response {
  json: () => void
}

export interface Handler {
  (req: Request, res: Response, next: <E extends Error>(err?: E) => void): void
}

export interface Routes {
  [path: string]: Handler
}