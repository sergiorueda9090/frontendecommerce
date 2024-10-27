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
import global                       from '../../constants/constants';

export const DataTableView = () => {
    
  const requestConfirmation = useToastDelete();

    const { dataGenders, pager } = useSelector( state => state.gender );
    
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getAll());
    },[])


    const columns = [
        { field: 'id',          headerName: 'ID' },
        { field: 'name',        headerName: 'Name',         width: 250, editable: true, },
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
        rows={dataGenders}
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
