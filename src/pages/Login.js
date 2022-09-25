import { UsersService } from "../services/users.service";

export default function Login() {
  const usersService = new UsersService();
  const login = async() => {
    try {
      const user = await usersService.login({ username: 'cahinostroza', password: 'cristian1999'});
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  } 
  return (
    <button onClick={login}>Login</button>
  );
}