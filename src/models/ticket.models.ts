import { Model } from "mongoose";
import {
  favoriteTicketSchema,
  purchasedTicketSchema,
} from "../schemas/ticket.schemas";

export const PurchasedTicket = new Model(
  "PurchasedTicket",
  purchasedTicketSchema
);

export const FavoriteTicket = new Model("LikedTicket", favoriteTicketSchema);
