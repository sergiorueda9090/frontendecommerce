import { useEffect }                from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast, { Toaster }           from 'react-hot-toast';
import { Button }                   from '@mui/material';
import { DataGrid }                 from '@mui/x-data-grid';
import EditIcon                     from '@mui/icons-material/Edit';
import DeleteIcon                   from '@mui/icons-material/Delete';
import { ModalBody }                from '../../components/modal/ModalBody';
import { SimpleBackdrop }           from '../../components/Backdrop/BackDrop'; 
import useToastDelete               from '../../components/alerts/useToastDelete';
import { getUser, getUsers, getDelete } from "../../store/usersStore/usersThunks";
import { openModalShared }          from '../../store/sharedStore/shared';

export const UsersDataTableView = () => {
    
  const requestConfirmation = useToastDelete();

    const { dataUsers } = useSelector( state => state.users );
    
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getUsers());
    },[])


    const columns = [
        { field: 'id', headerName: 'ID' },
        {
          field: 'name',
          headerName: 'Name',
          width: 250,
          editable: true,
        },
        {
          field: 'email',
          headerName: 'Email',
          type: 'email',
          width: 250,
          editable: true,
        },
        {
          field: 'password',
          headerName: 'Password',
          type: 'text',
          width: 250,
          editable: true,
        },
        {
          field: 'created_at',
          headerName: 'Fecha Creacion',
          width: 250,
          editable: true,
        },

        {
            field: 'actions',
            headerName: 'Actions',
            width: 250,
            renderCell: (params) => (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={() => handleEditClick(params.row.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteClick(params.row.id)}
                  style={{ marginLeft: 8 }}
                >
                  Delete
                </Button>
              </>
            ),
          },
      ];
      
    
      const handleEditClick = async(id) => {
        await dispatch(getUser(id));
        await dispatch(openModalShared());
      };
      
      const handleDeleteClick = async(id) => {

        const isConfirmed = await requestConfirmation();

        if(isConfirmed){
          dispatch(getDelete(id));
        }

      };

  return (
    <>
    
      <DataGrid
        rows={dataUsers}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        
      />

      <ModalBody/>
      <SimpleBackdrop/>
      <Toaster />

    </>
  )
}
