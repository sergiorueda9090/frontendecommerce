import { Route, Routes, Navigate }  from "react-router-dom";
import { Page }                     from '../pages/Page';
import { PageConfigTemplate }       from "../pages/PageConfigTemplate";
import { PageCreateTemplate }       from "../pages/PageCreateTemplate";


export const WhatsappRoute = () => {
  return (
    <Routes>
        <Route path="/"               element={< Page />} />
        <Route path="configtemplate"  element={< PageConfigTemplate />} />
        <Route path="createtemplate"  element={< PageCreateTemplate />} />
    </Routes>

  )
}
