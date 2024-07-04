import { createSlice } from '@reduxjs/toolkit'

export const SubCategories = createSlice({
  name: 'SubCategories',
  initialState: {
    dataSubCategories: [],
    pager:{"currentPage": 0,  "perPage"   : 0,
           "totalItems" : 0,  "totalPages": 0},
    dataSubCategory: {
        "status": true,
        "message": "",
        "data": {
            "id"          : "",
            "id_categorie":"",
            "id_user"     : "",
            "name"        : "",
            "slug"        : "",
            "description" : "",
            "keywords"    : [],
            "icon"        : "",
            "image"       : "",
            "created_at"  : "",
            "updated_at"  : "",
            "deleted_at"  : "",
        }
    },
  },
  reducers: {
    setClearData:(state, action) => {
      state.dataSubCategory.data = {
        "id"          : "",
        "id_categorie":"",
        "id_user"     : "",
        "name"        : "",
        "slug"        : "",
        "description" : "",
        "keywords"    : [],
        "icon"        : "",
        "image"       : "",
        "created_at"  : "",
        "updated_at"  : "",
        "deleted_at"  : "",
      }
    },
    setDataSubCategories:(state, action) => {
        state.dataSubCategories = action.payload.dataSubCategories;
        state.pager             = action.payload.pager 
    },
    setDataSubCategory:(state, action) => {
        console.log("action.payload.dataCategory ",action.payload.dataCategory);
        state.dataSubCategory.data           = action.payload.dataCategory;
        state.dataSubCategory.data.keywords  = action.payload.dataCategory.keywords.split(',');
       
    }
  }
})

// Action creators are generated for each case reducer function
export const { setClearData, setDataSubCategories, setDataSubCategory } = SubCategories.actions;