import { Schema } from "mongoose";
import { TicketSchemas } from "../types/ticket.types";

export const purchasedTicketSchema = new Schema<TicketSchemas>({
  ticket_id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
});

export const favoriteTicketSchema = new Schema<TicketSchemas>({
  ticket_id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
});


