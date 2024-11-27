import {useCallback, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Skeleton from '@mui/material/Skeleton';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { TagsInput } from "react-tag-input-component";
import toast from 'react-hot-toast';
import Select from 'react-select'
import { v4 as uuidv4 } from 'uuid';
import ReactQuill from 'react-quill';
import Resizer from 'react-image-file-resizer';
import 'react-quill/dist/quill.snow.css';
import { SketchPicker } from 'react-color';
import { useDropzone } from 'react-dropzone';
import { ModalHeader } from './ModalHeader';
import { closeModalShared } from '../../store/sharedStore/shared';
import { setClearCategory } from '../../store/categoriesStore/Categories';
import { DialogContent, DialogContentText, Grid, TextField, InputLabel } from '@mui/material';
import { getDataOption } from '../../store/categoriesStore/categoriesThunks';
import { createMany, getDataOption as getDataOptionSubcategories } from '../../store/subcategoriesStore/SubCategoriesThunks';
import { createProduct, getDeleteSize, deleteImage, editProduct } from '../../store/productsStore/ProductsThunks';
import { URL as urlIP } from '../../api/authApi';
import useToastEdit  from '../../components/alerts/useToastEdit';
import useFormValidation from '../../hooks/useFormValidation';
import useToastDelete from '../../components/alerts/useToastDelete';
import { LinearProgressComponent } from '../../components/Backdrop/LinearProgress';

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


export const ModalBody = () => {

  const requestConfirmation = useToastEdit();
  const requestConfirmationDelete = useToastDelete();

  const dispatch = useDispatch();
 
  const { openModalStore, openLinearProgress }  = useSelector( state => state.shared );
  const { dataOptions }     = useSelector( state => state.categories );
  const { dataProduc }      = useSelector( state => state.products);
  const { dataOptionsSub }  = useSelector( state => state.subcategories );

  const [rowsTableSize, setRowsTableSize]             = useState([]);
  const [rowsTableUpdateSize, setRowsTableUpdateSize] = useState([]);
  const [selected, setSelected]           = useState([]);
  const [images, setImages]               = useState([]);
  const [invalidImages, setInvalidImages] = useState([]);
  const [imagesUpdate, setImagesUpdate]   = useState([]);
  const [textDescription, setTextDescription]       = useState('');
  const [textDetails, setTextDetails]               = useState('');
  const [textSpecifications, setTextSpecifications] = useState('')
  
  const [formData, setFormData] = useState({"id"               : "", 
                                             "id_user"          : "", 
                                             "id_categories"    : "", 
                                             "id_category"      : "",
                                             "name_category"    : "", 
                                             "id_subcategories" : "",
                                             "name_subcategory" : "",
                                             "name"             : "", 
                                             "slug"             : "",
                                             "description"      : "", 
                                             "details"          : "", 
                                             "specifications"   : "", 
                                             "purchase_price"   : "",
                                             "percentage_profit": "",
                                             "sale_price"       : "",
                                             "discount"         : "",
                                             "size"             : "",
                                             "sizes"            : [],
                                             "quantity"         : "",
                                             "keywords"         : [], 
                                             "icon"             : "", 
                                             "image"            : "",
                                             "images"           : []});

  const [rowsTable, setRowsTable] = useState([]);

  useEffect(() => {
    
    dispatch(getDataOption());
    
    setFormData(dataProduc.data);
    
    setTextDescription(dataProduc.data.description);

    setTextDetails(dataProduc.data.details); 
    
    setTextSpecifications(dataProduc.data.specifications);

    setSelected(dataProduc.data.keywords);

    setRowsTableSize(dataProduc.size);

    //setImages(dataProduc.images);

    setImagesUpdate(dataProduc.images);

    if(dataProduc.data.id != ""){

      dispatch(getDataOptionSubcategories(dataProduc.data.id_categories));
    
    }

  },[dataProduc.data]);
  
  useEffect(() => {

    if(!openModalStore){

  
      setFormData({"id"              : "", 
                  "id_user"          : "", 
                  "id_categories"    : "", 
                  "id_category"      : "",
                  "name_category"    : "", 
                  "id_subcategories" : "",
                  "name_subcategory" : "",
                  "name"             : "", 
                  "slug"             : "",
                  "description"      : "", 
                  "details"          : "", 
                  "specifications"   : "", 
                  "purchase_price"   : "",
                  "percentage_profit": "",
                  "sale_price"       : "",
                  "discount"         : "",
                  "size"             : "",
                  "sizes"            : [],
                  "quantity"         : "",
                  "keywords"         : [], 
                  "icon"             : "", 
                  "image"            : "",
                  "images"           : []});

        setSelected([]);
        
    }

  },[openModalStore])

  const validationRules = {
    id_categories     : { required: true },
    id_subcategories  : { required: true },
    name              : { required: true },
    purchase_price    : { required: true },
    percentage_profit : { required: true },
    sale_price        : { required: true },
    discount          : { required: true }
  }

  const { errors, validate } = useFormValidation(formData, validationRules);
 
  function createSlug(text) {
    return text
      .toLowerCase()       // Convierte todo a minúsculas
      .trim()              // Elimina espacios en blanco al principio y al final
      .replace(/ /g, '-')  // Reemplaza los espacios por guiones
      .replace(/[^\w-]+/g, ''); // Elimina cualquier carácter que no sea una letra, número, guión o subrayado
  }
  
  const handleChangeForm = (e) => {
      
      if(e.target.name === "name"){
      
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
          ["slug"]: createSlug(e.target.value),
        });
      
      }else if(e.target.name == "discount" || e.target.name == "purchase_price" || e.target.name == "percentage_profit"){
        
        const costoNumerico     = e.target.name == "purchase_price" ? parseFloat(e.target.value) : parseFloat(formData.purchase_price);
        const gananciaNumerica  = costoNumerico * (parseFloat(e.target.name == "percentage_profit" ?  e.target.value : formData.percentage_profit) / 100);

        const precioConGanancia = costoNumerico + gananciaNumerica;
        const descuento         = precioConGanancia * (parseFloat( e.target.name == "discount" ? e.target.value : formData.discount) / 100);

        const precioFinal       = precioConGanancia - descuento;
        
        setFormData({
          ...formData,
          ["sale_price"]: precioFinal,
          [e.target.name]:   e.target.value,
        });

      }else{

        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      
      }
  }

  const handleChangeSelect = (e) => {

    setFormData({
      ...formData,
      ["id_categories"]: e.value,
      ["name_category"]: e.label,
      ["id_category"]  : e.value,
    });

    dispatch(getDataOptionSubcategories(e.value));

  }

  const handleChangeSelectSub = (e) => {

    setFormData({
      ...formData,
      ["id_subcategories"]: e.value,
      ["name_subcategory"]: e.label
    });

    //dispatch(getDataOptionSubcategories(e.value));

  }

  const handelChangeValueDescription = (e) => {
      setTextDescription(e);
  }

  const handelChangeValueDetails = (e) => {
    setTextDetails(e);
  }

  const handelChangeValueSpecifications = (e) => {
    setTextSpecifications(e);
  }

  
  const handleImageUpdate = (imageData) => {
    setFormData((prevData) => ({
      ...prevData,
      ["image"]: imageData
    }));
  };


  
  const handleEdit = async (e) => {

    e.preventDefault();    

    if(rowsTable.length > 0){

      await dispatch(closeModalShared());
      await dispatch(createMany(rowsTable));

    }else{

      if(textDescription === ""){

        toast.error("You need the Description");

        return false;

      }else if(textDetails === ""){

        toast.error("You need the Details");

        return false;

      }else if(textSpecifications === ""){
        
        toast.error("You need the Specifications");

        return false;

      }

      if (validate()) {
        

        if(rowsTableSize.length <= 0){

          toast.error("You need size, color and quantity");

          return false;

        }else if(images.length <= 0){

          toast.error("You need Images");

          return false;

        }

        const editFormDataProduct = {
          ...formData,
          keywords        : selected.join(','),
          sizes           : rowsTableUpdateSize,
          images          : images,
          description     : textDescription,
          details         : textDetails,
          specifications  : textSpecifications,
      };

        await dispatch(closeModalShared());

        await dispatch(editProduct(formData.id, editFormDataProduct));
  
      }else{
  
        const errorMessages = Object.values(errors).join('\n');
        toast.error(errorMessages);
  
      }

    }

  }

  const clearComponents = () => {
 
    setFormData({"id"              : "", 
                "id_user"          : "", 
                "id_categories"    : "", 
                "id_category"      : "",
                "name_category"    : "", 
                "id_subcategories" : "",
                "name_subcategory" : "",
                "name"             : "", 
                "slug"             : "",
                "description"      : "", 
                "details"          : "", 
                "specifications"   : "", 
                "purchase_price"   : "",
                "percentage_profit": "",
                "sale_price"       : "",
                "discount"         : "",
                "size"             : "",
                "sizes"            : [],
                "quantity"         : "",
                "keywords"         : [], 
                "icon"             : "", 
                "image"            : "",
                "images"           : []});

    setSelected([]);
    
  }

  const handelAddTag = (tags) => {
    setSelected(tags)
  }

  const handleClose = async () => {
    dispatch(closeModalShared());
    dispatch(setClearCategory());
  };

  const columns = [
    { field: 'id',          headerName: 'Id',           minWidth: 50,  flex: 1 },
    { field: 'category',    headerName: 'Category',     minWidth: 100, flex: 1 },
    { field: 'name',        headerName: 'Name',         minWidth: 150, flex: 1 },
    { field: 'slug',        headerName: 'Slug',         minWidth: 150, flex: 1 },
    { field: 'description', headerName: 'Description',  minWidth: 200, flex: 2 },
    { field: 'keywords',    headerName: 'Keywords',     minWidth: 150, flex: 1 },
    { field: 'image_name',  headerName: 'Image Name',   minWidth: 150, flex: 1 },
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
    if (!obj.slug) {
      errors.push('slug');
    }
    if (!obj.id_categories) {
      errors.push('id_categories');
    }
    if (!obj.category) {
      errors.push('category');
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
                  'name'          : formData.name, 
                  'slug'          : formData.slug,   
                  'id_categories' : formData.id_categories,
                  'category'      : formData.name_category,
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

  const showManyRegister = () => {

    if(formData.id != ""){



    }

  }

  const [color, setColor] = useState('#fff');

  const handleChangeComplete = (colors) => {
    setColor(colors.hex);
  };

  const [showPicker, setShowPicker] = useState(false);

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const validateImageDimensions = (file) => {
    return new Promise((resolve, reject) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        'JPEG, PNG, JPG',
        100,
        0,
        (uri) => {
          const img = new Image();
          img.src = uri;
          img.onload = () => {
            if (img.width === 300 && img.height === 300) {
              resolve(true);
            } else {
              reject('Image dimensions must be 300x300 pixels');
            }
          };
        },
        'base64'
      );
    });
  };

  const onDrop = useCallback((acceptedFiles) => {
    const newInvalidImages = [];
    
    acceptedFiles.forEach((file) => {
      validateImageDimensions(file)
        .then(() => {
          setImages((prevImages) => [
            ...prevImages,
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }),
          ]);
        })
        .catch((fileName) => {
          newInvalidImages.push(fileName);
        });
    });

    setInvalidImages(newInvalidImages);
  }, []);

  const deleteImageOnDrop = (image) => {
    setImages(prevImages => prevImages.filter(img => img.name !== image.name));
    URL.revokeObjectURL(image.preview); // Revoke the object URL to free up memory
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const columnsSize = [
    { field: 'id',        headerName: 'Id',       minWidth: 50,   flex: 1 },
    { field: 'size',      headerName: 'Size',     minWidth: 100,  flex: 1 },
    { field: 'color',     headerName: 'Color',    minWidth: 150,  flex: 1 },
    { field: 'quantity',  headerName: 'Quantity', minWidth: 150,  flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 150,
      renderCell: (params) => (
        <>
          <Tooltip title="Eliminar item">
            <Button
              variant="contained"
              color="error"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={() => handleDeleteClickSize(params.row.id)}
              style={{ marginLeft: 8 }}
            >
              Delete
            </Button>
          </Tooltip>
        </>
      ),
    },
  ];


  const handleDeleteClickSize = async(id) => {

    const isConfirmed = await requestConfirmationDelete();

    if(isConfirmed){
      //dispatch(getDelete(id));
      let dataRowSizeDelete = rowsTableSize.filter((rows) => {return rows.id == id});
      
      if(dataRowSizeDelete[0].id && dataRowSizeDelete[0].idColor && dataRowSizeDelete[0].idQuantity){

        dispatch(getDeleteSize(dataRowSizeDelete[0].id, dataRowSizeDelete[0].idColor, dataRowSizeDelete[0].idQuantity));
      
      }

      let dataRowsSizeNew = rowsTableSize.filter((rows) => {return rows.id != id})

      setRowsTableSize(dataRowsSizeNew);

    }

  };

  const hangleAddSize = () => {
    
    let validateAddSize = ["",null,undefined];
    
    const uuid = uuidv4();

    if(validateAddSize.includes(formData.size)){

      toast.error("You need the size");
      return false;

    }else if(validateAddSize.includes(formData.quantity)){
      toast.error("You nedd the quantity");
      return false;
    }

    const dataRowsSize = {'id'      : uuid.split('-')[0],
                          "size"    : formData.size,
                          "color"   : color,
                          "quantity": formData.quantity,
                          }
      
    setRowsTableSize([...rowsTableSize, dataRowsSize])

    setRowsTableUpdateSize([...rowsTableSize, dataRowsSize])
  
  }
  

  const handlecreate = async (e) => {

    e.preventDefault();


    if(rowsTable.length > 0){

      await dispatch(closeModalShared());
      await dispatch(createMany(rowsTable));

    }else{

      if(textDescription === ""){

        toast.error("You need the Description");

        return false;

      }else if(textDetails === ""){

        toast.error("You need the Details");

        return false;

      }else if(textSpecifications === ""){
        
        toast.error("You need the Specifications");

        return false;

      }

      if (validate()) {
        

        if(rowsTableSize.length <= 0){

          toast.error("You need size, color and quantity");

          return false;

        }else if(images.length <= 0){

          toast.error("You need Images");

          return false;

        }

        const updatedFormDataProduct = {
          ...formData,
          keywords        : selected.join(','),
          sizes           : rowsTableSize,
          images          : images,
          description     : textDescription,
          details         : textDetails,
          specifications  : textSpecifications,
      };

        await dispatch(closeModalShared());

        await dispatch(createProduct(updatedFormDataProduct));
  
      }else{
  
        const errorMessages = Object.values(errors).join('\n');
        toast.error(errorMessages);
  
      }

    }


  }

  const handleRemoveImage = async (id) => {
    
    const isConfirmed = await requestConfirmationDelete();

    if(isConfirmed){

      const removeImage = images.filter((image) => image.id == id);

      if(removeImage[0].id){

        dispatch(deleteImage(removeImage[0].id));

      }

      const updatedImages = imagesUpdate.filter(item => item.id !== id);

      setImagesUpdate(updatedImages);

    }

  };


  const xsValue = showPicker ? 2 : 5;

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
        
        <ModalHeader title={formData.id != "" ? "Edit Product": "Create Product"}/>

        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>


          <Grid container spacing={2}>
            
            <Grid item xs={6}>
              <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
              <Select labelId="demo-simple-select-label" 
                      options={dataOptions} onChange={ (e) => handleChangeSelect(e)} 
                      value={dataOptions.find(option => option.value === formData.id_categories)}/>
            </Grid>

            <Grid item xs={6}>

              <InputLabel id="demo-simple-select-label">Select Sub Category</InputLabel>

              {

                openLinearProgress ? <LinearProgressComponent/> : 
                            <Select labelId="demo-simple-select-label" 
                                    options={dataOptionsSub} 
                                    onChange={ (e) => handleChangeSelectSub(e)} 
                                    value={dataOptionsSub.find(option => option.value === formData.id_subcategories)}/>
              }
              
            </Grid>

            <Grid item xs={6}>
              <TextField
                  id="name"
                  label="Nombre"
                  name="name"
                  type="name"
                  variant="standard"
                  required
                  fullWidth
                  value={formData.name}
                  onChange={(e) => handleChangeForm(e)}
                />
            </Grid>

            <Grid item xs={6}>
              
              <TextField
                  id="slug"
                  label="Slug"
                  name="slug"
                  type="text"
                  variant="standard"
                  required
                  InputProps={{
                    readOnly: true,
                }}
                  fullWidth
                  value={formData.slug}
                  onChange={(e) => handleChangeForm(e)}
                />

            </Grid>

            <Grid item xs={6}>
              
              <ReactQuill   theme="snow" 
                            value={textDescription}
                            onChange={(e) => handelChangeValueDescription(e)}
                            modules={modules}
                            formats={formats} />

            </Grid>
                
            <Grid item xs={6}>
              
              <ReactQuill   theme="snow" 
                            value={textDetails} 
                            onChange={(e) => handelChangeValueDetails(e)}
                            modules={modules}
                            formats={formats} />

            </Grid>

            <Grid item xs={6}>
              
              <ReactQuill   theme="snow" 
                            value={textSpecifications} 
                            onChange={(e) => handelChangeValueSpecifications(e)}
                            modules={modules}
                            formats={formats} />

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
              
            <Grid item xs={4}>
              <TextField
                  id="purchase_price"
                  label="Purchase price"
                  name="purchase_price"
                  type="number"
                  variant="standard"
                  required
                  fullWidth
                  value={formData.purchase_price}
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
                  value={formData.percentage_profit}
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
                  value={formData.discount}
                  onChange={(e) => handleChangeForm(e)}
                />
            </Grid>

            <Grid item xs={4}>
              <TextField
                  id="sale_price"
                  label="Sale price"
                  name="sale_price"
                  type="number"
                  variant="standard"
                  required
                  fullWidth
                  value={formData.sale_price}
                  onChange={(e) => handleChangeForm(e)}
                  InputProps={{
                    readOnly: true,
                }}
                />
            </Grid>

            <Grid item xs={2}>
              <TextField
                  id="size"
                  label="Talla"
                  name="size"
                  type="text"
                  variant="standard"
                  required
                  fullWidth
                  value={formData.size}
                  onChange={(e) => handleChangeForm(e)}
                />
            </Grid>

              <Grid item xs={3}>
                <Button 
                  mt='5' 
                  variant="contained" 
                  endIcon={<AddCircleOutlineIcon />} 
                  onClick={togglePicker} 
                  fullWidth
                >
                  {showPicker ? 'Hide Color Picker' : 'Show Color Picker'}
                </Button>
              </Grid>
              {showPicker && (
                <Grid item xs={3}>
                  <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
                </Grid>
              )}
        

            <Grid item xs={2}>
              <TextField
                  id="quantity"
                  label="Cantidad"
                  name="quantity"
                  type="text"
                  variant="standard"
                  required
                  fullWidth
                  value={formData.quantity}
                  onChange={(e) => handleChangeForm(e)}
                />
            </Grid>

            <Grid item xs={xsValue} >
               <Button mt='5' variant="contained" fullWidth endIcon={<AddCircleOutlineIcon />} onClick={ (e) => hangleAddSize() }>Add Size</Button>
            </Grid>

            <Grid item xs={12}>
              <div style={{ height: 380, width: '100%' }}>
                <DataGrid
                  rows={rowsTableSize}
                  columns={columnsSize}
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
                  scrollbarSize={10}
                />
              </div>
            </Grid>

   
            <Grid container spacing={2}>

                <Grid item xs={12} sx={{ mt: 2, mb: 5 }}>
                  <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                    <img src="https://mantisdashboard.io/assets/upload-DIXWsuDa.svg" alt="Upload Icon" style={{ marginTop: '10px' }} />
                  </div>

                  <div>
                      {images.map((file) => (
                        <div key={file.id} style={{ position: 'relative', display: 'inline-block', margin: '10px' }}>
                          <img
                            src={file.preview}
                            style={{ width: '300px', height: '300px' }}
                            alt={file.name}
                          />
                          <Tooltip title="Eliminar Imagen">
                            <IconButton
                              aria-label="delete"
                              onClick={() => deleteImageOnDrop(file)}
                              style={{ position: 'absolute', top: 0, right: 0, color: '#f44336' }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </div>
                      ))}
                  </div>
                  
                  {invalidImages.length > 0 && (
                    <div style={{ color: 'red', marginTop: '20px' }}>
                      <p>The following images do not comply with the size 300x300 pixels:</p>
                      <ul>
                        {invalidImages.map((fileName, index) => (
                          <li key={index}>{fileName}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Grid>

                {images.length === 0 && (
                  <Grid item xs={12}>
                    <Card sx={{ maxWidth: 300 }}>
                      <CardHeader />
                      <Skeleton sx={{ width: 300, height: 300 }} animation="wave" variant="rectangular" />
                    </Card>
                  </Grid>
                )}

            </Grid>
              
              {imagesUpdate.map((item, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <ImageList>
                    <ImageListItem key={item.created_at}>
                      <img
                        srcSet={`${urlIP}${item.image}`}
                        src={`${urlIP}${item.image}`}
                        alt={item.created_at}
                        loading="lazy"
                        style={{ width: '300px', height: '300px', marginTop: '20px', margin: '10px' }}
                      />
                      <Tooltip title="Eliminar Image">
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleRemoveImage(item.id)} // Llama a la función para eliminar la imagen
                          style={{ position: 'absolute', top: 0, right: 0, color: '#f44336' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </ImageListItem>
                  </ImageList>
                </Grid>
              ))}
            

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