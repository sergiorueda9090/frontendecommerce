import { useEffect }                from 'react';
import { useNavigate }              from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import toast, { Toaster }           from 'react-hot-toast';
import { Button }                   from '@mui/material';
import FindInPageIcon               from '@mui/icons-material/FindInPage';
import { DataGrid }                 from '@mui/x-data-grid';
import { ModalBody }                from '../modal/ModalBody';
import { SimpleBackdrop }           from '../../components/Backdrop/BackDrop'; 
import useToastDelete               from '../../components/alerts/useToastDelete';
import { getSlider, getDelete }     from '../../store/slidersStore/SlidersThunks';
import { getAll, getOrder}          from '../../store/ordersStore/OrdersThunks';
import { openModalShared }          from '../../store/sharedStore/shared';
import global                       from '../../constants/constants';
import { getShow } from '../../store/ordersStateStore/OrdersStateThunks'; 

export const DataTableView = () => {
    
  const navigate = useNavigate();

  const requestConfirmation = useToastDelete();

    const { dataOrders, pager } = useSelector( state => state.orders );

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getAll());
    },[])


    const columns = [
        { field: 'transactions_id', headerName: 'Transactions' },
        { field: 'name',      headerName: 'Name',     width: 250, editable: true, },
        { field: 'email',     headerName: 'Email',    width: 250, editable: true, },
        { field: 'quantity',  headerName: 'Quantity', width: 250, editable: true, },
        { field: 'price',     headerName: 'Price',    width: 250, editable: true, },
        {
          field: 'image',
          headerName: 'Image',
          width: 250,
          editable: true,
          renderCell: (params) => (
            <img
              src={`${global.url}`+params.value}
              alt="Category"
              style={{ width: 50, height: 50, objectFit: 'cover' }}
            />
          ),
        },
        { field: 'estadoTx',          headerName: 'State Tx',         width: 250, editable: true, },
        { field: 'transactionState',  headerName: 'Transation State', width: 250, editable: true, },
        { field: 'lapPaymentMethod',  headerName: 'Payment Method',   width: 250, editable: true, },
        { field: 'created_at',        headerName: 'Fecha Creacion',   width: 250, editable: true, },
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
                  onClick={() => handleEditClick(params.row.transactions_id)}
                >
                  Show
                </Button>
              </>
            ),
          },
      ];
      
    
      const handleEditClick = async(id) => {
        await dispatch(getShow(id))
        navigate(`/ordenes/page/${id}`);
      };
      
  return (
    <>
    
       <DataGrid
          sx={{ width: 800, height: 750 }}
          rows={dataOrders}
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
