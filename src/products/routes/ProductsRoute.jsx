import { Route, Routes, Navigate } from "react-router-dom";
import { Page }                    from '../pages/Page';

export const ProductsRoute = () => {
  return (
    <Routes>
        <Route path="/products" element={< Page />} />
        <Route path="/*"        element={< Navigate to="/"/>} /> 
    </Routes>

  )
}
