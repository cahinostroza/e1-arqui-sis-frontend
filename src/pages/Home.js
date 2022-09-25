import useAuthHook from "../hooks/use-auth.hook";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { EventsService } from "../services/events.service";

export default function Home() {
  const eventsService = new EventsService();
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

  return (
    <>
      {events && <div>{events[0].message}</div>}
    </>
  );
}