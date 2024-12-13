import { configureStore } from '@reduxjs/toolkit'
import { Auth }           from './authStore/Auth.js';
import { Users }          from './usersStore/Users.js';
import { Shared }         from './sharedStore/shared.js';
import { Categories }     from './categoriesStore/Categories.js';
import { SubCategories }  from './subcategoriesStore/SubCategories.js';
import { Brands }         from './brandsStore/Brands.js';
import { Products }       from './productsStore/Products.js';
import { Sliders }        from './slidersStore/Sliders.js';
import { Banner }         from './bannerStore/Banner.js';
import { Gender }         from './gendersStore/Gender.js';
import { Orders }         from './ordersStore/Orders.js';
import { OrdersState }    from './ordersStateStore/OrdersState.js';
import { Transactions }   from './transactionsStore/transactionsStore.js';
import { Feature }        from './featureStore/Feature.js';

export const store = configureStore({
  reducer: {
    auth         : Auth.reducer,
    users        : Users.reducer,
    shared       : Shared.reducer,
    categories   : Categories.reducer,
    subcategories: SubCategories.reducer,
    brands       : Brands.reducer,
    gender       : Gender.reducer,
    products     : Products.reducer,
    sliders      : Sliders.reducer,
    banner       : Banner.reducer,
    orders       : Orders.reducer,
    ordersState  : OrdersState.reducer,
    transactions : Transactions.reducer,
    feature      : Feature.reducer
  },
});