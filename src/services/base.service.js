const RequestMethod = {
  Get: 'GET',
  Post: 'POST',
  Delete: 'DELETE',
  Put: 'PUT',
}

export class BaseService {
  RequestMethod = RequestMethod;

  constructor(api) {
    this.api = api;
  }

  async request(method, path, body) {
    const content = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: method,
      credentials: 'include'
    }
    if (body) content['body'] = JSON.stringify(body);
    const response = await fetch(
      `http://localhost:9000/${this.api}${path}`,
      content
    )
    const resJson = await response.json()
    if (!response.ok) {
      let message;
      if (resJson.message) message = resJson.message;
      throw new Error(message)
    }
    return resJson
  }
}