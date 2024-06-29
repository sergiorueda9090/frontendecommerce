import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { useDispatch, useSelector } from 'react-redux';
import { ModalHeader } from './ModalHeader';
import { closeModalShared } from '../../store/sharedStore/shared';
import { setClearCategory } from '../../store/categoriesStore/Categories';
import { DialogContent, DialogContentText, Grid, TextField } from '@mui/material';
import { editCategory, createCategory } from '../../store/categoriesStore/categoriesThunks';
import useToastEdit  from '../../components/alerts/useToastEdit';
import useFormValidation from '../../hooks/useFormValidation';
import ImageUpload from '../components/ImageUpload ';
import { TagsInput } from "react-tag-input-component";
import toast from 'react-hot-toast';

export const ModalBody = () => {

  const requestConfirmation = useToastEdit();

  const dispatch = useDispatch();
  
  const { openModalStore }  = useSelector( state => state.shared );
  const { dataCategory }    = useSelector( state => state.categories );
  const [selected, setSelected] = useState([]);

  const [formData, setFormData] = useState({"id":"", "id_user": "", "name": "", "slug": "",
                                            "description":"", "keywords": [], "icon": "", "image": ""});
  
  useEffect(() => {

    setFormData(dataCategory.data);

    setSelected(dataCategory.data.keywords)
 
    
  },[dataCategory.data]);

  const validationRules = {
    name:         { required: true },
    description:  { required: true },
    image:        { required: true, type: 'file' },
  }

  const { errors, validate } = useFormValidation(formData, validationRules);

  function createSlug(text) {
    return text
      .toLowerCase()       // Convierte todo a minúsculas
      .trim()              // Elimina espacios en blanco al principio y al final
      .replace(/ /g, '-')  // Reemplaza los espacios por guiones
      .replace(/[^\w-]+/g, ''); // Elimina cualquier carácter que no sea una letra, número, guión o subrayado
  }
  
  const handleChangeForm = (e) => {

      if(e.target.name === "name"){
      
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
          ["slug"]: createSlug(e.target.value),
        });
      
      }else{

        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      
      }

    
  }
  
  const handleImageUpdate = (imageData) => {

    setFormData((prevData) => ({
      ...prevData,
      ["image"]: imageData
    }));
  
  };


  
  const handleEdit = async (e) => {

    e.preventDefault();    
    
    const isConfirmed = await requestConfirmation();

    if (isConfirmed) {
      
      if (validate()) {

      const updatedFormData = {
          ...formData,
          keywords: selected.join(',')
      };

        await dispatch(closeModalShared());
        await dispatch(editCategory(updatedFormData));

      }else{

      const errorMessages = Object.values(errors).join('\n');
      toast.error(errorMessages);

      }
    
    }

  }

  const handlecreate = async (e) => {

    e.preventDefault();

    if (validate()) {

      formData.keywords = selected.join(',')
      
      await dispatch(closeModalShared());
      await dispatch(createCategory(formData));

    }else{

      const errorMessages = Object.values(errors).join('\n');
      toast.error(errorMessages);

    }

  }

  const handleClose = async () => {
    dispatch(closeModalShared());
    dispatch(setClearCategory());
  };


  return (
    <>
      
      <Dialog
        open={openModalStore}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth={"lg"}
      >
        
        <ModalHeader title={formData.id != "" ? "Editar Category": "Crear Category"}/>

        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>


          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                  id="name"
                  label="Nombre"
                  name="name"
                  type="name"
                  variant="standard"
                  required
                  fullWidth
                  value={formData.name}
                  onChange={(e) => handleChangeForm(e)}
                />
            </Grid>

            <Grid item xs={6}>
              
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
                  value={formData.slug}
                  onChange={(e) => handleChangeForm(e)}
                />

            </Grid>

            <Grid item xs={6}>
              
              <TextField
                  id="description"
                  label="Description"
                  name="description"
                  type="text"
                  variant="standard"
                  required
                  fullWidth
                  value={formData.description}
                  onChange={(e) => handleChangeForm(e)}
                />

            </Grid>

            
            <Grid item xs={6}>
              <TagsInput
                value={selected}
                onChange={setSelected}
                name="keywords"
                placeHolder="Enter keywords"
                required
                fullWidth
              />
              <em>press enter or comma to add new tag</em>
            </Grid>

              <Grid item xs={4}>

                  {
                    formData.image != "" ? 
                    <ImageUpload onImageUpdate={handleImageUpdate} image={"http://ecommerce/public/"+formData.image}/> 
                    : 
                    <ImageUpload onImageUpdate={handleImageUpdate} image=""/>
                  }
  

              </Grid>

          </Grid>
          
          
        
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>

          { formData.id != "" ? (<Button onClick={(e) => handleEdit(e)}>Editar</Button>) : <Button onClick={(e) => handlecreate(e)}>Crear</Button>  }
          
        </DialogActions>
      </Dialog>
    </>
  );
}