import { Route, Routes, Navigate }  from "react-router-dom";
import { JournalPage }              from '../pages/JournalPage';
import { UsersPage }                from '../../users/pages/UsersPage';
import { CategoriesPage }           from "../../categories/pages/CategoriesPage";
import { Page as Subcategories }    from "../../subcategories/pages/Page";

export const JournalRoute = () => {
  return (
    <Routes>
        <Route path="/"              element={< JournalPage />} />
        <Route path="/users"         element={ <UsersPage /> }/>
        <Route path="/categories"    element={ <CategoriesPage /> }/>
        <Route path="/subcategories" element={ <Subcategories /> } />
        <Route path="/*"             element={< Navigate to="/"/>} /> 
    </Routes>
  )
}
