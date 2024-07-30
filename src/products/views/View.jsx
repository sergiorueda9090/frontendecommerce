
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Button, Grid, Typography } from "@mui/material"
import { useDispatch } from 'react-redux';
import { DataTableView } from "./DataTableView";
import { openModalShared } from '../../store/sharedStore/shared';

export const View = () => {

    const dispatch = useDispatch();

  return (
    <Grid container direction="row" justifyContent="space-between" sx={{ mb:1 }} alignItems='center'>

        <Grid item>
            <Typography fontSize={39} fontWeight="light"> </Typography>
        </Grid>

        <Grid item>
            <Button variant="outlined"  color="primary" onClick={ (e) => dispatch(openModalShared()) }>
                <PersonAddAltIcon sx={{ fontSize:30, mr:1 }}/>
                 Products
            </Button>
        </Grid>

        <Grid container sx={{ mt:2, width:"99.99%" }}>
            < DataTableView/>
        </Grid>

    </Grid>
  )
}
