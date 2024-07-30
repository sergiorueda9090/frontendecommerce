import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { TagsInput } from "react-tag-input-component";
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { ModalHeader } from './ModalHeader';
import { closeModalShared } from '../../store/sharedStore/shared';
import { DialogContent, DialogContentText, Grid, TextField } from '@mui/material';
import { createMany } from '../../store/subcategoriesStore/SubCategoriesThunks';

import { editSlider } from '../../store/slidersStore/SlidersThunks';
import { creatBanner, editBanner /* clearDataBanner */ } from '../../store/bannerStore/BannerThunks';


import useToastEdit  from '../../components/alerts/useToastEdit';
import useFormValidation from '../../hooks/useFormValidation';
import ImageUpload from '../components/ImageUpload ';


export const ModalBody = () => {

  const requestConfirmation = useToastEdit();

  const dispatch = useDispatch();
 
  const { openModalStore }  = useSelector( state => state.shared );
  const { dataBanner }     = useSelector( state => state.banner );

  const [selected, setSelected] = useState([]);

  const [formData, setFormData] = useState( { "id"          : "",
                                              "title"       :"",
                                              "description" : "",
                                              "discount"    : "",
                                              "image"       : "",
                                              "keywords"    : "",
                                              "created_at"  : "",
                                              "updated_at"  : "",
                                              "deleted_at"  : ""});

  const [rowsTable, setRowsTable] = useState([]);
  
  useEffect(() => {
    if(dataBanner.data.id === ""){

    }else{
      
      setFormData(dataBanner.data);

      setSelected(dataBanner.data.keywords)

    }

    
  },[dataBanner.data]);

  useEffect(() => {

    if(!openModalStore){

      setFormData({"id"         : "",
                  "title"       :"",
                  "description" : "",
                  "discount"    : "",
                  "image"       : "",
                  "keywords"    : "",
                  "created_at"  : "",
                  "updated_at"  : "",
                  "deleted_at"  : ""});

        setSelected([]);
    }

  },[openModalStore])

  const validationRules = {
    title:        { required: true },
    description:  { required: true },
    discount:     { required: true },
    image:        { required: true, type: 'file' },
  }

  const { errors, validate } = useFormValidation(formData, validationRules);
 

  const handleChangeForm = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      
      
  }


  const handleImageUpdate = (imageData) => {

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

      const updatedFormData = {
          ...formData,
          keywords: selected.join(',')
      };

        await dispatch(closeModalShared());
        
        await dispatch(editBanner(updatedFormData));

      }else{

      const errorMessages = Object.values(errors).join('\n');
      toast.error(errorMessages);

      }
    
    }

  }

  const clearComponents = () => {
    
    setFormData({"id"         : "",
                 "title"       :"",
                 "description" : "",
                 "discount"    : "",
                 "image"       : "",
                 "keywords"    : "",
                 "created_at"  : "",
                 "updated_at"  : "",
                 "deleted_at"  : ""});

    setSelected([]);
    
  }

  const handlecreate = async (e) => {

    e.preventDefault();


    if(rowsTable.length > 0){

      await dispatch(closeModalShared());
      await dispatch(createMany(rowsTable));

    }else{

      if (validate()) {

        formData.keywords = selected.join(',')
        
        await dispatch(closeModalShared());

        await dispatch(creatBanner(formData));
  
      }else{
  
        const errorMessages = Object.values(errors).join('\n');
        toast.error(errorMessages);
  
      }

    }


  }

  const handelAddTag = (tags) => {
    setSelected(tags)
  }

  const handleClose = async () => {
    dispatch(closeModalShared());
    /*dispatch(cleardataBanner());*/
  };

  const columns = [
    { field: 'id',    headerName: 'Id', minWidth: 50, flex: 1 },
    { field: 'title', headerName: 'Title', minWidth: 100, flex: 1 },
    { field: 'discount',  headerName: 'Name', minWidth: 150, flex: 1 },
    { field: 'description', headerName: 'Description', minWidth: 200, flex: 2 },
    { field: 'keywords', headerName: 'Keywords', minWidth: 150, flex: 1 },
    { field: 'image_name', headerName: 'Image Name', minWidth: 150, flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 150,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => handleDeleteClick(params.row.id)}
            style={{ marginLeft: 8 }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];
  

  const handleDeleteClick = (id) => {
   
    let newRowsTable = rowsTable.filter( (row) => {return row.id !== id});
    
    setRowsTable(newRowsTable);
   
  }


  function validateObject(obj) {
    let errors = [];
  
    if (!obj.id) {
      errors.push('id');
    }
    if (!obj.name) {
      errors.push('title');
    }
    if (!obj.slug) {
      errors.push('discount');
    }
    if (!obj.description) {
      errors.push('description');
    }
    if (!obj.keywords) {
      errors.push('keywords');
    }
    if (!obj.image) {
      errors.push('image');
    }
  
    return errors;
  }
  
  const hangleAddRegister = () => {
    
    const uuid = uuidv4();
    
    let newRow = { 'id'           : uuid.split('-')[0], 
                  'title'         : formData.title, 
                  'discount'      : formData.discount,   
                  'description'   : formData.description,
                  'keywords'      : selected.join(','), 
                  'image_name'    : formData.image.name,
                  'image'         : formData.image };
 
    let validationErrors = validateObject(newRow);
      
    if (validationErrors.length === 0) {

      setRowsTable([...rowsTable, newRow]);

    } else {

      toast.error('The object is invalid. The following fields are empty: '+validationErrors.join(', '));
      return;
    }
    
    
    clearComponents();
  
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
        
        <ModalHeader title={formData.id != "" ? "Editar Banner": "Crear Banner"}/>

        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>


          <Grid container spacing={2}>
            
            <Grid item xs={6}>
              <TextField
                  id="title"
                  label="Title"
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
                  id="discount"
                  label="Discount"
                  name="discount"
                  type="text"
                  variant="standard"
                  required
                  fullWidth
                  value={formData.discount}
                  onChange={(e) => handleChangeForm(e)}
                />

            </Grid>

            <Grid item xs={6}>
              
              <TextField
                  id="description"
                  label="Description"
                  name="description"
                  type="text"
                  variant="standard"
                  required
                  fullWidth
                  value={formData.description}
                  onChange={(e) => handleChangeForm(e)}
                />

            </Grid>

            <Grid item xs={6}>
              <TagsInput
                value={selected}
                onChange={handelAddTag}
                name="keywords"
                placeHolder="Enter keywords"
                required
                fullWidth
              />
              <em>press enter or comma to add new tag</em>
            </Grid>

              <Grid item xs={12}>
                 
                  {
                    typeof formData.image === "string" && formData.image != "" ? 
                
                    <ImageUpload onImageUpdate={handleImageUpdate} image={"http://ecommerce/public/"+formData.image}/> 
                
                    : 
                
                    <ImageUpload onImageUpdate={handleImageUpdate} image=""/>
                  
                  }
  

              </Grid>

          </Grid>
           {
            formData.id == "" ? (<>
                         <Grid item xs={12} sx={{ mt:5, mb:5 }}>
             <Button mt='5' variant="contained" endIcon={<AddCircleOutlineIcon />} onClick={ (e) => hangleAddRegister() }>Add Register</Button>
           </Grid>

            <Grid item xs={12}>
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={rowsTable}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 12 },
                    },
                  }}    
                  pageSizeOptions={[5, 10]}     
                  disableColumnFilter // Deshabilita el filtrado de columnas
                  disableColumnMenu // Deshabilita el menú de columnas
                  //disableColumnResize // Deshabilita el redimensionamiento de columnas
                  disableColumnSelector // Deshabilita el selector de columnas
                  disableDensitySelector // Deshabilita el selector de densidad
                  autoHeight
                />
              </div>
            </Grid>
            </>):('')
           }

          
        
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>

          { formData.id != "" ? (<Button onClick={(e) => handleEdit(e)}>Editar</Button>) : <Button onClick={(e) => handlecreate(e)}>Crear</Button>  }
          
        </DialogActions>
      </Dialog>
    </>
  );
}