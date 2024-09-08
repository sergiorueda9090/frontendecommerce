import { configureStore } from '@reduxjs/toolkit'
import { Auth }           from './authStore/Auth.js';
import { Users }          from './usersStore/Users.js';
import { Shared }         from './sharedStore/shared.js';
import { Categories }     from './categoriesStore/Categories.js';
import { SubCategories }  from './subcategoriesStore/SubCategories.js';
import { Products }       from './productsStore/Products.js';
import { Sliders }        from './slidersStore/Sliders.js';
import { Banner }         from './bannerStore/Banner.js';
import { Orders }         from './ordersStore/Orders.js';
import { OrdersState }    from './ordersStateStore/OrdersState.js';
import { Transactions }   from './transactionsStore/transactionsStore.js';

export const store = configureStore({
  reducer: {
    auth         : Auth.reducer,
    users        : Users.reducer,
    shared       : Shared.reducer,
    categories   : Categories.reducer,
    subcategories: SubCategories.reducer,
    products     : Products.reducer,
    sliders      : Sliders.reducer,
    banner       : Banner.reducer,
    orders       : Orders.reducer,
    ordersState  : OrdersState.reducer,
    transactions : Transactions.reducer
  },
});