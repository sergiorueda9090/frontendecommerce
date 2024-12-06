import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { Button, Card, CardHeader, Skeleton } from '@mui/material';
import { useSelector } from 'react-redux';
import Resizer from 'react-image-file-resizer';

const ImageUpload = ({ onImageUpdate, image=""}) => {

    const { openModalStore }  = useSelector( state => state.shared );

    const [preview,       setPreview]      = useState("");
    const [previewImage,  setPreviewImage] = useState("");
    const [error, setError]                = useState("");
    
    const handleRemoveImage = () => {

      setPreview("");
      setPreviewImage("");
      onImageUpdate(null);
      
    }


    const handleImageChange = async (event) => {
      
      const file = event.target.files[0];
 
      if (file) {
          try {
            
              const reader = new FileReader();

              reader.onloadend = () => {
                  setPreview(reader.result);
                  onImageUpdate(file);  // Pass image data to parent
              };

              reader.readAsDataURL(file);
              setPreviewImage("");
              setError("");
          } catch (err) {
              setError(err);
              setPreview("");
              onImageUpdate(null); // Reset the image data in the parent
          }
      }
      
    };

    useEffect(() => {
      setPreviewImage(image);
    },[image])

    useEffect(() => {

      if(openModalStore == false){
        setPreview("");
        setPreviewImage("")
      }
    
    },[openModalStore])

    const showImage = () => {
      {console.log("preview ",preview)}
      if(previewImage == ""){

        if (preview === "") {
          return (
            <Card sx={{ maxWidth: 100 }}>
              <CardHeader />
              <Skeleton sx={{ width: 100, height: 100 }} animation="wave" variant="rectangular" />
          </Card>
          );
        } else {
          return (
            <div 
                sx={{ 
           
                    alignSelf: 'center', 
                    justifySelf: 'center', 
                    aspectRatio: '19 / 10', 
                    objectFit: 'cover', 
                    transition: 'transform .5s ease',
                    mt:5
                }}
            >
                <img 
                    src={preview} 
                    alt="Preview" 
                    style={{ 

                        objectFit: 'cover', 
                        transition: 'transform .5s ease',
                        marginTop:"14px"
                    }} 
                />

                    <Tooltip title="Eliminar Image">
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleRemoveImage()}
                          style={{color: '#f44336' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                  </Tooltip>
            </div>
          );
        }


      }else{

        return <>
               <div 
                sx={{ 
          
                    alignSelf: 'center', 
                    justifySelf: 'center', 
                    aspectRatio: '19 / 10', 
                    objectFit: 'cover', 
                    transition: 'transform .5s ease' 
                }}
            >
                <img 
                    src={previewImage} 
                    alt="Preview" 
                    style={{ 

                        objectFit: 'cover', 
                        transition: 'transform .5s ease',
                         marginTop:"14px"
                    }} 
                />

                <Tooltip title="Eliminar Image">
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleRemoveImage()} // Llama a la función para eliminar la imagen
                          style={{color: '#f44336' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                  </Tooltip>
            </div>
              </>  

      }

    }
    
    return (
        <div>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="contained-button-file"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          </label>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          
          {showImage()}

        </div>
    );
  };
  
  export default ImageUpload;