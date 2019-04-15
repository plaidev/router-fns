export interface RouteRequest {
  url: string,
  _splitUrls: string[],
  _splitUrlsCursor: number,
  _splitUrlsLength: number,
}

export interface AnyRequest {
  [key: string]: any
}

export interface AnyResponse {
  [key: string]: any
}

export interface Handler<REQ = AnyRequest, RES = AnyResponse> {
  (req: REQ, res: RES, next: <E extends Error>(err?: E) => void): void
}

export interface Routes<REQ = AnyRequest, RES = AnyResponse> {
  [path: string]: Handler<REQ, RES>
}