import axios from "axios";
import { Storage } from "ticketwing-storage-util";
import { knexPool, redisClient } from "../connections/storage.connections";
import { CustomError } from "../utils/error.util";
import { APIRequestSearchParams } from "../types/api-request.types";
import { APIRequestConstructor } from "../constructors/api-request.constructors";

export class TicketService {
  private table = "tickets";
  private apiToken: string;
  private api = axios.create({
    baseURL: "https://test.api.amadeus.com",
  });
  private storage: Storage;

  constructor() {
    this.apiToken = "";
    this.storage = new Storage(knexPool, redisClient, this.table);
  }

  async init(): Promise<string> {
    if (this.apiToken) {
      return this.apiToken;
    }

    try {
      const route = "/security/oauth2/token";
      const params = {
        grant_type: "client_credentials",
        client_id: process.env.API_KEY,
        client_secret: process.env.API_SECRET,
      };
      const options = new APIRequestConstructor([], params);
      const response = await this.api.post(route, null, options);
      this.apiToken = response.data.access_token;
      return this.apiToken;
    } catch (error) {
      throw new CustomError("API Error", "Error with get access", 401);
    }
  }

  async searchFlights(params: APIRequestSearchParams): Promise<any> {
    await this.init();

    try {
      const route = "/shopping/flight-offers";
      const headers = [["Authorization", this.apiToken]];
      const options = new APIRequestConstructor(headers, params);
      const response = await this.api.get(route, options);
      return response.data;
    } catch (error) {
      throw new CustomError("TicketService Error", "Can`t get tickets", 404);
    }
  }

  async getFlightDetails(offerId: string): Promise<any> {
    await this.init();

    try {
      const route = `/shopping/flight-offers/${offerId}`;
      const headers = [["Authorization", this.apiToken]];
      const options = new APIRequestConstructor(headers);
      const response = await this.api.get(route, options);

      return response.data;
    } catch (error) {
      throw new CustomError("TicketService Error", "Can`t get ticket", 404);
    }
  }
}
