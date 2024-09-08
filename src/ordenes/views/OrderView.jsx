import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Toaster } from 'react-hot-toast';
import { InfoCustomerOrder } from '../components/InfoCustomerOrder';
import { InfoOrderStatus } from '../components/InfoOrderStatus';
import { InfoTransaction } from '../components/InfoTransaction';
import { InfoOrder } from '../components/InfoOrder';


export const OrderView = () => {
    return (
        <Grid container spacing={2}>

            {/*GRID INFO USER */}
              <InfoCustomerOrder />
            {/*END GRID INFO USER */}

            {/* GRIND ORDER STATUS CHANGE */}
            <InfoOrderStatus />
            {/* GRIND ORDER STATUS CHANGE */}

            {/* INFO TRANSACTION */}
            <InfoTransaction />
            {/*END INFO TRANSACTION */}
                        
            {/* INFO ORDER */}           
            <InfoOrder />
            {/*END INFO ORDER */}

            <Toaster />
      </Grid>

      
        );
 

}