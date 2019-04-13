export interface Request {
  test: string
}

export interface Response {
  json: () => void
}

export interface Handler {
  (req: Request, res: Response, next: <E extends Error>(err?: E) => void): void
}

export interface Routes {
  [key: string]: Handler | Routes
}