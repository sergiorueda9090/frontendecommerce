import { createSlice } from '@reduxjs/toolkit'

export const Auth = createSlice({
  name: 'auth',
  initialState: {
    infoUser: {},
    isLogin: false
  },
  reducers: {
    startLoaging:(state) => {
        state.isLogin = true
    },
    setAuthenticated:(state, action) => {
        state.infoUser  = action.payload.infoUser;
        state.isLogin   = true;
        localStorage.setItem("infoUser",JSON.stringify(action.payload.infoUser));
    }
  }
})

// Action creators are generated for each case reducer function
export const { startLoaging, setAuthenticated } = Auth.actions;