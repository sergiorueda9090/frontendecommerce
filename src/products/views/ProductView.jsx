
import {useCallback, useState, useEffect } from 'react';
import { Container, Grid, Typography, Card, CardContent, Divider, Box, InputLabel, DialogContent, DialogContentText, TextField, Button, Tooltip, IconButton} from '@mui/material';


import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DeleteIcon from '@mui/icons-material/Delete';

import { TagsInput } from "react-tag-input-component";
import { Toaster } from 'react-hot-toast';
import Select from 'react-select'

import { useDispatch, useSelector } from 'react-redux';
import { product, createProduct }  from '../../store/productsStore/ProductsThunks';
import { createMany, getDataOption as getDataOptionSubcategories } from '../../store/subcategoriesStore/SubCategoriesThunks';
import { getBrandsByCategory } from '../../store/brandsStore/BrandsThunks';
import { getGenderByCategory } from '../../store/gendersStore/GenderThunks';

import ReactQuill from 'react-quill';

import { LinearProgressComponent } from '../../components/Backdrop/LinearProgress';
import { FormSelect }              from '../components/FormSelect';
import { FormNameSlugKeys }        from '../components/FormNameSlugKeys';
import { FormPrice }               from '../components/FormPrice';
import { FormAttributes }          from '../components/FormAttributes';
import { FormImages }              from '../components/FormImages';
import { FormBtnAddAtributes }     from '../components/FormBtnAddAtributes';
import { TableAttributes }         from '../components/TableAttibutes';
import { FormDescription }         from '../components/FormDescription';
import { FormSpecification }       from '../components/FormSpecification';
import { FormDetails } from '../components/FormDetails';

import { useDropzone } from 'react-dropzone';
import { setFormDataProduct } from '../../store/productsStore/Products';

