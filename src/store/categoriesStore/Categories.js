import { createSlice } from '@reduxjs/toolkit'

export const Categories = createSlice({
  name: 'Categories',
  initialState: {
    dataCategories: [],
    dataOptions:[],
    dataCategory: {
        "status": true,
        "message": "",
        "data": {
            "id"        : "",
            "id_user"   : "",
            "name"      : "",
            "slug"      : "",
            "description": "",
            "keywords"  : [],
            "icon"      : "",
            "created_at": "",
            "updated_at": "",
            "deleted_at": "",
            "id_categories": "",
            "imageBanner":[],
            "image"     : "",
            "date_create": "",
            "date_update": "",
            "date_delete": null
        }
    },
  },
  reducers: {
    setClearCategory:(state, action) => {
      state.dataCategory = {
        "status": true,
        "message": "",
        "data": {
            "id"        : "",
            "id_user"   : "",
            "name"      : "",
            "slug"      : "",
            "description": "",
            "keywords"  : [],
            "icon"      : "",
            "created_at": "",
            "updated_at": "",
            "deleted_at": "",
            "id_categories": "",
            "imageBanner":[],
            "image"     : "",
            "date_create": "",
            "date_update": "",
            "date_delete": null
        }
      }
    },
    setDataCategories:(state, action) => {
        state.dataCategories = action.payload.dataCategories;
    },
    setDataCategory:(state, action) => {
      state.dataCategory.data             = action.payload.dataCategory;
      state.dataCategory.data.keywords    = action.payload.dataCategory.keywords.split(',');
      state.dataCategory.data.imageBanner = action.payload.imageBanner;
    },
    setDataOptions:(state, action) => {
      state.dataOptions = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setClearCategory, setDataCategories, setDataCategory, setDataOptions } = Categories.actions;