import { useEffect }                from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate }              from 'react-router-dom';
import toast, { Toaster }           from 'react-hot-toast';
import { Button }                   from '@mui/material';
import { DataGrid }                 from '@mui/x-data-grid';
import FindInPageIcon               from '@mui/icons-material/FindInPage';
import { ModalBody }                from '../modal/ModalBody';
import { SimpleBackdrop }           from '../../components/Backdrop/BackDrop'; 
import { getAll, getShow }          from '../../store/transactionsStore/transactionsStoreThunks';


export const DataTableView = () => {
    
    const { dataTransactions, pager } = useSelector( state => state.transactions );
    
    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getAll());
    },[])

    const columns = [
        { field: 'id',          headerName: 'ID' },
        { field: 'merchant_id',       headerName: 'Merchant id',        width: 250, editable: true, },
        { field: 'state_pol', headerName: 'State Pol',  width: 250, editable: true, },
        { field: 'payment_method',    headerName: 'Payment Method',     width: 250, editable: true, },
        { field: 'payment_method_type',    headerName: 'Payment Method Type',     width: 250, editable: true, },
        { field: 'value',    headerName: 'Value',     width: 250, editable: true, },
        { field: 'currency',    headerName: 'Currency',     width: 250, editable: true, },
        { field: 'email_buyer',    headerName: 'Email Buyer',     width: 250, editable: true, },
        { field: 'data',    headerName: 'Data',     width: 250, editable: true, },
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
                  startIcon={<FindInPageIcon />}
                  onClick={() => handleEditClick(params.row.id)}
                >
                  Show
                </Button>
              </>
            ),
          },
      ];
      
      const handleEditClick = async(id) => {
        //await dispatch(getShow(id))
        navigate(`/transactions/page/${id}`);
      };

  return (
    <>
    
       <DataGrid
        sx={{ width: 800, height: 750 }}
        rows={dataTransactions}
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
