import { BaseService } from "./base.service";

export class EventsService extends BaseService {
  constructor() {
    super('events');
  }

  async get(page=1) {
    return this.request(this.RequestMethod.Get, `?page=${page}`);
  }

  async getById(id) {
    return this.request(this.RequestMethod.Get, `${id}`);
  }

  async pageCount() {
    return this.request(this.RequestMethod.Get, `pages`);
  }
}