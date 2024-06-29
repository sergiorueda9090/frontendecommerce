import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPages, RegisterPage } from "../pages"


export const AuthRoutes = () => {
  return (
        <Routes>
            <Route path="login"     element={ <LoginPages /> }/>
            <Route path="register"  element={ <RegisterPage /> }/>
            <Route path="*"         element={ <Navigate  to="/auth/login" /> } />
        </Routes>
  )
}
