import { createSlice } from '@reduxjs/toolkit'

export const OrdersState = createSlice({
  name: 'OrdersState',
  initialState: {
    dataOrderState: {
        "status": "",
        "message": "",
        "data": [],
        "order": "",
        "customer": {
          "status": "200",
          "message": "",
          "data": [{
            "id": "",
            "name": "",
            "lastname": "",
            "surname": "",
            "second_surname": "",
            "phone": "",
            "address": "",
            "department": "",
            "city": "",
            "email": "",
            "password": "",
            "created_at": "",
            "updated_at": "",
            "deleted_at": "",
          }]
        },
        "transaction": {
          "status": "",
          "error": "",
          "data": [],
          "message": ""
        },
        "orderStatusTraceability": {
          "status": "",
          "message": "",
          "data": [{
            "id"            : "",
            "id_user"       : "",
            "id_order"      : "",
            "id_transaction": "",
            "order_state"   : "notification",
            "order_note"    : " ",
            "created_at"    : "",
            "updated_at"    : "",
            "deleted_at"    : ""
          }]
        }
    },
    formOrderStateRedux:{
      "order_status": "",
      "create_note" : "",
      "id_orders"   : [],
      "id_user"     : ""
    }
  },
  reducers: {
    setClearDataState:(state, action) => {
      state.dataOrderState = {
        "status": "",
        "message": "",
        "data": [],
        "order": "",
        "customer": {
          "status": "200",
          "message": "",
          "data": []
        },
        "transaction": {
          "status": "",
          "error": "",
          "data": [],
          "message": ""
        },
        "orderStatusTraceability": {
          "status": "",
          "message": "",
          "data": [{"order_state":"notification"}]
        }
      }
    },
    setDataOrdersState:(state, action) => {
        state.dataOrderState = action.payload.dataOrderState;
    },
    setFormOrderStates:(state, action) => {
      state.formOrderStateRedux.id_orders = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setClearDataState, setDataOrdersState, setFormOrderStates } = OrdersState.actions;