export const ProductView = () => {

    const dispatch                = useDispatch();
    const { dataProduc }          = useSelector(state  => state.products);
    
    const [formData, setFormData] = useState(dataProduc.data);
    const [images, setImages]     = useState([]);
    const [imagesStorage, setImagesStorage]     = useState([]);
    
    const [value, setValue] = useState('one');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    function CustomTabPanel({ children, value, index }) {
      return (
        <div role="tabpanel" hidden={value !== index}>
          {value === index && (
            <Box sx={{ p: 3 }}>
              <Typography>{children}</Typography>
            </Box>
          )}
        </div>
      );
    }

      /* IMAGES */
      useEffect(() => {
          setImages([]);
          handleChangeForm({
              target: {
                  name:"images",
                  value:[],
              },
          });
      },[dataProduc.data.color])
  
      const handleChangeForm = (e) => {
        const { name, value } = e.target;
        dispatch(setFormDataProduct({ name, value }));
      }
  
      const handleRemoveImage = (index) => {
  
        const updatedImages = images.filter((_, i) => i !== index);
        
        console.log("updatedImages ",updatedImages)

        setImages(updatedImages);

        const filesDataRemove = updatedImages.map((file) => ({
                    name: file.name,
                    type: file.type,
                    size: file.size,
                }));

          handleChangeForm({
            target: {
              name:"images",
              value:filesDataRemove,
            },
          });
  
      };
        
      const onDrop = useCallback((acceptedFiles) => {
  
        acceptedFiles.forEach((file) => {
          setImages((prevImages) => [
              ...prevImages,
              Object.assign(file, {
                preview: URL.createObjectURL(file),
            }),
          ]);
        });

        acceptedFiles.forEach((file) => {
          setImagesStorage((prevImages) => [
              ...prevImages,
              Object.assign(file, {
                preview: URL.createObjectURL(file),
            }),
          ]);
        });
              
  
  
          const filesData = acceptedFiles.map((file) => ({
                                                            name: file.name,
                                                            type: file.type,
                                                            size: file.size,
                                                        }));
  
            handleChangeForm({
              target: {
                  name:"images",
                  value:filesData,
              },
            });

      }, []);
      
  
      const { getRootProps, getInputProps } = useDropzone({ onDrop });
  
      /* DRAG AND DROP */
      const [draggedImageIndex, setDraggedImageIndex] = useState(null);
      const [isDragging, setIsDragging] = useState(false);
  
      const handleDragStart = (index) => {
          setDraggedImageIndex(index);
          setIsDragging(true); // Cambia el estado a arrastrando
      };
  
      const handleDragEnd = () => {
          setIsDragging(false); // Cambia el estado a no arrastrando
      };
  
      const handleDragOver = (event) => {
          event.preventDefault(); // Permite soltar el elemento
      };
  
      const handleDrop = (index) => {
          if (draggedImageIndex === null) return;
          const newImages = [...images];
          const [movedImage] = newImages.splice(draggedImageIndex, 1); // Quita la imagen arrastrada
          newImages.splice(index, 0, movedImage); // Inserta la imagen en la nueva posición
          setImages(newImages); // Actualiza el estado de las imágenes
          setDraggedImageIndex(null); // Resetea el índice
          setIsDragging(false); // Cambia el estado a no arrastrando
      };
      /* END DRAG AND DROP */

      const createProductView = async () => {
        const updatedFormDataProduct = {
          ...dataProduc.data,
          images: imagesStorage,
        };
        await dispatch(createProduct(updatedFormDataProduct));
      }
    return (
        <Container maxWidth="xl" sx={{ marginTop: '20px' }}>
        <Card variant="outlined">
          <CardContent>

            <Typography variant="h4" gutterBottom>
              Create Product
            </Typography>
  
            {/* Sección ID */}
            
            <Box sx={{ marginBottom: '10px' }}>

                {/* SELECTS */}
                <FormSelect />
                {/* END SELECTS */}

                {/* NAME - SLUG - TAG */}
                <FormNameSlugKeys />
                {/* END NAME - SLUG - TAG */}
           

                {/* PRECIO  */}
                <FormPrice />
                {/* END PRECIO  */}

                {/* FORM ATTRIBUTES */}
                <FormAttributes/>
                {/* END FORM ATTRIBUTES*/}
                
                {/* FORM IMAGES */}
                {/*<FormImages/>*/}
                <Grid container spacing={2}>

                  <Grid item xs={4} sx={{ mt: 2, mb: 2 }}>
                      <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '5px', textAlign: 'center' }}>
                          <input {...getInputProps()} />
                          <p>Drag 'n' drop some files here, or click to select files</p>
                          <img src="https://mantisdashboard.io/assets/upload-DIXWsuDa.svg" alt="Upload Icon" style={{ marginTop: '5px' }} />
                      </div>
                  </Grid>

                  <Grid item xs={8} sx={{ mt: 2, mb: 2 }}>
                    <Grid container spacing={2}>
                        {images.map((src, index) => (
                            <Grid item xs={12} sm={3} md={3} key={index} sx={{ position: 'relative' }}>
                                <Box
                                    component="img"
                                    src={src.preview}
                                    alt={`Image ${index + 1}`}
                                    draggable
                                    onDragStart={() => handleDragStart(index)}
                                    onDragEnd={handleDragEnd}
                                    onDragOver={handleDragOver}
                                    onDrop={() => handleDrop(index)}
                                    sx={{
                                        width: '200px',
                                        height: 'auto',
                                        borderRadius: 2,
                                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                        transform: isDragging ? 'scale(1.1)' : 'scale(1)', // Efecto de levitación
                                        boxShadow: isDragging ? '0 8px 20px rgba(0, 0, 0, 0.3)' : 'none', // Sombra
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
                  </Grid>

                </Grid>
                {/* END FORM IMAGES */}

                {/* FORM BTN ADD ATTRIBUTES */}
                <FormBtnAddAtributes />
                {/* END BTN ADD ATTRIBUTES */}

                {/* TABLE ATTRIBUTES */}
                <TableAttributes />

                {/* END TABLE ATTRIBUTES */}
                <Grid container spacing={2}  sx={{ mt: "25px", mb:"30px" }}>
                    <Box sx={{ width: '100%' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="wrapped label tabs example"
                        >
                            <Tab
                                value="one"
                                label="Description"
                                wrapped
                            />
                            <Tab value="two" label="Details" />
                            <Tab value="three" label="Specification" />
                        </Tabs>

                                {/* Contenido dependiente de cada pestaña */}
                        <CustomTabPanel value={value} index={'one'}>
                          <FormDescription />
                        </CustomTabPanel>

                        <CustomTabPanel value={value} index={'two'}>
                          <FormDetails />
                        </CustomTabPanel>
                        
                        <CustomTabPanel value={value} index={'three'}>
                          <FormSpecification />
                        </CustomTabPanel>
                    </Box>
                </Grid>

                <Grid container spacing={2} sx={{ mt: "25px", mb:"30px" }}>
                    <Button
                        onClick={createProductView}
                        variant="contained"
                        color="primary"
                        style={{ margin: '10px' }}
                        fullWidth
                    >
                        Create Product
                    </Button>
                </Grid>

            </Box>

  
            <Divider />
  
    

          </CardContent>
        </Card>
        <Toaster />
      </Container>
  
      
        );
 

}