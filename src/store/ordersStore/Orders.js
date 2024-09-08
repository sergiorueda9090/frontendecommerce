import { createSlice } from '@reduxjs/toolkit'

export const Orders = createSlice({
  name: 'Orders',
  initialState: {
    dataOrders: [],
    dataOptionsSub:[],
    pager:{"currentPage": 0,  "perPage"   : 0,
           "totalItems" : 0,  "totalPages": 0},
    dataOrder: {
        "status": true,
        "message": "",
        "data": {
            "id"              : "",
            "name"            : "",
            "email"           : "",
            "quantity"        : "",
            "price"           : "",
            "image"           : "",
            "estadoTx"        : "",
            "transactionState": "",
            "lapPaymentMethod": "",
            "created_at"      : "",
            "updated_at"      : "",
            "deleted_at"      : "",
        }
    },
  },
  reducers: {
    setClearData:(state, action) => {
      state.dataOrder.data = {
        "id"              : "",
        "name"            : "",
        "email"           : "",
        "quantity"        : "",
        "price"           : "",
        "image"           : "",
        "estadoTx"        : "",
        "transactionState": "",
        "lapPaymentMethod": "",
        "created_at"      : "",
        "updated_at"      : "",
        "deleted_at"      : "",
      }
    },
    setDataDataOrders:(state, action) => {
        state.dataOrders = action.payload.dataOrders;
        state.pager      = action.payload.pager 
    },
    setDataOrder:(state, action) => {
        state.dataOrder.data = action.payload.dataOrder;
    },
    setDataOptions:(state, action) => {
      state.dataOptionsSub = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setClearData, setDataDataOrders, setDataOrder, setDataOptions } = Orders.actions;