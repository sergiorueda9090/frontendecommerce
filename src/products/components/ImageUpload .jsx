import React, { useEffect, useState } from 'react';
import { Button, Card, CardHeader, Skeleton } from '@mui/material';
import { useSelector } from 'react-redux';

const ImageUpload = ({ onImageUpdate, image=""}) => {
     
    const { openModalStore }  = useSelector( state => state.shared );

    const [preview,       setPreview]      = useState("");
    const [previewImage,  setPreviewImage] = useState("")
  
    const handleImageChange = (event) => {
      
      const file = event.target.files[0];
      
      if (file) {

        const reader = new FileReader();

        reader.onloadend = () => {
          setPreview(reader.result);
          onImageUpdate(file);  // Pass image data to parent
        };

        reader.readAsDataURL(file);
        
        setPreviewImage("");

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

        if(preview == ""){

          return <>
                  <Card sx={{ maxWidth: 345 }}>
                          <CardHeader />
                          <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
                  </Card>
          </>

        }else{

          return <>
               <div>
                  <img src={preview} alt="Preview" style={{ width: '100%', maxHeight: '300px', marginTop: '20px' }} />
                </div>
          </>          

        }


      }else{

        return <>
                <div>
                  <img src={previewImage} alt="Preview" style={{ width: '100%', maxHeight: '300px', marginTop: '20px' }} />
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

          {showImage()}

      </div>
    );
  };
  
  export default ImageUpload;