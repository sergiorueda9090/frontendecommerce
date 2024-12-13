import { createSlice } from '@reduxjs/toolkit'

export const Feature = createSlice({
  name: 'Feature',
  initialState: {
    dataFeatures: [],
    dataOptionsSub:[],
    pager:{"currentPage": 0,  "perPage"   : 0,
           "totalItems" : 0,  "totalPages": 0},
    dataFeature: {
        "status": true,
        "message": "",
        "data": {
          "id"          : "",
          "img"         : "",
          "title"       : "",
          "description" : "",
          "created_at"  : "",
          "updated_at"  : "",
          "deleted_at"  : ""
        }
    },
  },
  reducers: {
    setClearData:(state, action) => {
      state.dataFeature.data = {
        "id"          : "",
        "img"         : "",
        "title"       : "",
        "description" : "",
        "created_at"  : "",
        "updated_at"  : "",
        "deleted_at"  : ""
      }
    },
    setdataFeatures:(state, action) => {
        state.dataFeatures = action.payload.dataFeatures;
        state.pager        = action.payload.pager 
    },
    setDataFeature:(state, action) => {
        state.dataFeature.data = action.payload.dataFeature;
        //state.dataBrand.data.keywords  = action.payload.dataBanner.keywords.split(',');
    }
  }
})

// Action creators are generated for each case reducer function
export const { setClearData, setdataFeatures, setDataFeature } = Feature.actions;