import { Router } from "express";
import { authenticate, errorMiddleware } from "ticketwing-storage-util";
import { responseMiddleware } from "../middlewares/response.middleware";
import { TicketController } from "../controllers/ticket.controller";

const ticketController = new TicketController();
export const ticketRouter = Router();

ticketRouter.use(authenticate);

ticketRouter.post(
  "search",
  responseMiddleware(ticketController.searchTickets.bind(ticketController)),
  errorMiddleware
);

ticketRouter.get(
  "details/:id",
  responseMiddleware(ticketController.getTicketDetails.bind(ticketController)),
  errorMiddleware
);

ticketRouter.get(
  "favorites",
  responseMiddleware(
    ticketController.getFavoriteTickets.bind(ticketController)
  ),
  errorMiddleware
);

ticketRouter.post(
  "favorites",
  responseMiddleware(
    ticketController.addTicketToFavorite.bind(ticketController)
  ),
  errorMiddleware
);
