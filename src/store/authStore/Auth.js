import { createSlice } from '@reduxjs/toolkit'

const savedInfoUser = JSON.parse(localStorage.getItem("infoUser")) || {};

export const Auth = createSlice({
  name: 'auth',
  initialState: {
    infoUser  : {},
    isLogin   : savedInfoUser.islogin === "ok" ? true : false,
    token     : '',
    name_user : '',
    email     : '',
  },
  reducers: {
    loginSuccess:(state,action) => {
      state.isLogin   = action.payload.islogin === "error" ? false : true
      state.token     = action.payload.token
      state.name_user = action.payload.name_user
      state.email     = action.payload.email
    },
    loginFail:(state,action) => {
      localStorage.removeItem("infoUser");
      state.isLogin   = false
      state.token     = ""
      state.name_user = ""
      state.email     = ""
    },
    setAuthenticated:(state, action) => {
        state.infoUser  = action.payload.infoUser;
        state.token     = action.payload.infoUser.token
        state.isLogin   = action.payload.infoUser.islogin === "ok" ? true : false;
        state.name_user = action.payload.infoUser.name_user
        state.email     = action.payload.infoUser.email
        localStorage.setItem("infoUser",JSON.stringify(action.payload.infoUser));
    }
  }
})

// Action creators are generated for each case reducer function
export const { setAuthenticated, loginSuccess,  loginFail } = Auth.actions;