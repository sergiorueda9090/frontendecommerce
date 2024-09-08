import { Route, Routes, Navigate } from "react-router-dom";
import { Order }          from '../pages/Order';
import { Page }          from '../pages/Page';

export const OrdersRoute = () => {
  return (
    <Routes>
        <Route path="/"        element={<Page />} />
        <Route path="page/:id" element={<Order />} />
       {/*<Route path="*"      element={<Navigate to="/" />} />*/}
    </Routes>
  )
}