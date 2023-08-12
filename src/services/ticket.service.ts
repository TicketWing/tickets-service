import axios from "axios";
import { redisClient } from "../connections/storage.connections";
import { APISearchRequestParams } from "../types/api-request.types";
import { APIRequestConstructor } from "../constructors/api-request.constructors";
import {
  CacheableStorage,
  InsertDBOptions,
  StorageRequestBuilder,
  ErrorHandler,
  GetDBOptions,
} from "ticketwing-storage-util";
import { FavoriteTicket, PurchasedTicket } from "../models/ticket.models";
import { TicketRecord } from "../types/ticket.types";

export class TicketService extends ErrorHandler {
  private apiToken: string;
  private purchased: CacheableStorage;
  private favorite: CacheableStorage;
  private api = axios.create({
    baseURL: "https://test.api.amadeus.com",
  });

  constructor() {
    super("TickerService", 501);
    this.apiToken = "";
    this.purchased = new CacheableStorage(PurchasedTicket, redisClient);
    this.favorite = new CacheableStorage(FavoriteTicket, redisClient);
  }

  private async init(): Promise<string> {
    if (this.apiToken) {
      return this.apiToken;
    }

    const route = "/security/oauth2/token";
    const params = {
      grant_type: "client_credentials",
      client_id: process.env.API_KEY,
      client_secret: process.env.API_SECRET,
    };
    const options = new APIRequestConstructor([], params);
    const resquest = this.api.post(route, null, options);
    const response = await this.handler(resquest, "API Init Error");
    this.apiToken = response.data.access_token;
    return this.apiToken;
  }

  async search(params: APISearchRequestParams): Promise<any> {
    await this.init();

    const route = "/shopping/flight-offers";
    const headers = [["Authorization", this.apiToken]];
    const options = new APIRequestConstructor(headers, params);
    const request = this.api.get(route, options);
    const response = await this.handler(request, "API Search Error");
    return response.data;
  }

  async getDetails(offerId: string): Promise<any> {
    await this.init();

    const route = `/shopping/flight-offers/${offerId}`;
    const headers = [["Authorization", this.apiToken]];
    const options = new APIRequestConstructor(headers);
    const request = this.api.get(route, options);
    const response = await this.handler(request, "API Get Details Error");
    return response.data;
  }

  async getFavorites(user_id: string) {
    const dbQueries = { where: { user_id }, select: [] };
    const options = new StorageRequestBuilder<GetDBOptions, undefined>(
      dbQueries
    ).build();
    const query = this.favorite.get(options);
    const favorites = await this.handler(query, "GET Error");
    const result = favorites.map((record: TicketRecord) => {
      return this.getDetails(record.ticket_id);
    });
    await Promise.all(result);
    return result;
  }

  async addToFavorite(user_id: string, ticket_id: string) {
    await this.init();

    const options = new StorageRequestBuilder<InsertDBOptions, undefined>({
      returning: [],
    }).build();

    const query = this.favorite.insert({ ticket_id, user_id }, options);
    await this.handler(query, "INSERT Error");
  }
}
