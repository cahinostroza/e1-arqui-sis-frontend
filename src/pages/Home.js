import Button from '@mui/material/Button';
import useAuthHook from "../hooks/use-auth.hook";
import { useState, useEffect } from "react";
import EventsTable from "../components/tables/events-table.component";
import { JobsService } from '../services/jobs.service';

export default function Home() {
  const jobsService = new JobsService();
  const [jobsServiceStatus, setJobsServiceStatus] = useState();
  const authContext = useAuthHook();
  useEffect(() => {
    const heartbeat = async() => {
      try {
        await jobsService.heartbeat();
        setJobsServiceStatus(true);
      } catch (error) {
        console.log(error);
        setJobsServiceStatus(false);
      }
    }
    if (!authContext.currentUser && process.env.REACT_APP_USE_COGNITO) {
      const accessToken = window.location.href.split("id_token=")[1]?.split('&')[0]
      if (accessToken) authContext.handleUserLogin(accessToken);
      else window.location.replace(`${process.env.REACT_APP_COGNITO_URI}${process.env.REACT_APP_FRONTEND_URI}`);
    } else {
      heartbeat();
    }
  });

  const logout = async () => {
    try {
      authContext.handleUserLogout();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {
        process.env.REACT_APP_USE_COGNITO &&
        <div style={{ textAlign: 'right'}}>
          <Button onClick={logout} size="small">Cerrar sesión</Button>
        </div>
      }
      
      <div style={{ textAlign: 'center'}}>
        {`Servicio de cálculo de índice de complejidad ${jobsServiceStatus ? '': 'no'} disponible`}
      </div>
      {
        (!process.env.REACT_APP_USE_COGNITO || authContext.currentUser) && <EventsTable/>
      }
    </>
  );
}