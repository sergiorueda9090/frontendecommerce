import { createSlice } from '@reduxjs/toolkit'

export const Auth = createSlice({
  name: 'auth',
  initialState: {
    infoUser  : {},
    isLogin   : false,
    token     : '',
    name_user : '',
    email     : '',
  },
  reducers: {
    startLoaging:(state) => {
        state.isLogin = true
    },
    loginSuccess:(state,action) => {
      state.isLogin   = action.payload.validateToken
      state.token     = action.payload.token
      state.name_user = action.payload.name_user
      state.email     = action.payload.email
    },
    loginFail:(state,action) => {
      state.isLogin = false
      state.token     = ""
      state.name_user = ""
      state.email     = ""
    },
    setAuthenticated:(state, action) => {
        state.infoUser  = action.payload.infoUser;
        console.log(action.payload.infoUser)
        console.log(action.payload.infoUser.validateToken)
        localStorage.setItem("infoUser",JSON.stringify(action.payload.infoUser));
        state.token     = action.payload.infoUser.token
        state.isLogin   = action.payload.infoUser.validateToken;
        state.name_user = action.payload.infoUser.name_user
        state.email     = action.payload.infoUser.email
    }
  }
})

// Action creators are generated for each case reducer function
export const { startLoaging, setAuthenticated, loginSuccess,  loginFail } = Auth.actions;