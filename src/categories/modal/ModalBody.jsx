import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { ModalHeader } from './ModalHeader';
import { closeModalShared } from '../../store/sharedStore/shared';
import { setClearCategory } from '../../store/categoriesStore/Categories';
import { Box, DialogContent, DialogContentText, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { editCategory, createCategory, getDeleteImageBanner } from '../../store/categoriesStore/categoriesThunks';
import useToastEdit  from '../../components/alerts/useToastEdit';
import useFormValidation from '../../hooks/useFormValidation';
import ImageUpload from '../components/ImageUpload ';
import useToastDelete from '../../components/alerts/useToastDelete';
import { TagsInput } from "react-tag-input-component";
import toast from 'react-hot-toast';
import { URL as urlGlobal } from '../../api/authApi'; 

import { ImagesBanner } from '../components/ImagesBanner';
const txtMessage = "Al eliminar esta imagen, se eliminará de forma permanente y no podrá ser recuperada.";
export const ModalBody = () => {
  const requestConfirmationDelete = useToastDelete(txtMessage);
  const requestConfirmation = useToastEdit();

  const dispatch = useDispatch();
  
  const { openModalStore }  = useSelector( state => state.shared);
  const { dataCategory }    = useSelector( state => state.categories);

  const [selected, setSelected] = useState([]);
  const [formData, setFormData] = useState(dataCategory.data);
  
  console.log("formData ",formData);

  {/* These useState is used to save the banner images */}
  const [images, setImages]               = useState([]);
  const [imagesStorage, setImagesStorage] = useState([]);
  

  useEffect(() => {
    setFormData(dataCategory.data);
    setSelected(dataCategory.data.keywords)
    setImages([]);
    setImagesStorage([]);
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
          keywords: selected.join(','),
          imageBanner: images
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
      formData.imageBanner = images;

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


  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const handleDeleteImage = async (idImageBanner) => {

    let isConfirmed = await requestConfirmationDelete();
    
    if(isConfirmed){
     
      await dispatch(getDeleteImageBanner(idImageBanner))
      
      await setFormData({
        ...formData,
        ['imageBanner']: formData.imageBanner.filter((banner) => banner.id != idImageBanner),
      });

    }
    
  }

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
                    typeof formData.image === "string" && formData.image != "" ? 
                    
                    <ImageUpload onImageUpdate={handleImageUpdate} image={"http://ecommerce/"+formData.image}/> 
                
                    : 
                
                    <ImageUpload onImageUpdate={handleImageUpdate} image=""/>
                  
                  }
  

              </Grid>


              <Grid container spacing={2}>

                {/* Start Component ImageBanner */}
                <ImagesBanner setImages={setImages} setImagesStorage={setImagesStorage}/>
                {/* End Component ImageBanner */}

                <Grid item xs={8} sx={{ mt: 2, mb: 2 }}>
                  <Grid container spacing={2}>
                      {images.map((src, index) => (
                          <Grid item xs={12} sm={3} md={3} key={index} sx={{ position: 'relative' }}>
                              <Box
                                  component="img"
                                  src={src.preview}
                                  alt={`Image ${index + 1}`}
                                  sx={{
                                      width: '200px',
                                      height: 'auto',
                                      borderRadius: 2,
                                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                      cursor: 'grab', // Cursor para indicar que se puede arrastrar
                                  }}
                              />
                              {/* Nombre de la imagen debajo */}
                              <Typography variant="caption" display="block" sx={{ mt: -1, width: '100%', textAlign: 'center' }}>
                                {src.name}
                              </Typography>

                              <Tooltip title="Eliminar Imagen">
                                  <IconButton
                                      aria-label="delete"
                                      onClick={() => handleRemoveImage(index)}
                                      sx={{
                                          position: 'absolute',
                                          top: 5,
                                          right: 5,
                                          color: '#de1304',
                                          backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                          '&:hover': {
                                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                          },
                                      }}
                                  >
                                      <DeleteIcon />
                                  </IconButton>
                              </Tooltip>
                          </Grid>
                      ))}
                  </Grid>

                  {
                    formData.imageBanner.length > 0 ?
                
                    <Grid container spacing={2}>

                    { formData.imageBanner.map((src, index) => (
                        <Grid item xs={12} sm={3} md={3} key={index} sx={{ position: 'relative' }}>
                            <Box
                                component="img"
                                src={`${urlGlobal}`+src.image}
                                alt={`Image ${index + 1}`}
                                sx={{
                                    width: '200px',
                                    height: 'auto',
                                    borderRadius: 2,
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                    cursor: 'grab', // Cursor para indicar que se puede arrastrar
                                }}
                            />

                            <Tooltip title="Eliminar Imagen">
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => handleDeleteImage(src.id)}
                                    sx={{
                                        position: 'absolute',
                                        top: 5,
                                        right: 5,
                                        color: '#de1304',
                                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        },
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    ))}
                </Grid>:""
                  }


                  
                </Grid>

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