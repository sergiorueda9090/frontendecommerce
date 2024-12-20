import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Button, Grid, Typography } from "@mui/material"
import { DataTableView } from "./DataTableView"
import { NavFilter } from '../components/NavFilter';

export const ViewManageTemplate = () => {

    return (
        <Grid container direction="row" justifyContent="space-between" sx={{ mb:1 }} alignItems='center'>
    
            <Grid item>
                <Typography fontSize={39} fontWeight="light"> </Typography>
            </Grid>


            <NavFilter />
    
            <Grid container sx={{ mt:2, width:"99.99%" }}>
                < DataTableView/>
            </Grid>
    
        </Grid>
      )

}