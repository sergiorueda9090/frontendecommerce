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
import { getAll, getSubCategory, getDelete } from '../../store/subcategoriesStore/SubCategoriesThunks';
import { openModalShared }          from '../../store/sharedStore/shared';

export const DataTableView = () => {
    
  const requestConfirmation = useToastDelete();

    const { dataSubCategories, pager } = useSelector( state => state.subcategories );
    

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getAll());
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
        await dispatch(getSubCategory(id));
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
        rows={dataSubCategories}
        columns={columns}
        pagination
        paginationMode="server"
        rowCount={pager.totalItems}
        pageSize={pager.pageSize}
        page={pager.currentPage}
        /*loading={loading}
        onPageChange={(newPage) => setCurrentPage(newPage)}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}*/
        pageSizeOptions={[5, 10, 20, 30, 50, 80, 100, 150, 500]}
      />

      <ModalBody/>
      <SimpleBackdrop/>
      <Toaster />

    </>
  )
}
