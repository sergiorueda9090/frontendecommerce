
import { Grid, TextField ,Button} from '@mui/material';
import { setFormDataProduct } from '../../store/productsStore/Products';

import { useDispatch, useSelector } from 'react-redux';
import useToastDelete from '../../components/alerts/useToastDelete';

import { updateOnlyProduct } from '../../store/productsStore/ProductsThunks';


const txtMessage = "¿Estás seguro de que deseas realizar la actualización? Por favor, revisa toda la información cuidadosamente, ya que esta acción sobrescribirá los datos existentes.";

export const FormPrice = () => {

    const dispatch = useDispatch();
 
    const { dataProduc, clearProduct} = useSelector(state  => state.products);

    const requestConfirmation = useToastDelete(txtMessage);

    const handleChangeForm = (e) => {

      const { name, value } = e.target;

      if(name == "discount" || name == "purchase_price" || name == "percentage_profit"){
          
        const costoNumerico     = name == "purchase_price" ? parseFloat(value) : parseFloat(dataProduc.data.purchase_price);
        const gananciaNumerica  = costoNumerico * (parseFloat(name == "percentage_profit" ?  value : dataProduc.data.percentage_profit) / 100);

        const precioConGanancia = costoNumerico + gananciaNumerica;
        const descuento         = precioConGanancia * (parseFloat( name == "discount" ? value : dataProduc.data.discount) / 100);

        const precioFinal       = precioConGanancia - descuento;
        
        const originalPrice     = precioConGanancia;
        /*setFormData({
          ...formData,
          ["sale_price"]: precioFinal,
          [name]        :   value,
        });*/

        dispatch(setFormDataProduct({ name, value, sale_price: precioFinal, originalPrice:originalPrice }));
   
        //dispatch(setFormDataProduct({ name, value }));

      }
      
    }

    const handleUpdateProduc = async() => {

      const {
          id,
          id_subcategories,
          id_categories,
          name,
          slug,
          keywords,
          purchase_price,
          percentage_profit,
          sale_price,
          discount,
      } = dataProduc.data;
  
      // Create an object of the fields for validation
      const fieldsToValidate = {
          id,
          id_subcategories,
          id_categories,
          name,
          slug,
          keywords,
          purchase_price,
          percentage_profit,
          sale_price,
          discount,
      };
  
      // Validation function
      const validateFields = (fields) => {
          for (const [key, value] of Object.entries(fields)) {
              if (!value) {
                  return `The field '${key}' is required and cannot be empty.`;
              }
          }
          return null; // All fields are valid
      };
  
      // Run validation
      const validationError = validateFields(fieldsToValidate);
      if (validationError) {
          alert(validationError);
          return; // Stop execution if validation fails
      }
      let sendData = {
                        id,
                        id_subcategories,
                        id_categories,
                        name,
                        slug,
                        keywords,
                        purchase_price,
                        percentage_profit,
                        sale_price,
                        discount,
                      };

      // Proceed with the update logic
      dispatch(updateOnlyProduct(sendData))
      console.log("All fields are valid. Proceeding with update... ",dataProduc.data);
  };


  const handleAddClick = async() => {
    const isConfirmed = await requestConfirmation();
    if(isConfirmed){
      await handleUpdateProduc();
    }
  };
    
  return (
    <>
    <Grid container spacing={2}>
        <Grid item xs={4}>
            <TextField
                id="purchase_price"
                label="Purchase price"
                name="purchase_price"
                type="number"
                variant="standard"
                required
                fullWidth
                value={dataProduc.data.purchase_price}
                onChange={(e) => handleChangeForm(e)}
                />
        </Grid>

        <Grid item xs={2}>
            <TextField
                id="percentage_profit"
                label="percentage of profit"
                name="percentage_profit"
                type="number"
                variant="standard"
                required
                fullWidth
                value={dataProduc.data.percentage_profit}
                onChange={(e) => handleChangeForm(e)}
                />
        </Grid>

        <Grid item xs={2}>
            <TextField
                id="discount"
                label="Discount"
                name="discount"
                type="number"
                variant="standard"
                required
                fullWidth
                value={dataProduc.data.discount}
                onChange={(e) => handleChangeForm(e)}
                />
        </Grid>

        <Grid item xs={2}>
            <TextField
                id="sale_price"
                label="Sale price"
                name="sale_price"
                type="number"
                variant="standard"
                required
                fullWidth
                value={dataProduc.data.sale_price}
                onChange={(e) => handleChangeForm(e)}
                InputProps={{
                    readOnly: true,
                }}
                />
        </Grid>

        <Grid item xs={2}>
            <TextField
                id="originalPrice"
                label="originalPrice price"
                name="originalPrice"
                type="number"
                variant="standard"
                required
                fullWidth
                value={dataProduc.data.originalPrice}
                onChange={(e) => handleChangeForm(e)}
                InputProps={{
                    readOnly: true,
                }}
                />
        </Grid>

        <Grid item xs={4}> 
          { dataProduc.data.id !== "" ? <Button variant="contained" onClick={handleAddClick}  fullWidth>Update Record</Button>:"" }
      </Grid>

      
    </Grid>


      </>
    )

}