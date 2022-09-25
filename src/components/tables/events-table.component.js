import { DataGrid } from '@mui/x-data-grid';

export default function EventsTable({ events }) {
  const columns = [
    { field: 'type', headerName: 'Tipo', width: 70 },
    { field: 'level', headerName: 'Nivel', width: 50 },
    { field: 'lat', headerName: 'Latitud', width: 120 },
    { field: 'lon', headerName: 'Longitud', width: 120 },
    { field: 'location', headerName: 'Ubicación', width: 200 },
    { field: 'message', headerName: 'Mensaje', width: 600 },
  ];
  return (
    <div style={{ height: 500, width: '90%', margin: 'auto' }}>
      <h1> Eventos </h1>
      <DataGrid
        rows={events}
        columns={columns}
        pageSize={25}
        rowsPerPageOptions={[25]}
      />
    </div>
  );
}