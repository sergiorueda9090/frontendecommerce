import { createSlice } from '@reduxjs/toolkit'

export const Gender = createSlice({
  name: 'Gender',
  initialState: {
    dataGenders: [],
    dataOptionsSub:[],
    pager:{"currentPage": 0,  "perPage"   : 0,
           "totalItems" : 0,  "totalPages": 0},
    dataGender: {
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
      state.dataGender.data = {
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
    setDataGenders:(state, action) => {
        state.dataGenders = action.payload.dataGenders;
        state.pager       = action.payload.pager 
    },
    setDataGender:(state, action) => {
        state.dataGender.data = action.payload.dataGender;
        //state.dataBrand.data.keywords  = action.payload.dataBanner.keywords.split(',');
    }
  }
})

// Action creators are generated for each case reducer function
export const { setClearData, setDataGenders, setDataGender } = Gender.actions;