import useAuthHook from "../hooks/use-auth.hook";
const RequestMethod = {
  Get: 'GET',
  Post: 'POST',
  Delete: 'DELETE',
  Put: 'PUT',
}

export class BaseService {
  RequestMethod = RequestMethod;
  authContext = useAuthHook();

  constructor(api, uri = process.env.REACT_APP_API_GATEWAY_URI) {
    this.uri = uri;
    this.api = api;
  }

  async request(method, path, body) {
    const content = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authContext.currentUser?.accessToken}`
      },
      method: method,
    }
    if (body) content['body'] = JSON.stringify(body);
    const response = await fetch(
      `${this.uri}/${this.api}/${path}`,
      content
    )
    const resJson = await response.json()
    if (!response.ok) {
      let message;
      if (resJson.message) {
        if (resJson.message === 'The incoming token has expired') this.authContext.handleUserLogout();
        message = resJson.message;
      } 
      throw new Error(message)
    }
    return resJson
  }
}