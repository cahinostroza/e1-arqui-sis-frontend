import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { useRef } from 'react';
import { Link } from "react-router-dom";

export default function LoginForm({ loginHandler }) {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleClick = (event) => {
    event.preventDefault();
    loginHandler({ username: usernameRef.current.value, password: passwordRef.current.value})
  }
  return (
    <Card sx={{ width: 275, margin: 'auto' }}>
      <CardContent>
        <TextField label="Nombre de usuario" inputRef={usernameRef} />
        <TextField label="Contraseña" type="password" inputRef={passwordRef} />
      </CardContent>
      <CardActions>
        <div style={{ width: '100%'}}>
          <Button onClick={handleClick}>Iniciar sesión</Button>
        </div>
        <Link to='/register'>Registrarse</Link>
      </CardActions>
    </Card>
  );
}