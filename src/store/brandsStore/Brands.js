import { createSlice } from '@reduxjs/toolkit'

export const Brands = createSlice({
  name: 'Brands',
  initialState: {
    dataBrands: [],
    dataOptionsSub:[],
    pager:{"currentPage": 0,  "perPage"   : 0,
           "totalItems" : 0,  "totalPages": 0},
    dataBrand: {
        "status": true,
        "message": "",
        "data": {
          "id"            : "",
          "name"          : "",
          "description"   : "",
          "image"         : "",
          "category_id"   : "",
          "subcategory_id": "",
          "created_at"    : "",
          "updated_at"    : "",
          "deleted_at"    : ""
        }
    },
  },
  reducers: {
    setClearData:(state, action) => {
      state.dataBrand.data = {
        "id"            : "",
        "name"          : "",
        "description"   : "",
        "image"         : "",
        "category_id"   : "",
        "subcategory_id": "",
        "created_at"    : "",
        "updated_at"    : "",
        "deleted_at"    : ""
      }
    },
    setDataBrands:(state, action) => {
        state.dataBrands = action.payload.dataBrands;
        state.pager      = action.payload.pager 
    },
    setDataBrand:(state, action) => {
        state.dataBrand.data = action.payload.dataBrand;
        //state.dataBrand.data.keywords  = action.payload.dataBanner.keywords.split(',');
    }
  }
})

// Action creators are generated for each case reducer function
export const { setClearData, setDataBrands, setDataBrand } = Brands.actions;