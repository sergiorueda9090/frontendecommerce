import { Grid } from '@mui/material';
import {useCallback, useState, useEffect } from 'react';

import { useDropzone } from 'react-dropzone';

export const ImagesBanner = (props) => {
    
    const onDrop = useCallback(async (acceptedFiles) => {
        try {
          // Procesar los archivos para imágenes locales
          await Promise.all(
            acceptedFiles.map(async (file) => {
              const preview = URL.createObjectURL(file);
      
              props.setImages((prevImages) => [
                ...prevImages,
                Object.assign(file, { preview }),
              ]);
      
              props.setImagesStorage((prevImages) => [
                ...prevImages,
                Object.assign(file, { preview }),
              ]);
            })
          );
      
        } catch (error) {
          console.error("Error procesando los archivos:", error);
        }
      }, []);


      
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <>
            <Grid item xs={4} sx={{ mt: 2, mb: 2 }}>
                <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '5px', textAlign: 'center' }}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                    <img src="https://mantisdashboard.io/assets/upload-DIXWsuDa.svg" alt="Upload Icon" style={{ marginTop: '5px' }} />
                </div>
            </Grid>
        </>
    )
}