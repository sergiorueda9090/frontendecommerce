import { Grid, Button} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import { setAddAttributeArray } from '../../store/productsStore/Products';
import { useDispatch, useSelector } from 'react-redux';
import useToastDelete from '../../components/alerts/useToastDelete';
import { updateAddValueattributes } from '../../store/productsStore/ProductsThunks';

const txtMessage = "Al agregar el registro a la tabla, no podrás editarlo posteriormente, pero podrás eliminarlo si estás seguro de que deseas hacerlo. Solo podrás actualizar el atributo, el valor y la cantidad. Por favor, asegúrate de que la información ingresada sea correcta antes de proceder.";

export const FormBtnAddAtributes = (props) => {
    
    const { dataProduc, clearProduct} = useSelector(state  => state.products);

    const requestConfirmation = useToastDelete(txtMessage);
    
    const dispatch = useDispatch();

    const validateAttribute = async() => {
       
        let validateAddSize = ["",null,undefined];
        
        const uuid = uuidv4();
   
        if(validateAddSize.includes(dataProduc.data.attribute)){
    
          alert("You need the attributes");
          return false;
    
        }else if(validateAddSize.includes(dataProduc.data.valueAttribute)){
          
          alert("You nedd the valueAttribute");
          return false;

        }else if(validateAddSize.includes(dataProduc.data.color)){
           
          alert("You nedd the color");
            return false;
        
        }else if(validateAddSize.includes(dataProduc.data.cantidad)){
           
          alert("You nedd the cantidad");
            return false;
        
        }else if(dataProduc.data.images.length <= 0){
            alert("You need Images");
            return false;
        }
    
        const dataRowsSize = {'id'       : uuid.split('-')[0],
                              "attribute": dataProduc.data.attribute,
                              "value"    : dataProduc.data.valueAttribute,
                              "color"    : dataProduc.data.color,
                              "cantidad" : dataProduc.data.cantidad,
                              "images"   : dataProduc.data.images,
                              "imagesFiles": [],
                              "idProduct": dataProduc.data.id,
                              "idProductattributes" : dataProduc.data.id_productattributes,
                              };


        if(dataProduc.data.id !== ""){
          
          await dispatch(setAddAttributeArray(dataRowsSize));
          console.log("dataProduc.data.products[0] ",dataProduc.data);

          let pathParts = dataProduc.data.arrayAttributes[0].images[0].image.split("/");
          
          console.log("pathParts ",pathParts);

          let updatedFormDataProduct = {
            ...dataRowsSize,
            imagesFiles:   props.imagesStorage,
            name_category: pathParts[pathParts.length - 2],
            keywords:      dataProduc.data.keywords
          };

          console.log("updatedFormDataProduct ",updatedFormDataProduct)

          await dispatch(updateAddValueattributes(updatedFormDataProduct));

        }else{

          await dispatch(setAddAttributeArray(dataRowsSize));

        }

    }

    const handleAddClick = async() => {
      let isConfirmed = await requestConfirmation();
      if(isConfirmed){
        validateAttribute();
      }
    };

    const handleUpdateClick = async() => {
      let isConfirmed = await requestConfirmation();
      if(isConfirmed){
        await validateAttribute();
      }
    }


    return (
        <Grid item xs={12}>
            {
              dataProduc.data.id !== "" ? 
              <Button variant="contained" onClick={handleUpdateClick} fullWidth>Update Record</Button> 
              : 
              <Button variant="contained" onClick={handleAddClick} fullWidth>Add Record</Button>
            }
            
        </Grid>
    )

}