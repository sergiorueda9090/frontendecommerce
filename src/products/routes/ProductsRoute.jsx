import { Route, Routes, Navigate } from "react-router-dom";
import { Page }                    from '../pages/Page';
import { ProductCreate }           from "../pages/ProductCreate";
import { ProductShow }             from "../pages/ProductShow";

export const ProductsRoute = () => {
  return (
    <Routes>
        <Route path="/"                element={< Page />} />
        <Route path="createproduct"    element={<ProductCreate />} />
        <Route path="showproduct/:id"  element={<ProductShow />} />
    </Routes>

  )
}
