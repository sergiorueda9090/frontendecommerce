import { createSlice } from '@reduxjs/toolkit'

export const Users = createSlice({
  name: 'Users',
  initialState: {
    dataUsers: [],
    dataUser: {
        "status": true,
        "message": "",
        "data": {
            "id": "",
            "name": "",
            "email": "",
            "password": "",
            "created_at": "",
            "updated_at": "",
            "deleted_at": null
        }
    },
  },
  reducers: {
    setClearUser:(state, action) => {
      state.dataUser.data = {
        "id": "",
        "name": "",
        "email": "",
        "password": "",
        "created_at": "",
        "updated_at": "",
        "deleted_at": null
      }
    },
    setDataUsers:(state, action) => {
        state.dataUsers     = action.payload.dataUsers;
    },
    setDataUser:(state, action) => {
        state.dataUser.data = action.payload.dataUser;
    }
  }
})

// Action creators are generated for each case reducer function
export const { startLoaging, setDataUsers, setDataUser, setClearUser } = Users.actions;