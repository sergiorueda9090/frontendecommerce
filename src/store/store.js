import { configureStore } from '@reduxjs/toolkit'
import { Auth }           from './authStore/Auth.js';
import { Users }          from './usersStore/Users.js';
import { Shared }         from './sharedStore/shared.js';
import { Categories }     from './categoriesStore/Categories.js';

export const store = configureStore({
  reducer: {
    auth      : Auth.reducer,
    users     : Users.reducer,
    shared    : Shared.reducer,
    categories: Categories.reducer
  },
});