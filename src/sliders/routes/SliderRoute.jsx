import { Route, Routes, Navigate } from "react-router-dom";
import { Page }          from '../pages/Page';

export const SubCategoriesRoute = () => {
  return (
    <Routes>
        <Route path="/subcategories" element={< Page />} />
        <Route path="/*"             element={< Navigate to="/"/>} /> 
    </Routes>

  )
}
