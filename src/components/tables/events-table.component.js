import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { EventsService } from "../../services/events.service";
import { useNavigate } from 'react-router-dom';

export default function EventsTable() {
  const columns = [
    { field: 'type', headerName: 'Tipo', width: 70 },
    { field: 'level', headerName: 'Nivel', width: 50 },
    { field: 'lat', headerName: 'Latitud', width: 120 },
    { field: 'lon', headerName: 'Longitud', width: 120 },
    { field: 'location', headerName: 'Ubicación', width: 200 },
    { field: 'message', headerName: 'Mensaje', width: 600 },
    { field: 'complexity', headerName: 'Índice de Complejidad', width: 300 },
  ];

  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const eventsService = new EventsService();
  const navigate = useNavigate();
  
  useEffect(() => {

    let active = true;

    (async () => {
      setLoading(true);
      const newRows = await eventsService.get(page + 1);
      const { pages } = await eventsService.pageCount();

      if (!active) {
        return;
      }

      setRows(newRows);
      setPageCount(pages);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [page]);

  const handleEvent = (
    params
  ) => {
    navigate(`/events/${params.row.id}`);
  };

  return (
    <div style={{ height: 600, width: '90%', margin: '1rem auto' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        onRowClick={handleEvent}
        pageSize={25}
        rowsPerPageOptions={[25]}
        pagination
        rowCount={25 * pageCount}
        paginationMode="server"
        onPageChange={(newPage) => {
          setPage(newPage);
        }}
        loading={loading}
      />
    </div>
  );
}
