import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Toaster } from 'react-hot-toast';

export const TransactionView = () => {
    return (
        <Grid container spacing={2}>

            {/*GRID INFO USER */}
                <h1>TRANSACTION VIEW</h1>
            {/*END GRID INFO USER */}

            {/* GRIND ORDER STATUS CHANGE */}
          
            {/* GRIND ORDER STATUS CHANGE */}

            {/* INFO TRANSACTION */}
        
            {/*END INFO TRANSACTION */}
                        
            {/* INFO ORDER */}           
          
            {/*END INFO ORDER */}

            <Toaster />
      </Grid>

      
        );
 

}