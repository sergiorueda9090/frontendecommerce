import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select'
import toast from 'react-hot-toast';
import { ModalHeader } from './ModalHeader';
import { closeModalShared } from '../../store/sharedStore/shared';
import { DialogContent, DialogContentText, Grid, TextField, InputLabel } from '@mui/material';

import { getDataOption }  from '../../store/categoriesStore/categoriesThunks';
import { getDataOption as getDataOptionSubcategories } from '../../store/subcategoriesStore/SubCategoriesThunks';

import { createGender, editGender } from '../../store/gendersStore/GenderThunks';

import useToastEdit       from '../../components/alerts/useToastEdit';
import useFormValidation  from '../../hooks/useFormValidation';
import { LinearProgressComponent } from '../../components/Backdrop/LinearProgress';


export const ModalBody = () => {

  const requestConfirmation = useToastEdit();

  const dispatch = useDispatch();

  {/* COMPONENTES GLOBALES */}
  const { openModalStore, openLinearProgress } = useSelector( state => state.shared );
  
  const [isClearable, setIsClearable] = useState(true);

  {/* STORE REDUX */}
  const { dataGender }      = useSelector( state => state.gender );
  const { dataOptions }     = useSelector( state => state.categories );
  const { dataOptionsSub }  = useSelector( state => state.subcategories );


  {/* FORMULARIO */}
  const [formData, setFormData] = useState({ "id"               : "",
                                              "name"            : "",
                                              "category_id"     : "",
                                              "category_name"   : "",
                                              'subcategory_name': "",
                                              "subcategory_id"  : "",
                                              "created_at"      : "",
                                              "updated_at"      : "",
                                              "deleted_at"      : ""});

  useEffect(() => {

    {/* LIST ALL CATEGORIES */}
    dispatch(getDataOption());

    if(dataGender.data.id === ""){

    }else{
      
      setFormData(dataGender.data);
      
      dispatch(getDataOptionSubcategories(dataGender.data.category_id))
    
    }

  },[dataGender.data]);

  useEffect(() => {

    if(!openModalStore){

      setFormData({ "id"              : "",
                    "name"            : "",
                    "category_id"     : "",
                    "category_name"   : "",
                    'subcategory_name': "",
                    "subcategory_id"  : "",
                    "created_at"      : "",
                    "updated_at"      : "",
                    "deleted_at"      : ""});

    
    }

  },[openModalStore])

  const validationRules = {
    category_id   : { required: true },
    subcategory_id: { required: true },
    name          : { required: true },
  }

  const { errors, validate } = useFormValidation(formData, validationRules);
 
  const handleChangeForm = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });    
  }


  const handleImageUpdate = (imageData) => {
    console.log("imageData ",imageData);
    setFormData((prevData) => ({
      ...prevData,
      ["image"]: imageData
    }));
  
  };


  const handleEdit = async (e) => {

    e.preventDefault();    
    
    const isConfirmed = await requestConfirmation();

    if (isConfirmed) {
      
      if (validate()) {

        await dispatch(closeModalShared());
        await dispatch(editGender(formData));

      }else{

      const errorMessages = Object.values(errors).join('\n');
      toast.error(errorMessages);

      }
    
    }

  }

  const clearComponents = async () => {
    
    setFormData({ "id"              : "",
                  "name"            : "",
                  "category_id"     : "",
                  "category_name"   : "",
                  'subcategory_name': "",
                  "subcategory_id"  : "",
                  "created_at"      : "",
                  "updated_at"      : "",
                  "deleted_at"      : ""});



  }

  const handlecreate = async (e) => {

    e.preventDefault();

      if (validate()) {

        await dispatch(closeModalShared());

        await dispatch(createGender(formData));
        
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

 


  const handleChangeSelect = async (e) => {
        
    if(e != null){
      
      await setFormData({
        ...formData,
        ["category_id"]  : e.value,
        ["category_name"]: e.label,
      });
      
      await dispatch(getDataOptionSubcategories(e.value));

    }else{
      
      await setFormData({
        ...formData,
        ["category_id"]  : "",
        ["category_name"]: "",
      });
    
    }


    
  }

  const handleChangeSelectSub = async (e) => {

    if(e != null){
      
      await setFormData({
        ...formData,
        ["subcategory_id"]  : e.value,
        ["subcategory_name"]: e.label,
      });

    }else{

      await setFormData({
        ...formData,
        ["subcategory_id"]  : "",
        ["subcategory_name"]: "",
      });

    }


  }

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
        
        <ModalHeader title={formData.id != "" ? "Editar Brand": "Crear Brand"}/>

        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>


          <Grid container spacing={2}>

          <Grid item xs={6}>
              <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
              
              <Select labelId="demo-simple-select-label" 
                      isClearable={isClearable}
                      options={dataOptions} onChange={ (e) => handleChangeSelect(e)} 
                      value={dataOptions.find(option => option.value === formData.category_id)}/>

            </Grid>

            <Grid item xs={6}>
              <InputLabel id="demo-simple-select-label">Select Sub Category</InputLabel>
             
              {
                openLinearProgress ? <LinearProgressComponent/> : 
                            <Select labelId="demo-simple-select-label" 
                                    options={dataOptionsSub} 
                                    onChange={ (e) => handleChangeSelectSub(e)} 
                                    isClearable={isClearable}
                                    value={dataOptionsSub.find(option => option.value == formData.subcategory_id)}/>
              }
            </Grid>
            
            <Grid item xs={6}>
              <TextField
                  id="name"
                  label="Name"
                  name="name"
                  type="text"
                  variant="standard"
                  required
                  fullWidth
                  value={formData.name}
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