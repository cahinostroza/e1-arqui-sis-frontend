import { useState } from "react";
import ErrorMessage from "../components/error-message";
import LoginForm from "../components/forms/login.component";
import useAuthHook from "../hooks/use-auth.hook";
import { UsersService } from "../services/users.service";

export default function Login() {
  const [userNotFound, setUserNotFound] = useState(false);
  const authHook = useAuthHook();
  const usersService = new UsersService();
  const login = async(userData) => {
    try {
      const user = await usersService.login(userData);
      authHook.handleUserLogin(user);
    } catch (error) {
      if (error.message === 'user not found') {
        setUserNotFound(true);
      }
      console.log(error.message);
    }
  } 
  return (
    <>
      <ErrorMessage show={userNotFound} message={"Usuario no encontrado"}/>
      <LoginForm loginHandler={login}/>
    </>
  );
}