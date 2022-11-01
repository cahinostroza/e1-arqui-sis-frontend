import Button from '@mui/material/Button';
import useAuthHook from "../hooks/use-auth.hook";
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { EventsService } from "../services/events.service";
import { JobsService } from '../services/jobs.service';
import { Container } from '@mui/material';
import ErrorMessage from '../components/error-message';

export default function Event() {
  const { id } = useParams();
  const jobsService = new JobsService();
  const eventsService = new EventsService();
  const [event, setEvent] = useState();
  const jobSuccessMessage = "Índice de complejidad solicitado correctamente"
  const jobErrorMessage = "Ocurrió un error al solicitar el índice de complejidad"
  const [jobMessage, setJobMessage] = useState("");
  const authContext = useAuthHook();
  const navigate = useNavigate();
  useEffect(() => {
    const loadEvent = async() => {
      try {
        const response = await eventsService.getById(id);
        setEvent(response);
      } catch (error) {
        if (error.message === 'user unauthorized' && process.env.REACT_APP_USE_COGNITO) navigate('/login');
        console.log(error);
      }
    }

    if (!authContext.currentUser && process.env.REACT_APP_USE_COGNITO) {
      navigate('/login');
    } else {
      if (!event) loadEvent();
    }
  });

  const requestComplexity = async() => {
    try {
      await jobsService.postJob(id, authContext.currentUser?.email);
      setJobMessage(jobSuccessMessage);
    } catch (error) {
      console.log(error);
      setJobMessage(jobErrorMessage);
    }
  };

  return (
    <>
      <ErrorMessage show={jobMessage.length !== 0} message={jobMessage}/>
      {event && (
        <Container sx={{
          width: 500,
          height: 400,
        }}>
          <h2>{`Nivel: ${event.level}`}</h2>
          <h2>{`Tipo: ${event.type}`}</h2>
          <h3>{`Ubicación: ${event.location}`}</h3>
          <p>{`Longitud: ${event.lon}`}</p>
          <p>{`Latitud: ${event.lat}`}</p>
          <p>{`Mensaje: ${event.message}`}</p>
          <p>{`Índice de complejidad: ${event.complexity == null ?  'No calculado' : event.complexity}`}</p>
          <Button onClick={requestComplexity}>Calcular índice</Button>
        </Container>
      )}
    </>
  );
}