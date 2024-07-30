import React, { useEffect, useState } from 'react';
import { Button, Card, CardHeader, Skeleton } from '@mui/material';
import { useSelector } from 'react-redux';
import Resizer from 'react-image-file-resizer';

const ImageUpload = ({ onImageUpdate, image=""}) => {
     
    const { openModalStore }  = useSelector( state => state.shared );

    const [preview,       setPreview]      = useState("");
    const [previewImage,  setPreviewImage] = useState("");
    const [error, setError]                = useState("");


    const validateImageDimensions = (file) => {
      return new Promise((resolve, reject) => {
          Resizer.imageFileResizer(
              file,
              1920,
              80,
              'JPEG, PNG, JPG',
              100,
              0,
              (uri) => {
                  const img = new Image();
                  img.src = uri;
                  img.onload = () => {
                      if (img.width === 1920 && img.height === 80) {
                          resolve(true);
                      } else {
                          reject('Image dimensions must be 1920x80 pixels');
                      }
                  };
              },
              'base64'
          );
      });
  };

    const handleImageChange = async (event) => {
      
      const file = event.target.files[0];
      
      if (file) {
          try {
              await validateImageDimensions(file);
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

      if(previewImage == ""){

        if (preview === "") {
          return (
            <Card sx={{ maxWidth: 1920 }}>
              <CardHeader />
              <Skeleton sx={{ width: 1920, height: 80 }} animation="wave" variant="rectangular" />
            </Card>
          );
        } else {
          return (
            <div sx={{ maxWidth: 1920 }}>
              <img src={preview} alt="Preview" style={{ width: '1920px', height: '80px', marginTop: '20px' }} />
            </div>
          );
        }


      }else{

        return <>
                <div sx={{ maxWidth: 1920 }}>
                  <img src={previewImage} alt="Preview" style={{ width: '1920px', height: '80px', marginTop: '20px' }} />
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