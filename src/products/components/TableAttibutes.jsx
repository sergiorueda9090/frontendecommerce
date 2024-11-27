import { DataGrid }     from '@mui/x-data-grid';
import { Grid,  Button} from '@mui/material';
import DeleteIcon       from '@mui/icons-material/Delete';
import EditIcon                     from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { setRemoveAttributeArray } from '../../store/productsStore/Products';

export const TableAttributes = () => {
  
  const dispatch = useDispatch();

  const { dataProduc } = useSelector(state  => state.products);
  
  const rows = dataProduc.data.arrayAttributes.map((item) => ({
    id:         item.id_color ? item.id_color : item.id,
    attribute:  item.attribute,
    value:      item.value,
    color:      item.color,
    cantidad:   item.cantidad,
    images:     item.images.map(image => image.name.split('/').pop()) // Obtén solo el nombre del archivo
                                                              .join(', '), // Une los nombres con una coma
  }));

    const columns = [
        { field: 'id',          headerName: 'Id',        minWidth: 50,  flex: 1, editable: false, },
        { field: 'attribute',   headerName: 'Atributo',  minWidth: 100, flex: 1, editable: true, },
        { field: 'value',       headerName: 'Value',     minWidth: 150, flex: 1, editable: true, },
        { field: 'color',       headerName: 'Color',     minWidth: 150, flex: 1, editable: false, },
        { field: 'cantidad',    headerName: 'Cantidad',  minWidth: 200, flex: 2, editable: true, },
        { field: 'images',      headerName: 'Imagenes',  minWidth: 500, flex: 2 },
        {
          field: 'actions',
          headerName: 'Actions',
          minWidth: 250,
          renderCell: (params) => (
            <>
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
              {
                dataProduc.data.id !== "" ? 
                  <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={() => handleDeleteClick(params.row.id)}
                  style={{ marginLeft: 8 }}
                >
                  Edit
                </Button>  :""
              }
            </>
          ),
        },
      ];

      const handleDeleteClick = (id) => {
        let newRowsTable = dataProduc.data.arrayAttributes.filter( (row) => {return row.id !== id});
        dispatch(setRemoveAttributeArray(newRowsTable));
      }

      const handleProcessRowUpdate = (newRow) => {
        const updatedRows = rows.map((row) =>
          row.id === newRow.id ? { ...row, ...newRow } : row
        );
    
        // Dispatch the update to the store (update state logic here)
        console.log('Updated Rows:', updatedRows); // Debugging purpose
        // Example:
        // dispatch(updateRows(updatedRows));
        return newRow;
      };
    
      return (
        <Grid item xs={12}>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 12 },
              },
            }}    
            pageSizeOptions={[5, 10]}  
            processRowUpdate={handleProcessRowUpdate} // Handle updates
            experimentalFeatures={{ newEditingApi: true }} // Required for editing
          />
        </div>
      </Grid>
      )

}