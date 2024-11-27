

import {useCallback, useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Box,
} from '@mui/material';

import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";

import { setFormDataProduct } from '../../store/productsStore/Products';

import { useDispatch, useSelector } from 'react-redux';
import { updateDescriptionProduct } from '../../store/productsStore/ProductsThunks';

import useToastDelete from '../../components/alerts/useToastDelete';

const txtMessage = "Al actualizar la descripción, los cambios se guardarán y se aplicarán inmediatamente. Por favor, asegúrate de que la información ingresada es correcta.";


export const FormDescription = () => {

  const modules = {
    toolbar: [
      [{ 'font': [] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],  // Tamaño del texto
      [{ 'color': [] }, { 'background': [] }],          // Color de texto y fondo
      [{ 'align': [] }],
      ['bold', 'italic', 'underline', 'strike'],        // Formato de texto
      [{ 'script': 'sub'}, { 'script': 'super' }],      // Subíndice y superíndice
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],     // Listas
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // Sangría
      [{ 'direction': 'rtl' }],                         // Texto de derecha a izquierda
      ['blockquote', 'code-block'],                     // Blockquote y código
      ['link', 'image', 'video'],                       // Enlaces, imágenes y video
      ['clean']                                         // Limpiar formato
    ]
  };
  
  const formats = [
    'font', 'header', 'size', 'color', 'background', 'align',
    'bold', 'italic', 'underline', 'strike', 'script', 'list',
    'bullet', 'indent', 'direction', 'blockquote', 'code-block',
    'link', 'image', 'video'
  ];
  
  
  const dispatch = useDispatch();
 
  const { dataProduc, clearProduct} = useSelector(state  => state.products);
  console.log("dataProduc.data.description ",dataProduc.data.description)
  const [textDescription, setTextDescription] = useState(dataProduc.data.description);

  const requestConfirmation = useToastDelete(txtMessage);

  const handleChangeForm = (e) => {
    setTextDescription(e);
  }


  // Handler to save all tables' content
  const saveTables = () => {
    dispatch(setFormDataProduct({ description: textDescription }));
    // You can replace this with your save logic, such as sending to an API
    alert("Tables saved successfully!");
  };

  const updateDescription = async () => {

    let isConfirmed = await requestConfirmation();

    if(isConfirmed){

      let dataDescription = {"description": textDescription, "id": dataProduc.data.id,};

      await dispatch(updateDescriptionProduct(dataDescription))

    }

    
  }
    
  return (<>
            <div style={{ height: "70vh", width: "100%" }}> {/* Full viewport height */}
                <ReactQuill
                theme="snow"
                value={textDescription}
                onChange={(e) => handleChangeForm(e)}
                modules={modules}
                formats={formats}
                style={{ height: "100%", width: "100%" }}
                />
            </div>
                <Box display="flex" justifyContent="flex-end" marginTop="60px">

                  {
                    dataProduc.data.id !== "" ? 
                    <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => updateDescription()}
                    style={{ marginLeft: 8 }}
                  >
                    Edit Description
                  </Button> :

                  <Button
                    onClick={saveTables}
                    variant="contained"
                    color="success"
                  >
                    Save Description
                  </Button>
                              
                  }
                
                </Box>

          </>
    )
}