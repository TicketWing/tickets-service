import { Application } from "express";
import { ticketRouter } from "./ticket.router";

export class AppRouters {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  init() {
    this.app.use("ticket", ticketRouter);
  }
}
