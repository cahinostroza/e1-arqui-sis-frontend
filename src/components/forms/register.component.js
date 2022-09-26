import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { useRef } from 'react';
import { Link } from "react-router-dom";

export default function RegisterForm({ registerHandler }) {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const contactRef = useRef(null);
  const passwordRef = useRef(null);

  const handleClick = (event) => {
    event.preventDefault();
    registerHandler({
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      contact: contactRef.current.value,
    })
  }
  return (
    <Card sx={{ width: 275, margin: 'auto' }}>
      <CardContent>
        <TextField label="Nombre de usuario" inputRef={usernameRef} />
        <TextField label="Correo" inputRef={emailRef} />
        <TextField label="Contraseña" type="password" inputRef={passwordRef} />
        <TextField label="Información de contecto" inputRef={contactRef} />
      </CardContent>
      <CardActions>
      <div style={{ width: '100%'}}>
          <Button onClick={handleClick}>Registrarse</Button>
        </div>
        <Link to='/login'>Iniciar sesión</Link>
      </CardActions>
    </Card>
  );
}