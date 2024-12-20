import { useEffect }                from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast, { Toaster }           from 'react-hot-toast';
import { Button }                   from '@mui/material';
import { DataGrid }                 from '@mui/x-data-grid';
import EditIcon                     from '@mui/icons-material/Edit';
import DeleteIcon                   from '@mui/icons-material/Delete';
import { ModalBody }                from '../modal/ModalBody';
import { SimpleBackdrop }           from '../../components/Backdrop/BackDrop'; 
import useToastDelete               from '../../components/alerts/useToastDelete';
import {  getAll, getGender, getDelete} from '../../store/gendersStore/GenderThunks';
import { openModalShared }          from '../../store/sharedStore/shared';

const data = [
  {
    id: 1,
    name: "Bienvenida",
    category: "General",
    language: "Español",
    status: "Aprobado",
    sendMessage: 150,
    openMessage: 120,
  },
  {
    id: 2,
    name: "Recordatorio de Cita",
    category: "Citas",
    language: "Inglés",
    status: "Pendiente",
    sendMessage: 90,
    openMessage: 70,
  },
  {
    id: 3,
    name: "Promoción Mensual",
    category: "Marketing",
    language: "Portugués",
    status: "Aprobado",
    sendMessage: 200,
    openMessage: 150,
  },
  {
    id: 4,
    name: "Despedida",
    category: "General",
    language: "Español",
    status: "Rechazado",
    sendMessage: 60,
    openMessage: 20,
  },
  {
    id: 5,
    name: "Encuesta de Satisfacción",
    category: "Encuestas",
    language: "Francés",
    status: "Aprobado",
    sendMessage: 80,
    openMessage: 50,
  },
  {
    id: 6,
    name: "Actualización de Servicio",
    category: "Informativo",
    language: "Español",
    status: "Pendiente",
    sendMessage: 130,
    openMessage: 90,
  },
  {
    id: 7,
    name: "Aviso de Pago",
    category: "Finanzas",
    language: "Inglés",
    status: "Aprobado",
    sendMessage: 250,
    openMessage: 200,
  },
  {
    id: 8,
    name: "Reactivación de Cuenta",
    category: "General",
    language: "Español",
    status: "Aprobado",
    sendMessage: 170,
    openMessage: 150,
  },
  {
    id: 9,
    name: "Invitación a Webinar",
    category: "Eventos",
    language: "Inglés",
    status: "Pendiente",
    sendMessage: 100,
    openMessage: 80,
  },
  {
    id: 10,
    name: "Notificación de Compra",
    category: "Informativo",
    language: "Español",
    status: "Aprobado",
    sendMessage: 300,
    openMessage: 270,
  },
];

export const DataTableView = () => {
    
  const requestConfirmation = useToastDelete();

    const { dataGenders, pager } = useSelector( state => state.gender );
    
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getAll());
    },[])


    const columns = [
        { field: 'id',          headerName: 'ID' },
        { field: 'name',        headerName: 'Nombre Plantilla',         width: 250, editable: true, },
        { field: 'category',  headerName: 'Categoia', width: 250, editable: true, },
        { field: 'language',  headerName: 'Idioma', width: 250, editable: true, },
        { field: 'status',  headerName: 'Estado', width: 250, editable: true, },
        { field: 'sendMessage',  headerName: 'Mensajes Enviados', width: 250, editable: true, },
        { field: 'openMessage',  headerName: 'Mensajes Abiertos', width: 250, editable: true, },
      ];
      
    
      const handleEditClick = async(id) => {
        await dispatch(getGender(id));
        await dispatch(openModalShared());
      };
      
      const handleDeleteClick = async(id) => {

        const isConfirmed = await requestConfirmation();

        if(isConfirmed){
          await dispatch(getDelete(id));
        }

      };

  return (
    <>
    
       <DataGrid
        sx={{ width: 800, height: 750 }}
        rows={data}
        columns={columns}
        pagination
        paginationMode="server"
        rowCount={pager.totalItems}
        pageSize={pager.pageSize}
        page={pager.currentPage}
        pageSizeOptions={[5, 10, 20, 30, 50, 80, 100, 150, 500]}
      />

      <ModalBody/>
      <SimpleBackdrop/>
      <Toaster />

    </>
  )
}
