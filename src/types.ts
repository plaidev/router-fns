export interface Request {
  url?: string,
  // _splitUrls: string[];
  // _splitUrlsCursor: number;
  // _splitUrlsLength: number;
  [key: string]: any;
}

export interface Response {
  [key: string]: any;
}

export interface Handler {
  (req: Request, res: Response, next: <E extends Error>(err?: E) => void): void;
}

export interface Routes {
  [path: string]: Handler;
}
