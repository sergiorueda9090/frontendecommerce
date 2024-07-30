
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Button, Grid, Typography } from "@mui/material"
import { useDispatch } from 'react-redux';
import { CategoriesDataTableView } from "./CategoriesDataTableView";
import { openModalShared } from '../../store/sharedStore/shared';

export const CategoriesView = () => {

    const dispatch = useDispatch();

  return (
    <Grid container direction="row" justifyContent="space-between" sx={{ mb:1 }} alignItems='center'>

        <Grid item>
            <Typography fontSize={39} fontWeight="light"> </Typography>
        </Grid>

        <Grid item>
            <Button color="primary" variant="outlined" onClick={ (e) => dispatch(openModalShared()) }>
                <PersonAddAltIcon sx={{ fontSize:30, mr:1 }}/>
                 Crear Category
            </Button>
        </Grid>

        <Grid container sx={{ mt:2, width:"99.99%" }}>
            < CategoriesDataTableView/>
        </Grid>

    </Grid>
  )
}
