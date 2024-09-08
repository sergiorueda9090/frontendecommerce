
import { Container, Grid, Typography, Card, CardContent, Divider, Box } from '@mui/material';
import { AttachMoney, Email, CreditCard, Event, CheckCircle, AccountBalance, Update } from '@mui/icons-material';
import { Toaster } from 'react-hot-toast';

export const TransactionView = () => {

    const transaction = {
        id: "20",
        merchant_id: "508029",
        state_pol: "4",
        payment_method: "11",
        payment_method_type: "2",
        value: "1200000.00",
        currency: "COP",
        email_buyer: "SERGIO@HOTMAIL.COM",
        date: "2024-08-11 16:51:29",
        data: {
          payment_method_name: "MASTERCARD",
          cc_number: "************0003",
          transaction_id: "62287513-4011-4850-850d-035f7f2ffdbc",
          authorization_code: "RBM987",
          response_message_pol: "APPROVED"
        },
        created_at: "2024-08-11 16:51:29",
        updated_at: "2024-08-11 16:51:29"
      };
    
    return (
        <Container maxWidth="xl" sx={{ marginTop: '20px' }}>
        <Card variant="outlined">
          <CardContent>

            <Typography variant="h4" gutterBottom>
              Transaction Details
            </Typography>
  
            {/* Sección ID */}
            
            <Box sx={{ marginBottom: '10px' }}>

                <Grid container spacing={2}>

                    <Grid item xs={4}>
                        <Typography variant="h6">Transaction ID</Typography>
                        <Typography variant="body1">{transaction.id}</Typography>
                        <Typography variant="caption">Unique identifier for this transaction.</Typography>
                    </Grid>

                    {/* Sección Merchant ID */}
                    <Grid item xs={4}>
                        <Typography variant="h6">Merchant ID</Typography>
                        <Typography variant="body1">{transaction.merchant_id}</Typography>
                        <Typography variant="caption">ID of the merchant handling the transaction.</Typography>
                    </Grid>

                     {/* Sección Estado de la Transacción */}
                    <Grid item xs={4}>
                        <Typography variant="h6">Transaction Status</Typography>
                        <Typography variant="body1">{transaction.state_pol === "4" ? "Approved" : "Pending"}</Typography>
                        <Typography variant="caption">Current state of the transaction.</Typography>
                    </Grid>

                </Grid>

            </Box>

  
            <Divider />
  
           
            <Box sx={{ marginBottom: '10px', marginTop: '10px' }}>
                <Grid container spacing={2}>
                     {/* Método de Pago */}
                    <Grid item xs={4}>
                        <Typography variant="h6">Payment Method</Typography>
                        <Typography variant="body1">{transaction.data.payment_method_name}</Typography>
                        <Typography variant="caption">The method used for payment.</Typography>
                    </Grid>

                    {/* Valor de la Transacción */}
                    <Grid item xs={4}>
                        <Typography variant="h6">Transaction Amount</Typography>
                        <Typography variant="body1">{`${transaction.value} ${transaction.currency}`}</Typography>
                        <Typography variant="caption">Total amount of the transaction.</Typography>
                    </Grid>

                    {/* Número de Tarjeta */}
                    <Grid item xs={4}>
                        <Typography variant="h6">Card Number</Typography>
                        <Typography variant="body1">{transaction.data.cc_number}</Typography>
                        <Typography variant="caption">Last digits of the card used for payment.</Typography>
                    </Grid>
                </Grid>

            </Box>
  
            <Divider />
  

            <Box sx={{ marginBottom: '10px', marginTop: '10px' }}>
                <Grid container spacing={2}>
                    {/* Fecha de la Transacción */}
                    <Grid item xs={4}>
                        <Typography variant="h6">Transaction Date</Typography>
                        <Typography variant="body1">{transaction.date}</Typography>
                        <Typography variant="caption">Date and time when the transaction occurred.</Typography>
                    </Grid>

                    {/* Código de Autorización */}
                    <Grid item xs={4}>
                        <Typography variant="h6">Authorization Code</Typography>
                        <Typography variant="body1">{transaction.data.authorization_code}</Typography>
                        <Typography variant="caption">Authorization code provided by the bank.</Typography>
                    </Grid>

                    {/* Mensaje de Respuesta */}
                    <Grid item xs={4}>
                        <Typography variant="h6">Response Message</Typography>
                        <Typography variant="body1">{transaction.data.response_message_pol}</Typography>
                        <Typography variant="caption">Bank's response to the transaction request.</Typography>
                    </Grid>
                </Grid>
            </Box>
  

            <Divider />
  
            
            <Box sx={{ marginBottom: '10px', marginTop: '10px' }}>
                
                <Grid container spacing={2}>
                    {/* Email del Comprador */}
                    <Grid item xs={4}>
                        <Typography variant="h6">Buyer Email</Typography>
                        <Typography variant="body1">{transaction.email_buyer}</Typography>
                        <Typography variant="caption">Email address of the buyer.</Typography>
                    </Grid>

                    {/* Timestamps */}
                    <Grid item xs={4}>
                        <Typography variant="h6">Created At</Typography>
                        <Typography variant="body1">{transaction.created_at}</Typography>
                    </Grid>

                    <Grid item xs={4}>
                        <Typography variant="h6">Updated At</Typography>
                        <Typography variant="body1">{transaction.updated_at}</Typography>
                    </Grid>

                </Grid>

            </Box>

          </CardContent>
        </Card>
      </Container>

      
        );
 

}