import { TicketService } from "../services/ticket.service";

export class TicketController {
  private service: TicketService;

  constructor() {
    this.service = new TicketService();
  }

  async searchTickets(req: any) {
    const { body } = req;
    const tickets = await this.service.search(body);
    return tickets;
  }

  async getTicketDetails(req: any) {
    const { offerId } = req.params;
    const details = await this.service.getDetails(offerId);
    return details;
  }

  async getFavoriteTickets(req: any) {
    const { id } = req.identification;
    const favoriteTickets = await this.service.getFavorites(id);
    return favoriteTickets;
  }

  async addTicketToFavorite(req: any) {
    const { id } = req.identification;
    const { ticket_id } = req.body;
    await this.service.addToFavorite(id, ticket_id);
  }
}
