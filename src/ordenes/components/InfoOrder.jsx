import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { Grid, Paper, Typography } from '@mui/material';
import { setFormOrderStates } from "../../store/ordersStateStore/OrdersState";

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'price', headerName: 'Price', width: 130 },
    { field: 'quantity', headerName: 'Quantity', width: 130 },
    { field: 'size', headerName: 'Size', width: 80 },
    { field: 'color', headerName: 'Color', width: 100 },
    { field: 'image', headerName: 'Image', width: 150, renderCell: (params) => (
        <img src={params.value} alt={params.row.name} style={{ width: '100px', height: 'auto' }} />
      ) 
    },
    { field: 'status', headerName: 'Status', width: 100 },
    { field: 'transactions_id', headerName: 'Transaction ID', width: 150 },
  ];
  

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

export const InfoOrder = () => {
    
    const dispatch = useDispatch();

    const [selectedIds, setSelectedIds] = useState([]);

    const handleSelectionChange = async (ids) => {
      
      await setSelectedIds(ids);
      
      await dispatch(setFormOrderStates(ids));

    };

    console.log("selectedIds ",selectedIds);

    const { dataOrderState } = useSelector( state => state.ordersState);
    
    return (
        <Grid item xs={12} md={6}>

          <Paper elevation={3} sx={{ padding: '20px' }}>

              <Typography variant="h6" gutterBottom>
                  Orders
              </Typography>
              
              <DataGrid
                  rows={dataOrderState.data}
                  columns={columns}
                  checkboxSelection
                  onRowSelectionModelChange={(ids) => handleSelectionChange(ids)}
                  pageSizeOptions={[5, 10]}
                  sx={{ border: 0 }}
              />

          </Paper>

        </Grid>
    )

}