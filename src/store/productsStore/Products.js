import { createSlice } from '@reduxjs/toolkit'

export const Products = createSlice({
  name: 'Products',
  initialState: {
    dataProducts: [],
    pager:{"currentPage": 0,  "perPage"   : 0,
           "totalItems" : 0,  "totalPages": 0},
    dataProduc: {
        "status": true,
        "message": "",
        "data": {
            "id"                : "",
            "id_subcategories"  : "",
            "id_categories"     : "", 
            "id_category"       : "",
            "name_category"     : "", 
            "id_user"           : "",
            "name"              : "",
            "slug"              : "",
            "description"       : "",
            "details"           : "",
            "discount"          : "",
            "keywords"          : [],
            "percentage_profit" : "",
            "purchase_price"    : "",
            "sale_price"        : "",
            "specifications"    : "",
            "created_at"        : "",
            "updated_at"        : "",
            "deleted_at"        : "",
        },
        "images":[],
        "size"  : [],
    },
  },
  reducers: {
    setClearData:(state, action) => {
      state.dataProduc.data = {
        "id"            : "",
        "id_categorie"  : "",
        "id_categories" : "", 
        "id_category"   : "",
        "name_category" : "", 
        "id_user"       : "",
        "name"          : "",
        "slug"          : "",
        "description"   : "",
        "keywords"      : [],
        "icon"          : "",
        "image"         : "",
        "created_at"    : "",
        "updated_at"    : "",
        "deleted_at"    : "",
      }
    },
    setDataProducts:(state, action) => {
        state.dataProducts = action.payload.data;
        state.pager        = action.payload.pager 
    },
    setDataProduct:(state, action) => {
        state.dataProduc.data           = action.payload.data.product[0];
        state.dataProduc.data.keywords  = action.payload.data.product[0].keywords.split(',');
        state.dataProduc.images         = action.payload.data.image;
        state.dataProduc.size           = action.payload.data.size;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setClearData, setDataProducts, setDataProduct } = Products.actions;