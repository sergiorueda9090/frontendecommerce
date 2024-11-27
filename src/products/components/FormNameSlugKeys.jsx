import { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import { Grid, TextField, Button } from '@mui/material';
import { setFormDataProduct } from '../../store/productsStore/Products';

import { useDispatch, useSelector } from 'react-redux';

export const FormNameSlugKeys = () => {
    
    const dispatch = useDispatch();

    const { dataProduc } = useSelector(state  => state.products);
    const [selected, setSelected] = useState(dataProduc.data.keywords);
    
    function createSlug(text) {
        return text
          .toLowerCase()       // Convierte todo a minúsculas
          .trim()              // Elimina espacios en blanco al principio y al final
          .replace(/ /g, '-')  // Reemplaza los espacios por guiones
          .replace(/[^\w-]+/g, ''); // Elimina cualquier carácter que no sea una letra, número, guión o subrayado
    }


    const handleChangeForm = (e) => {
      const { name, value } = e.target;
      dispatch(setFormDataProduct({ name, value, slug: createSlug(e.target.value) }));
    }

    const handelAddTag = (tags) => {
        setSelected(tags)
        dispatch(setFormDataProduct({ keywords: tags }));
    }
  

    return (
        <>
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <TextField
                    id      = "name"
                    label   = "Nombre"
                    name    = "name"
                    type    = "name"
                    variant = "standard"
                    required
                    fullWidth
                    value={dataProduc.data.name}
                    onChange={(e) => handleChangeForm(e)}
                    />
            </Grid>

            <Grid item xs={4}>
                <TextField
                    id="slug"
                    label="Slug"
                    name="slug"
                    type="text"
                    variant="standard"
                    required
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                    value={dataProduc.data.slug}
                    onChange={(e) => handleChangeForm(e)}
                    />
            </Grid>
                
            <Grid item xs={4}>
                <TagsInput
                    value={selected}
                    onChange={handelAddTag}
                    name="keywords"
                    placeHolder="Enter keywords"
                    required
                    fullWidth
                />
                <em>press enter or comma to add new tag</em>
            </Grid>
        </Grid>

        </>
    )

}