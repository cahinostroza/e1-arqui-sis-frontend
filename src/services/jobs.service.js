import { BaseService } from "./base.service";

export class JobsService extends BaseService {
  constructor(){
    super('workers');
  }

  async heartbeat() {
    return this.request(this.RequestMethod.Get, 'heartbeat');
  }

  async postJob(id, mail="") {
    return this.request(this.RequestMethod.Post, 'job', {mail, id});
  }
}