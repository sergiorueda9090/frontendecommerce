import { useEffect, useState }                from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast, { Toaster }           from 'react-hot-toast';
import { Button }                   from '@mui/material';
import { DataGrid }                 from '@mui/x-data-grid';
import EditIcon                     from '@mui/icons-material/Edit';
import DeleteIcon                   from '@mui/icons-material/Delete';
import { ModalBody }                from '../modal/ModalBody';
import { SimpleBackdrop }           from '../../components/Backdrop/BackDrop'; 
import useToastDelete               from '../../components/alerts/useToastDelete';
import { getProduct, getDelete }    from '../../store/productsStore/ProductsThunks'; 
import { getAll,clearContentProduct } from '../../store/productsStore/ProductsThunks';
import { openModalShared }          from '../../store/sharedStore/shared';

import { useNavigate }              from 'react-router-dom';

export const DataTableView = () => {
    
    const navigate = useNavigate();

    const requestConfirmation = useToastDelete();
    
    const { dataProducts, pager }       = useSelector( state =>   state.products)

    const [page,      setPage]     = useState(1);  //CURRENT PAGE
    const [pageSize,  setPageSize] = useState(1000); //TOTAL RECORD THAT SHOW
    const [rowCount,  setRowCount] = useState(0);  //TOTAL RECORDS
    const [loading,  setLoading] = useState(false);

    useEffect(() => {
      fetchData(page, pageSize);
    }, [page, pageSize]);


    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(clearContentProduct());
      dispatch(getAll());
    },[])

    const fetchData = async (page, pageSize) => {
      setLoading(true);
      try {
        const response = await fetch(`your-api-endpoint?page=${page + 1}&pageSize=${pageSize}`);
        const data = await response.json();
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    const handlePageChange = (newPage) => {
      setPage(newPage);
    };
  
    const handlePageSizeChange = (newPageSize) => {
      setPageSize(newPageSize);
    };


    const columns = [
        { field: 'id',                headerName: 'ID' },
        { field: 'id_subcategories',  headerName: 'ID Sub Category' },
        { field: 'id_user',           headerName: 'ID User' },
        { field: 'name',              headerName: 'Name',             width: 250, editable: true, },
        { field: 'slug',              headerName: 'Slug',             width: 250, editable: true, },
        { field: 'description',       headerName: 'description',      width: 250, editable: true, },
        { field: 'details',           headerName: 'Details',          width: 250, editable: true, },
        { field: 'specifications',    headerName: 'Specifications',   width: 250, editable: true, },
        { field: 'keywords',          headerName: 'keywords',         width: 250, editable: true, },
        { field: 'purchase_price',    headerName: 'Purchase Price',   width: 250, editable: true, },
        { field: 'percentage_profit', headerName: 'Percentage Profit',width: 250, editable: true, },
        { field: 'sale_price',        headerName: 'Sale Price',       width: 250, editable: true, },
        { field: 'discount',          headerName: 'Discount',         width: 250, editable: true, },
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

        await dispatch(getProduct(id));

        //await dispatch(openModalShared());

        navigate(`/products/showproduct/${id}`);

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
        sx={{ width: 800, height: 750 }}
        rows={dataProducts}
        columns={columns}
        pagination
        paginationMode="server"
        rowCount={pager.totalItems}
        pageSize={pageSize}
        page={page}
        loading={loading}
        onPageChange={(params) => handlePageChange(params.page)}
        onPageSizeChange={(params) => handlePageSizeChange(params.pageSize)}
        pageSizeOptions={[5, 10, 20, 30, 50, 80, 100, 150, 500, pager.totalItems]}
      />

      <ModalBody/>

      
      <SimpleBackdrop/>
      
      <Toaster />

    </>
  )
}
