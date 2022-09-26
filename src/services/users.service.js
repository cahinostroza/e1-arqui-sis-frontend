import { BaseService } from "./base.service";

export class UsersService extends BaseService {
  constructor() {
    super('users')
  }

  async login(user) {
    return this.request(this.RequestMethod.Post, '/login', user);
  }

  async register(user) {
    return this.request(this.RequestMethod.Post, '/register', user);
  }

  async logout() {
    return this.request(this.RequestMethod.Delete, '/logout');
  }
}