import { createSlice } from '@reduxjs/toolkit'

export const Banner = createSlice({
  name: 'Banner',
  initialState: {
    dataBanners: [],
    dataOptionsSub:[],
    pager:{"currentPage": 0,  "perPage"   : 0,
           "totalItems" : 0,  "totalPages": 0},
    dataBanner: {
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
      state.dataBanner.data = {
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
    setDataDataBanners:(state, action) => {
        state.dataBanners = action.payload.dataBanners;
        state.pager       = action.payload.pager 
    },
    setDataBanner:(state, action) => {
        state.dataBanner.data           = action.payload.dataBanner;
        state.dataBanner.data.keywords  = action.payload.dataBanner.keywords.split(',');
       
    }
  }
})

// Action creators are generated for each case reducer function
export const { setClearData, setDataDataBanners, setDataBanner } = Banner.actions;