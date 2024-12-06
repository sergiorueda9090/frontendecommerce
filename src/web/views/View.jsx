
import PersonAddAltIcon              from '@mui/icons-material/PersonAddAlt';
import { useDispatch }               from 'react-redux';
import { Button, Grid, Typography }  from "@mui/material"
import { WebHome } from './WebHome';
import { useNavigate }               from 'react-router-dom';
import { openModalShared }           from '../../store/sharedStore/shared';


export const View = () => {

 const dispatch = useDispatch();

 const navigate = useNavigate();

 const handleCreate = async(id) => {
    navigate(`/products/createproduct`);
  };

  return (
    <Grid container direction="row" justifyContent="space-between" sx={{ mb:1 }} alignItems='center'>
        <Grid container>
            < WebHome/>
        </Grid>
    </Grid>
  )
}
