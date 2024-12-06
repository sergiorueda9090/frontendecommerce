
import { Grid, TextField } from '@mui/material';
import { setFormDataProduct } from '../../store/productsStore/Products';

import { useDispatch, useSelector } from 'react-redux';

export const FormAttributes = () => {

  const dispatch = useDispatch();
 
  const { dataProduc, clearProduct} = useSelector(state  => state.products);

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    dispatch(setFormDataProduct({ name, value }));
  }


  return (
    <Grid container spacing={2} sx={{ mt: "25px", mb:"30px" }}>
        <Grid item xs={3}>
            <TextField
                id      = "attribute"
                label   = "attribute"
                name    = "attribute"
                type    = "text"
                variant = "standard"
                required
                fullWidth
                value={dataProduc.data.attribute}
                onChange={(e) => handleChangeForm(e)}
                />
        </Grid>

        <Grid item xs={3}>
            <TextField
                id      = "valueAttribute"
                label   = "valueAttribute"
                name    = "valueAttribute"
                type    = "text"
                variant = "standard"
                required
                fullWidth
                value={dataProduc.data.valueAttribute}
                onChange={(e) => handleChangeForm(e)}
                />
        </Grid>

        <Grid item xs={3}>
            <TextField
                id      = "cantidad"
                label   = "cantidad"
                name    = "cantidad"
                type    = "text"
                variant = "standard"
                required
                fullWidth
                value={dataProduc.data.cantidad}
                onChange={(e) => handleChangeForm(e)}
                />
        </Grid>

        <Grid item xs={3}>
            <TextField
                id      = "color"
                label   = "color"
                name    = "color"
                type    = "color"
                variant = "standard"
                required
                fullWidth
                value={dataProduc.data.color}
                onChange={(e) => handleChangeForm(e)}
                />
        </Grid>
    </Grid>
    )
}