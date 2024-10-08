import { useSelector, useDispatch } from 'react-redux';
import { useEffect }                from 'react';
import { Routes, Route, Navigate }  from 'react-router-dom';
import { JournalPage }              from '../journal/pages/JournalPage';
import { UsersPage }                from '../users/pages/UsersPage';
import { CategoriesPage }           from '../categories/pages/CategoriesPage';
import { Page as Subcategories }    from '../subcategories/pages/Page';
import { Page as Products }         from '../products/pages/Page';
import { Page as Sliders }          from '../sliders/pages/Page';
import { Page as Banner }           from '../banner/pages/Page';
import { OrdersRoute }              from '../ordenes/routes/OrdenesRoute';
import { TransactionsRoute }        from '../transactions/routes/TransactionsRoute';
import { AuthRoutes }               from '../auth/routes/AuthRoutes';
import { getLoginSuccess }          from '../store/authStore/authThunks';           // Your action to get login success

export const AppRouter = () => {

    const { isLogin } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    
    useEffect(() => {
        const callMyFunction = async () => {
            await dispatch(getLoginSuccess());
        }
        callMyFunction();
    }, [dispatch]);
    
    return (
      <Routes>
        {isLogin ? (
          <>
            <Route path="/"               element={<JournalPage />} />
            <Route path="/users"          element={<UsersPage />} />
            <Route path="/categories"     element={<CategoriesPage />} />
            <Route path="/subcategories"  element={<Subcategories />} />
            <Route path="/products"       element={<Products />} />
            <Route path="/sliders"        element={<Sliders />} />
            <Route path="/banner"         element={<Banner />} />
            <Route path="/ordenes/*"      element={<OrdersRoute />} />
            <Route path="/transactions/*" element={<TransactionsRoute />} />
            <Route path="*"               element={<Navigate to="/" />} /> 
          </>
        ) : (
          <>
            <Route path="/auth/*" element={<AuthRoutes />} />
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </>
        )}
      </Routes>
    );
};