import {
  APIRequestAuthParams,
  APIRequestSearchParams,
  APIRequestHeaders,
  RawHeaders,
} from "../types/api-request.types";

export class APIRequestConstructor {
  readonly headers: APIRequestHeaders | undefined;
  readonly params: APIRequestSearchParams | APIRequestAuthParams | undefined;

  constructor(
    headersOptions: RawHeaders,
    params:
      | APIRequestSearchParams
      | APIRequestAuthParams
      | undefined = undefined
  ) {
    this.headers = this.setHeadersObj(headersOptions);
    this.params = params;
  }

  setHeadersObj(options: RawHeaders): APIRequestHeaders | undefined {
    const headersObject: APIRequestHeaders = {};

    if (!options.length) return undefined;

    for (const [key, value] of options) {
      headersObject[key] = value;
    }

    return headersObject;
  }
}
