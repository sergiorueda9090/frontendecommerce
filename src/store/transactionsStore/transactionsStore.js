import { createSlice } from '@reduxjs/toolkit'

export const Transactions = createSlice({
  name: 'Transactions',
  initialState: {
    pager:{"currentPage":0, "perPage":0, "totalItems":0,  "totalPages":0},
    dataTransactions: {
        "status"  : "",
        "message" : "",
        "data"    : [],
    },
  },
  reducers: {
    setClearDataState:(state, action) => {
      state.dataTransactions = {
          "status"  : "",
          "message" : "",
          "data"    : [],
      }
    },
    
    setDataTransactions:(state, action) => {
        state.dataTransactions = action.payload.transactionsState;
        state.pager             = action.payload.pager
    },

  }
})

// Action creators are generated for each case reducer function
export const { setClearDataState, setDataTransactions } = Transactions.actions;