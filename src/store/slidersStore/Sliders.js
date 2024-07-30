import { createSlice } from '@reduxjs/toolkit'

export const Sliders = createSlice({
  name: 'Sliders',
  initialState: {
    dataSliders: [],
    dataOptionsSub:[],
    pager:{"currentPage": 0,  "perPage"   : 0,
           "totalItems" : 0,  "totalPages": 0},
    dataSlider: {
        "status": true,
        "message": "",
        "data": {
            "id"          : "",
            "title"       :"",
            "description" : "",
            "discount"    : "",
            "image"       : "",
            "keywords"    : "",
            "created_at"  : "",
            "updated_at"  : "",
            "deleted_at"  : "",
        }
    },
  },
  reducers: {
    setClearData:(state, action) => {
      state.dataSlider.data = {
        "id"          : "",
        "title"       : "",
        "description" : "",
        "discount"    : "",
        "image"       : "",
        "keywords"    : "",
        "created_at"  : "",
        "updated_at"  : "",
        "deleted_at"  : "",
      }
    },
    setDataDataSliders:(state, action) => {
        state.dataSliders = action.payload.dataSliders;
        state.pager       = action.payload.pager 
    },
    setDataSlider:(state, action) => {
        state.dataSlider.data           = action.payload.dataSlider;
        state.dataSlider.data.keywords  = action.payload.dataSlider.keywords.split(',');
       
    },
    setDataOptions:(state, action) => {
      state.dataOptionsSub = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setClearData, setDataDataSliders, setDataSlider, setDataOptions } = Sliders.actions;