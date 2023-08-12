export type APIRequestHeaders = {
  [key: string]: string;
};

export type RawHeaders = string[][];

export type APISearchRequestParams = {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  adults: number;
  currencyCode: string;
  max?: number;
  sort?: string;
};

export type APIRequestAuthParams = {
  grant_type: string;
  client_id: string;
  client_secret: string;
};
