import { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import { Grid, TextField, InputLabel, Button } from '@mui/material';
import { setFormDataProduct } from '../../store/productsStore/Products';
import { getDataOption as getDataOptionSubcategories } from '../../store/subcategoriesStore/SubCategoriesThunks';
import { getBrandsByCategory }                         from '../../store/brandsStore/BrandsThunks';
import { getGenderByCategory }                         from '../../store/gendersStore/GenderThunks';
import { useDispatch, useSelector } from 'react-redux';

import { LinearProgressComponent } from '../../components/Backdrop/LinearProgress';

import Select from 'react-select'

export const FormSelect = () => {

    const dispatch = useDispatch();

    const { dataProduc, clearProduct } = useSelector(state  => state.products);
    
    const { openLinearProgress }  = useSelector( state => state.shared );
    const { dataOptions }    = useSelector( state => state.categories);
    const { dataOptionsSub } = useSelector( state => state.subcategories );
    const { dataBrands }     = useSelector( state => state.brands );
    const { dataGenders }    = useSelector( state => state.gender );

    const [selectedOptionCategory,    setSelectedOptionCategory]    = useState(null);
    const [selectedOptionSubCategory, setSelectedOptionSubCategory] = useState(null);
    const [selectedOptionBrand, setSelectedOptionBrand]             = useState(null);
    const [selectedOptionGender, setSelectedOptionGender]           = useState(null);
    
    const [isClearable, setIsClearable] = useState(true);

        const clearImmediate = () => {
            setSelectedOptionCategory(null);
            setSelectedOptionSubCategory(null);
            setSelectedOptionBrand(null);
            setSelectedOptionGender(null);
            //setFormData(clearProduct);
        }

        {/* SELECT CATEGORY */}
        const handleChangeSelect = (e, type=null) => {
            switch(type){
                case 'category':
                    setSelectedOptionCategory(e);
                    dispatch(setFormDataProduct({id_categories: e ? e.value :null, name_category:e ? e.label :null, id_category:e ? e.value :null }));
                    if(e != null) dispatch(getDataOptionSubcategories(e.value));
                break;
                case 'subcategory':
                    setSelectedOptionSubCategory(e);
                    dispatch(setFormDataProduct({id_subcategories: e ? e.value :null, name_subcategory:e ? e.label :null }));
                    if(e != null)  dispatch(getBrandsByCategory(dataProduc.data.id_category, e.value));
                    if(e != null)  dispatch(getGenderByCategory(dataProduc.data.id_category, e.value));
                break;
                case 'brand':
                    setSelectedOptionBrand(e);
                break;
                case 'gender':
                    setSelectedOptionGender(e);
                break;
                default:
                    setSelectedOptionCategory(null);
                    setSelectedOptionSubCategory(null);
                    setSelectedOptionBrand(null);
                    setSelectedOptionGender(null);
                break; 
            }
            
        }

    return (
        <Grid container spacing={2}>

        <Grid item xs={3}>                       
            <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
            <Select isClearable
                    //value={selectedOptionCategory}
                    className="basic-single"
                    classNamePrefix="select"
                    options={dataOptions}
                    onChange={(e) => handleChangeSelect(e,"category")}
                    value={dataOptions.find(option => option.value === dataProduc.data.id_categories)}
            />
        </Grid>

        {/* SECTION SUBCATEGORY */}
        <Grid item xs={3}>

            <InputLabel id="demo-simple-select-label">Select Sub Category</InputLabel>

            {

                openLinearProgress ? <LinearProgressComponent/> : 
                            <Select labelId="demo-simple-select-label"
                                    isClearable={isClearable}
                                    //value={selectedOptionSubCategory}
                                    value={dataOptionsSub.find(option => option.value === dataProduc.data.id_subcategories)}
                                    options={dataOptionsSub} 
                                    onChange={(e) => handleChangeSelect(e,"subcategory")} 
                                   />
            }

        </Grid>

        {/* SECTION BRAND */}
        <Grid item xs={3}>

        <InputLabel id="demo-simple-select-label">Select Brand</InputLabel>

        {

            openLinearProgress ? <LinearProgressComponent/> : 
                        <Select labelId="demo-simple-select-label"
                                isClearable={isClearable}
                                //value={selectedOptionBrand}
                                value={dataBrands.find(option => option.value === dataProduc.data.id_brand)}
                                options={dataBrands} 
                                onChange={(e) => handleChangeSelect(e,"brand")} 
                            />
        }

        </Grid>
        
        {/* SECTION GENDER */}
        <Grid item xs={3}>

            <InputLabel id="demo-simple-select-label">Select Gender</InputLabel>

            {

                openLinearProgress ? <LinearProgressComponent/> : 
                            <Select labelId="demo-simple-select-label"
                                    isClearable={isClearable}
                                    value={selectedOptionGender}
                                    options={dataGenders} 
                                    onChange={(e) => handleChangeSelect(e,"gender")} 
                                />
            }

        </Grid>

         {/* Sección Estado de la Transacción */}
        <Grid item xs={4}>
            <Button variant="contained" onClick={clearImmediate}>Contained</Button>
        </Grid>

    </Grid>
    )

}