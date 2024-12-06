import { useCallback, useState, useEffect } from 'react';
import { Grid, Tooltip, IconButton, Box, Typography} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import { useDropzone } from 'react-dropzone';

import { setFormDataProduct } from '../../store/productsStore/Products';
import { useDispatch, useSelector } from 'react-redux';

export const FormImages = () => {
    
    const { dataProduc, clearProduct} = useSelector(state  => state.products);
    const [images, setImages] = useState([]);

    console.log("dataProduc.data.arrayAttributes ",dataProduc.data.arrayAttributesdataProduc.data.arrayAttributes)

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

    const dispatch = useDispatch();

    
    
    const handleRemoveImage = (index) => {

      const updatedImages = images.filter((_, i) => i !== index);
 
      setImages(updatedImages);

      /*handleChangeForm({
            target: {
                name:"images",
                value:[],
            },
        });*/

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


    return (
        <>
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
        </>
    )

}