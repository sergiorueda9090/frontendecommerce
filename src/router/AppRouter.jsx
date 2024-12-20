import { useSelector, useDispatch } from 'react-redux';
import { useEffect }                from 'react';
import { Routes, Route, Navigate }  from 'react-router-dom';
import { JournalPage }              from '../journal/pages/JournalPage';
import { UsersPage }                from '../users/pages/UsersPage';
import { CategoriesPage }           from '../categories/pages/CategoriesPage';
import { Page as Subcategories }    from '../subcategories/pages/Page';
import { Page as Brands }           from '../brands/pages/Page';
import { Page as Genders }           from '../genders/pages/Page';
//import { Page as Products }         from '../products/pages/Page';
import { Page as Sliders }          from '../sliders/pages/Page';
import { Page as Banner }           from '../banner/pages/Page';
import { Page as Feature }          from '../feature/pages/Page';
import { Page as Email }            from '../email/pages/Page';
import { Page as Telegram }         from '../telegram/pages/Page';

import { ProductsRoute }            from '../products/routes/ProductsRoute';
import { OrdersRoute }              from '../ordenes/routes/OrdenesRoute';
import { TransactionsRoute }        from '../transactions/routes/TransactionsRoute';
import { AuthRoutes }               from '../auth/routes/AuthRoutes';
import { WebRoute }                 from '../web/routes/ProductsRoute';
import { WhatsappRoute }            from '../whatsapp/routes/WhatsappRoute';

//EAAQEy0eZBcrYBO1FJ096N3VJHsl5BZAqCzjwaOWoZCb1ejfTaZBBJrBmic4QqZBrjQsgDMRSX5m7aqtTXYGJCzusZBwZA9MvghMyZCLTepZAM3xRlbCJ4oCy78ZCMJxIxqF1SPhNJnURiDbzn8AxeyqWu9GbiRSDGajH5hu2K07SFdBc7M2nibj1hqigZBCbcLV0Hg75gZDZD
export const AppRouter = () => {

    const { isLogin } = useSelector(state => state.auth);

    return (
      <Routes>
        {isLogin ? (
          <>
            <Route path="/"               element={<JournalPage />} />
            <Route path="/users"          element={<UsersPage />} />
            <Route path="/categories"     element={<CategoriesPage />} />
            <Route path="/subcategories"  element={<Subcategories />} />
            <Route path="/Brands"         element={<Brands />} />
            <Route path="/Genders"        element={<Genders />} />
            <Route path="/products/*"     element={<ProductsRoute />} />
            <Route path="/sliders"        element={<Sliders />} />
            <Route path="/banner"         element={<Banner />} />
            <Route path="/ordenes/*"      element={<OrdersRoute />} />
            <Route path="/transactions/*" element={<TransactionsRoute />} />
            <Route path="/web/*"          element={<WebRoute />} />
            <Route path="/feature"        element={<Feature />} />
            <Route path="/Email"          element={<Email />} />
            <Route path="/Whatsapp/*"       element={<WhatsappRoute />} />
            <Route path="/Telegram"       element={<Telegram />} />
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