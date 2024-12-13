import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { ModalHeader } from './ModalHeader';
import { closeModalShared } from '../../store/sharedStore/shared';
import { DialogContent, DialogContentText, Grid, TextField, InputLabel } from '@mui/material';
import { editFeature, createFeature } from '../../store/featureStore/FeatureThunks';

import useToastEdit       from '../../components/alerts/useToastEdit';
import useFormValidation  from '../../hooks/useFormValidation';



export const ModalBody = () => {

  const requestConfirmation = useToastEdit();

  const dispatch = useDispatch();

  {/* COMPONENTES GLOBALES */}
  const { openModalStore } = useSelector( state => state.shared );
  
  {/* STORE REDUX */}
  const { dataFeature }      = useSelector( state => state.feature );

  {/* FORMULARIO */}
  const [formData, setFormData] = useState({ "id"           : "",
                                              "img"         : "",
                                              "title"       : "",
                                              "description" : "",
                                              "created_at"  : "",
                                              "updated_at"  : "",
                                              "deleted_at"  : ""});

  useEffect(() => {
    if(dataFeature.data.id === ""){
    }else{
      setFormData(dataFeature.data);
    }
  },[dataFeature.data]);

  useEffect(() => {

    if(!openModalStore){

      setFormData({ "id"          : "",
                    "img"         : "",
                    "title"       : "",
                    "description" : "",
                    "created_at"  : "",
                    "updated_at"  : "",
                    "deleted_at"  : ""});

    
    }

  },[openModalStore])

  const validationRules = {
    img         : { required: true },
    title       : { required: true },
    description : { required: true },
  }

  const { errors, validate } = useFormValidation(formData, validationRules);
 
  const handleChangeForm = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });    
  }

  const handleEdit = async (e) => {

    e.preventDefault();    
    
    const isConfirmed = await requestConfirmation();

    if (isConfirmed) {
      
      if (validate()) {

        await dispatch(closeModalShared());
        await dispatch(editFeature(formData));

      }else{

      const errorMessages = Object.values(errors).join('\n');
      toast.error(errorMessages);

      }
    
    }

  }

  const clearComponents = async () => {
    
    setFormData({ "id"          : "",
                  "img"         : "",
                  "title"       : "",
                  "description" : "",
                  "created_at"  : "",
                  "updated_at"  : "",
                  "deleted_at"  : ""});



  }

  const handlecreate = async (e) => {

    e.preventDefault();

      if (validate()) {

        await dispatch(closeModalShared());

        await dispatch(createFeature(formData));
        
        await clearComponents();

      }else{
  
        const errorMessages = Object.values(errors).join('\n');
        toast.error(errorMessages);
  
      }

  }

  const handleClose = async () => {
    await dispatch(closeModalShared());
    await clearComponents();
  };

 

  return (
    <>
      
      <Dialog
        open={openModalStore}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth={"lg"}
      >
        
        <ModalHeader title={formData.id != "" ? "Editar Feature": "Crear Feature"}/>

        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>


          <Grid container spacing={2}>

            
            <Grid item xs={6}>
              <TextField
                  id="img"
                  label="img"
                  name="img"
                  type="text"
                  variant="standard"
                  required
                  fullWidth
                  value={formData.img}
                  onChange={(e) => handleChangeForm(e)}
                />
            </Grid>

            <Grid item xs={6}>
              <TextField
                  id="title"
                  label="title"
                  name="title"
                  type="text"
                  variant="standard"
                  required
                  fullWidth
                  value={formData.title}
                  onChange={(e) => handleChangeForm(e)}
                />
            </Grid>

            <Grid item xs={6}>
              <TextField
                  id="description"
                  label="description"
                  name="description"
                  type="text"
                  variant="standard"
                  required
                  fullWidth
                  value={formData.description}
                  onChange={(e) => handleChangeForm(e)}
                />
            </Grid>

          </Grid>

        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>

          { formData.id != "" ? (<Button onClick={(e) => handleEdit(e)}>Editar</Button>) : <Button onClick={(e) => handlecreate(e)}>Crear</Button>  }
          
        </DialogActions>
      </Dialog>
    </>
  );
}