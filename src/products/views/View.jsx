
import PersonAddAltIcon              from '@mui/icons-material/PersonAddAlt';
import { useDispatch }               from 'react-redux';
import { Button, Grid, Typography }  from "@mui/material"
import { DataTableView }             from "./DataTableView";
import { useNavigate }               from 'react-router-dom';
import { openModalShared }           from '../../store/sharedStore/shared';
import { clearContentProduct } from '../../store/productsStore/ProductsThunks';

export const View = () => {

 const dispatch = useDispatch();

 const navigate = useNavigate();

 const handleCreate = async(id) => {
    
    await dispatch(clearContentProduct());

    navigate(`/products/createproduct`);
  };

  return (
    <Grid container direction="row" justifyContent="space-between" sx={{ mb:1 }} alignItems='center'>

        <Grid item>
            <Typography fontSize={39} fontWeight="light"> </Typography>
        </Grid>

        <Grid item>
            <Button variant="outlined"  color="primary" onClick={ (e) => handleCreate() }>
                <PersonAddAltIcon sx={{ fontSize:30, mr:1 }}/>
                 Products
            </Button>
        </Grid>

        {/*<Grid item>
            <Button color="primary" variant="outlined"  onClick={ (e) => dispatch(openModalShared()) }>
                <PersonAddAltIcon sx={{ fontSize:30, mr:1 }}/>
                Products Modal
            </Button>
        </Grid>*/}

        <Grid container sx={{ mt:2, width:"99.99%" }}>
            < DataTableView/>
        </Grid>

    </Grid>
  )
}
