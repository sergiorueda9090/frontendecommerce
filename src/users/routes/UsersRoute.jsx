import { Route, Routes, Navigate } from "react-router-dom";
import { UsersPage }              from '../pages/UsersPage';

export const UsersRoute = () => {
  return (
    <Routes>
        <Route path="/users"     element={< UsersPage />} />
        <Route path="/*"         element={< Navigate to="/"/>} /> 
    </Routes>

  )
}
