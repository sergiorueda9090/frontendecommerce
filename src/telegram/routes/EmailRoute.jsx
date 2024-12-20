import { Route, Routes, Navigate } from "react-router-dom";
import { Page }                    from '../pages/Page';

export const WhatsappRoute = () => {
  return (
    <Routes>
        <Route path="/"  element={< Page />} />
    </Routes>

  )
}
