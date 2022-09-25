import RegisterForm from "../components/forms/register.component";
import useAuthHook from "../hooks/use-auth.hook";
import { UsersService } from "../services/users.service";

export default function Register() {
  const authHook = useAuthHook();
  const usersService = new UsersService();
  const register = async(userData) => {
    try {
      const user = await usersService.register(userData);
      console.log(user);
      authHook.handleUserLogin(user);
    } catch (error) {
      console.log(error.message);
    }
  } 
  return (
    <RegisterForm registerHandler={register}/>
  );
}