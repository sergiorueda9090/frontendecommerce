import { useSelector } from 'react-redux';
import { Grid, Paper, Typography, Table, TableContainer, TableBody, TableRow, TableCell } from '@mui/material';

const columns = [
    { name: 'created_at', value: '2024-06-15 14:30:00', description: 'The date and time when the record was created.' },
    { name: 'currency', value: 'USD', description: 'The currency used in the transaction.' },
    { name: 'cus', value: 'CUS123456', description: 'Unique identifier for the customer.' },
    { name: 'deleted_at', value: '2024-06-20 09:00:00', description: 'The date and time when the record was deleted, if applicable.' },
    { name: 'estadoTx', value: 'Completed', description: 'The status of the transaction.' },
    { name: 'extra1', value: 'Additional Info', description: 'Additional field for extra data.' },
    { name: 'lapPaymentMethod', value: 'Credit Card', description: 'Payment method used in the transaction.' },
    { name: 'payu', value: 'PAYU123456', description: 'Reference or identifier for PayU transactions.' },
    { name: 'products', value: 'Product A, Product B', description: 'List of products involved in the transaction.' },
    { name: 'pseBank', value: 'Bank XYZ', description: 'Bank used in the PSE payment.' },
    { name: 'referenceCode', value: 'REF123456', description: 'Reference code for the transaction.' },
    { name: 'reference_pol', value: 'POL123456', description: 'Reference POL for the transaction.' },
    { name: 'transactionId', value: 'TX1234567890', description: 'Unique identifier for the transaction.' },
    { name: 'transactionState', value: 'Success', description: 'Current state of the transaction.' },
    { name: 'TX_VALUE', value: '$100.00', description: 'Value of the transaction.' },
    { name: 'updated_at', value: '2024-06-20 15:00:00', description: 'The date and time when the record was last updated.' }
  ];


export const InfoTransaction = () => {

    const { dataOrderState } = useSelector( state => state.ordersState);
    
    return (

        <Grid item xs={12}  md={6}>
        <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
                Info Transaction
            </Typography>
            <TableContainer component={Paper}>
                <Table aria-label="dynamic database information table">
                    <TableBody>
                        {/* Itera sobre cada fila de 'data' */}
                        {dataOrderState.transaction.data.map((row, rowIndex) => (
                            // Por cada fila de datos, se iteran sus claves y valores
                            Object.entries(row).map(([key, value], cellIndex) => (
                            // Condicional para no mostrar la fila con la clave 'data'
                            key !== 'data' && (
                                <TableRow key={`${rowIndex}-${cellIndex}`}>
                                {/* Muestra la clave */}
                                <TableCell component="th" scope="row" align="left" style={{ fontWeight: 'bold' }}>
                                    {key}
                                </TableCell>
                                {/* Muestra el valor */}
                                <TableCell align="left">{value !== null ? value : 'N/A'}</TableCell>
                                </TableRow>
                            )
                            ))
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    </Grid>

    )

}