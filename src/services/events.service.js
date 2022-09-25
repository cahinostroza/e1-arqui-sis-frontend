import { BaseService } from "./base.service";

export class EventsService extends BaseService {
  constructor() {
    super('events');
  }

  async get() {
    return this.request(this.RequestMethod.Get, '/');
  }
}