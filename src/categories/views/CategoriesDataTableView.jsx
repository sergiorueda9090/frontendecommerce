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
import { getCategories, getCategory, getDelete } from '../../store/categoriesStore/categoriesThunks';
import { openModalShared }          from '../../store/sharedStore/shared';

export const CategoriesDataTableView = () => {
    
  const requestConfirmation = useToastDelete();

    const { dataCategories } = useSelector( state => state.categories );
    
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getCategories());
    },[])


    const columns = [
        { field: 'id',          headerName: 'ID' },
        { field: 'id_user',     headerName: 'ID User' },
        { field: 'name',        headerName: 'Name',         width: 250, editable: true, },
        { field: 'slug',        headerName: 'Slug',         width: 250, editable: true, },
        { field: 'description', headerName: 'description',  width: 250, editable: true, },
        { field: 'keywords',    headerName: 'keywords',     width: 250, editable: true, },
        { field: 'icon',        headerName: 'Icon',         width: 250, editable: true, },
        {
          field: 'image',
          headerName: 'Image',
          width: 250,
          editable: true,
          renderCell: (params) => (
            <img
              src={'http://ecommerce/public/'+params.value}
              alt="Category"
              style={{ width: 50, height: 50, objectFit: 'cover' }}
            />
          ),
        },
        { field: 'created_at',  headerName: 'Fecha Creacion', width: 250, editable: true, },
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
        await dispatch(getCategory(id));
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
        sx={{ minWidth: 800 }}
        rows={dataCategories}
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
