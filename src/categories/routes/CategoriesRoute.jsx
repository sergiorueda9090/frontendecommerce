import { Route, Routes, Navigate } from "react-router-dom";
import { CategoriesPage }              from '../pages/CategoriesPage';

export const CategoriesRoute = () => {
  return (
    <Routes>
        <Route path="/categories" element={< CategoriesPage />} />
        <Route path="/*"          element={< Navigate to="/"/>} /> 
    </Routes>

  )
}
