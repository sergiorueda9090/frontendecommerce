import {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Grid, Paper, Avatar, Typography} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';


export const InfoCustomerOrder = () => {
    
    const { dataOrderState } = useSelector( state => state.ordersState);
        console.log("InfoCustomerOrder ", dataOrderState)
    return (
        <>
            <Grid item xs={12} md={12}>
                <Paper elevation={3} sx={{ padding: '20px', display: 'flex', alignItems: 'center' }}>
                    <Avatar
                            alt="Sergio Rueda"
                            src="https://mui.com/static/images/avatar/1.jpg"
                            sx={{ width: 56, height: 56, marginRight: '20px' }}
                    />
                    <Grid xs={12} md={4}>
                    <Typography variant="h6" gutterBottom>
                        <PersonIcon style={{ marginRight: 8, color: 'blue' }} />
                       
                        Name: { dataOrderState.customer.data[0].name}
                    </Typography>
                    
                    <Typography variant="body1" gutterBottom>
                        <PersonIcon style={{ marginRight: 8, color: 'purple' }} />
                        Surname: {dataOrderState.customer.data[0].lastname} {dataOrderState.customer.data[0].second_surname}
                    </Typography>
                    
                    <Typography variant="body1" gutterBottom>
                        <EmailIcon style={{ marginRight: 8, color: 'teal' }} />
                        Email: {dataOrderState.customer.data[0].email}
                    </Typography>
                    
                    <Typography variant="body1" gutterBottom>
                        <PhoneIcon style={{ marginRight: 8, color: 'green' }} />
                        Phone: {dataOrderState.customer.data[0].phone}
                    </Typography>
                    
                    <Typography variant="body1" gutterBottom>
                        <HomeIcon style={{ marginRight: 8, color: 'orange' }} />
                        Address: {dataOrderState.customer.data[0].address}
                    </Typography>
                    </Grid>
                </Paper>
            </Grid>
         </>)

}