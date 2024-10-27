import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select'
import { TagsInput } from "react-tag-input-component";
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { ModalHeader } from './ModalHeader';
import { closeModalShared } from '../../store/sharedStore/shared';
import { DialogContent, DialogContentText, Grid, TextField, InputLabel } from '@mui/material';

import { getDataOption }  from '../../store/categoriesStore/categoriesThunks';
import { getDataOption as getDataOptionSubcategories } from '../../store/subcategoriesStore/SubCategoriesThunks';

import { createBrand, createMany, editBrand } from '../../store/brandsStore/BrandsThunks';


import useToastEdit       from '../../components/alerts/useToastEdit';
import useFormValidation  from '../../hooks/useFormValidation';
import ImageUpload        from '../components/ImageUpload ';
import { LinearProgressComponent } from '../../components/Backdrop/LinearProgress';


export const ModalBody = () => {

  const requestConfirmation = useToastEdit();

  const dispatch = useDispatch();

  {/* COMPONENTES GLOBALES */}
  const { openModalStore, openLinearProgress } = useSelector( state => state.shared );
  
  const [isClearable, setIsClearable] = useState(true);

  {/* STORE REDUX */}
  const { dataBrand }       = useSelector( state => state.brands );
  const { dataOptions }     = useSelector( state => state.categories );
  const { dataOptionsSub }  = useSelector( state => state.subcategories );

  const [selected, setSelected] = useState([]);

  {/* FORMULARIO */}
  const [formData, setFormData] = useState({ "id"               : "",
                                              "name"            : "",
                                              "description"     : "",
                                              "image"           : "",
                                              "category_id"     : "",
                                              "category_name"   : "",
                                              'subcategory_name': "",
                                              "subcategory_id"  : "",
                                              "created_at"      : "",
                                              "updated_at"      : "",
                                              "deleted_at"      : ""});

  {/* TABLE MANY RECORDS */}
  const [rowsTable, setRowsTable] = useState([]);
  
  useEffect(() => {

    {/* LIST ALL CATEGORIES */}
    dispatch(getDataOption());

    if(dataBrand.data.id === ""){

    }else{
      
      setFormData(dataBrand.data);
      
      dispatch(getDataOptionSubcategories(dataBrand.data.category_id))
      
      //setSelected(dataBrand.data.keywords)
    }

  },[dataBrand.data]);

  useEffect(() => {

    if(!openModalStore){

      setFormData({ "id"              : "",
                    "name"            : "",
                    "description"     : "",
                    "image"           : "",
                    "category_id"     : "",
                    "category_name"   : "",
                    'subcategory_name': "",
                    "subcategory_id"  : "",
                    "created_at"      : "",
                    "updated_at"      : "",
                    "deleted_at"      : ""});

        setSelected([]);
    }

  },[openModalStore])

  const validationRules = {
    category_id   : { required: true },
    subcategory_id: { required: true },
    name          : { required: true },
    description   : { required: true },
    image         : { required: true, type: 'file' },
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

         {/*      const updatedFormData = {
          ...formData,
          keywords: selected.join(',')
          };*/}

        await dispatch(closeModalShared());
        await dispatch(editBrand(formData));

      }else{

      const errorMessages = Object.values(errors).join('\n');
      toast.error(errorMessages);

      }
    
    }

  }

  const clearComponents = async () => {
    
    setFormData({ "id"              : "",
                  "name"            : "",
                  "description"     : "",
                  "image"           : "",
                  "category_id"     : "",
                  "category_name"   : "",
                  'subcategory_name': "",
                  "subcategory_id"  : "",
                  "created_at"      : "",
                  "updated_at"      : "",
                  "deleted_at"      : ""});

    setSelected([]);

  }

  const handlecreate = async (e) => {

    e.preventDefault();

    if(rowsTable.length > 0){
      
      await dispatch(closeModalShared());
      await dispatch(createMany(rowsTable));
      await setRowsTable([]);
      
    }else{

      if (validate()) {

        //formData.keywords = selected.join(',')
        
        await dispatch(closeModalShared());

        await dispatch(createBrand(formData));
        
        await clearComponents();

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
    await dispatch(closeModalShared());
    await clearComponents();
  };

  const columns = [
    { field: 'id',              headerName: 'Id',           minWidth: 50,  flex: 1 },
    { field: 'category_name',   headerName: 'Category',     minWidth: 100, flex: 1 },
    { field: 'subcategory_name',headerName: 'Subcategory',  minWidth: 100, flex: 1 },
    { field: 'name',            headerName: 'Name',         minWidth: 100, flex: 1 },
    { field: 'description',     headerName: 'Description',  minWidth: 200, flex: 2 },
    { field: 'image_name',      headerName: 'Image Name',   minWidth: 150, flex: 1 },
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
      errors.push('name');
    }

    if (!obj.description) {
      errors.push('description');
    }

    if (!obj.image) {
      errors.push('image');
    }

    if (!obj.category_id) {
      errors.push('category');
    }

    if (!obj.subcategory_id) {
      errors.push('subcategory');
    }
  
    return errors;
  }
  
  const hangleAddRegister = () => {
    
    const uuid = uuidv4();

    let newRow = {'id'              : uuid.split('-')[0], 
                  'category_id'     : formData.category_id,
                  'category_name'   : formData.category_name,
                  'subcategory_name': formData.subcategory_name,
                  'subcategory_id'  : formData.subcategory_id,
                  'name'            : formData.name, 
                  'description'     : formData.description,
                  'image_name'      : formData.image.name,
                  'image'           : formData.image};

    let validationErrors = validateObject(newRow);
      
    if (validationErrors.length === 0) {

      setRowsTable([...rowsTable, newRow]);

    } else {

      toast.error('The object is invalid. The following fields are empty: '+validationErrors.join(', '));

      return;
    }
    
  }

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
              {console.log("formData.subcategory_id ",formData.subcategory_id)}
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
                    
                    <ImageUpload onImageUpdate={handleImageUpdate} image={"http://ecommerce/"+formData.image}/> 
                
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