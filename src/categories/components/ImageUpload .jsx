import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import Resizer from 'react-image-file-resizer';

const ImageUpload = ({ onImageUpdate, image=""}) => {
     
    const { openModalStore }  = useSelector( state => state.shared );

    const [preview, setPreview]           = useState("");
    const [previewImage, setPreviewImage] = useState("")
    const [error, setError] = useState("");

    const validateImageDimensions = (file) => {
      return new Promise((resolve, reject) => {
          Resizer.imageFileResizer(
              file,
              170,
              170,
              'JPEG, PNG, JPG',
              100,
              0,
              (uri) => {
                  const img = new Image();
                  img.src = uri;
                  img.onload = () => {
                      if (img.width === 170 && img.height === 170) {
                          resolve(true);
                      } else {
                          reject('Image dimensions must be 170x170 pixels');
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
      {preview && (
          <div>
              <img src={preview} alt="Preview" style={{ width: '170px', height: '170px', marginTop: '20px' }} />
          </div>
      )}
      {previewImage && (
          <div>
              <img src={previewImage} alt="Preview" style={{ width: '170px', height: '170px', marginTop: '20px' }} />
          </div>
      )}
  </div>
    );
  };
  
  export default ImageUpload;