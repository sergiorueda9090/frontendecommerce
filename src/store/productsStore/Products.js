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
          "id"               : "", 
          "id_user"          : "", 
          "id_categories"    : "", 
          "id_category"      : "",
          "id_brand"         : "",
          "id_gender"        : "",
          "id_productattributes": "", //only use in edit
          "name_category"    : "", 
          "id_subcategories" : "",
          "name_subcategory" : "",
          "name"             : "", 
          "attribute"        : "",
          "valueAttribute"   : "",
          "color"            : "",
          "cantidad"         : "",
          "arrayAttributes"  : [],
          "slug"             : "",
          "description"      : "", 
          "details"          : "", 
          "specifications"   : [], 
          "purchase_price"   : "",
          "originalPrice"    : "",
          "percentage_profit": "",
          "sale_price"       : "",
          "discount"         : "",
          "size"             : "",
          "sizes"            : [],
          "quantity"         : "",
          "keywords"         : [], 
          "icon"             : "", 
          "image"            : "",
          "images"           : []
        },
        "images":[],
        "size"  : [],
    },
    clearProduct:{
      "status": true,
      "message": "",
      "data": {
        "id"               : "", 
        "id_user"          : "", 
        "id_categories"    : "", 
        "id_category"      : "",
        "id_brand"         : "",
        "id_gender"        : "",
        "id_productattributes": "", //only use in edit
        "name_category"    : "", 
        "id_subcategories" : "",
        "name_subcategory" : "",
        "name"             : "", 
        "attribute"        : "",
        "valueAttribute"   : "",
        "color"            : "",
        "cantidad"         : "",
        "arrayAttributes"  : [],
        "slug"             : "",
        "description"      : "", 
        "details"          : "", 
        "specifications"   : [], 
        "purchase_price"   : "",
        "originalPrice"    : "",
        "percentage_profit": "",
        "sale_price"       : "",
        "discount"         : "",
        "size"             : "",
        "sizes"            : [],
        "quantity"         : "",
        "keywords"         : [], 
        "icon"             : "", 
        "image"            : "",
        "images"           : []
      },
      "images":[],
      "size"  : [],
  }
  },
  reducers: {
    setClearData:(state, action) => {
      state.dataProduc = state.clearProduct
    },
    setDataProducts:(state, action) => {
        state.dataProducts = action.payload.data;
        state.pager        = action.payload.pager 
    },
    setDataProduct:(state, action) => {
      state.dataProduc.data                 = action.payload.product;
      state.dataProduc.data.id_productattributes = action.payload.id_productattributes;
      state.dataProduc.data.specifications  = action.payload.specifications;
      state.dataProduc.data.keywords        = action.payload.product.keywords.split(', ');
      state.dataProduc.data.arrayAttributes = action.payload.arrayAttributes;
      state.dataProduc.data.images          = action.payload.imagesArray;
    },
    setAddAttributeArray:(state, action) => {
      state.dataProduc.data.arrayAttributes = [...state.dataProduc.data.arrayAttributes, action.payload];
    },
    setRemoveAttributeArray:(state, action) => {
      console.log("action.payload ",action.payload)
      state.dataProduc.data.arrayAttributes = action.payload;
    },
    setAddImagesArray:(state, action) => {
      state.dataProduc.data.images = action.payload;
    },

    setFormDataProduct:(state, action) => {
      const { name,           value,             sale_price, originalPrice, slug, 
              keywords,       id_categories,     name_category, 
              id_category,    id_subcategories,  name_subcategory, 
              specifications, description,       details } = action.payload; // Desestructura el nombre y valor

      if (name) {
        state.dataProduc.data[name] = value;
      }
      
      if (sale_price !== undefined) {
        state.dataProduc.data.sale_price = sale_price; // Actualiza el precio de venta
      }
      
      if (originalPrice !== undefined) {
         state.dataProduc.data.originalPrice = originalPrice; // Actualiza el precio de venta originalPrice
      }

      if (slug !== undefined) {
        state.dataProduc.data.slug = slug; // Actualiza el precio de venta
      }

      if(keywords !== undefined) {
        state.dataProduc.data.keywords = keywords; // Actualiza el precio de venta
      }

      if(id_categories!== undefined) {
        state.dataProduc.data.id_categories = id_categories;
      }

      if(name_category!== undefined) {
        state.dataProduc.data.name_category = name_category;
      }

      if(id_category!== undefined) {
        state.dataProduc.data.id_category = id_category;
      }

      if(id_subcategories !== undefined) {
        state.dataProduc.data.id_subcategories = id_subcategories;
      }

      if(name_subcategory !== undefined) {
        state.dataProduc.data.name_subcategory = name_subcategory;
      }

      if(specifications !== undefined) {
        console.log("specifications ",specifications)
        state.dataProduc.data.specifications = specifications;
      }

      if(description !== undefined) {
        state.dataProduc.data.description = description;
      }

      if(details !== undefined) {
        state.dataProduc.data.details = details;
      }


      
    },

  }
})

// Action creators are generated for each case reducer function
export const { setClearData, setDataProducts, setDataProduct, setAddAttributeArray, setRemoveAttributeArray, setAddImagesArray, setFormDataProduct } = Products.actions;