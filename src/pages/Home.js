import Button from '@mui/material/Button';
import useAuthHook from "../hooks/use-auth.hook";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { EventsService } from "../services/events.service";
import EventsTable from "../components/tables/events-table.component";
import { UsersService } from '../services/users.service';

export default function Home() {
  const eventsService = new EventsService();
  const usersService = new UsersService();
  const [events, setEvents] = useState();
  const authContext = useAuthHook();
  const navigate = useNavigate();
  useEffect(() => {
    const loadEvents = async() => {
      try {
        const response = await eventsService.get();
        setEvents(response);
      } catch (error) {
        if (error.message === 'user unauthorized') navigate('/login');
        console.log(error);
      }
    }
    if (!authContext.currentUser) {
      navigate('/login');
    } else {
      if (!events) loadEvents();
    }
  });

  const logout = async () => {
    try {
      await usersService.logout();
      authContext.handleUserLogout();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div style={{ textAlign: 'right'}}>
        <Button onClick={logout} size="small">Cerrar sesión</Button>
      </div>
      {events && <EventsTable events={events}/>}
    </>
  );
}