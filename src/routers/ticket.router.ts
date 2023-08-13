import { Router } from "express";
import {
  authenticate,
  errorMiddleware,
  validate,
} from "ticketwing-storage-util";
import { responseMiddleware } from "../middlewares/response.middleware";
import { TicketController } from "../controllers/ticket.controller";
import {
  addToFavoritesValidationSchema,
  searchValidationSchema,
} from "../validations/ticket.validation";


const ticketController = new TicketController();

export const ticketRouter = Router();

ticketRouter.use(authenticate);

ticketRouter.post(
  "/search",
  validate(searchValidationSchema),
  responseMiddleware(ticketController.searchTickets.bind(ticketController)),
  errorMiddleware
);

ticketRouter.get(
  "/details/:id",
  responseMiddleware(ticketController.getTicketDetails.bind(ticketController)),
  errorMiddleware
);

ticketRouter.get(
  "/favorites",
  responseMiddleware(
    ticketController.getFavoriteTickets.bind(ticketController)
  ),
  errorMiddleware
);

ticketRouter.post(
  "/favorites",
  validate(addToFavoritesValidationSchema),
  responseMiddleware(
    ticketController.addTicketToFavorite.bind(ticketController)
  ),
  errorMiddleware
);
