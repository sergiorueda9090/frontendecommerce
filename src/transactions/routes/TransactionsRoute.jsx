import { Route, Routes }   from "react-router-dom";
import { Page }            from '../pages/Page';
import { TransactionPage } from "../pages/TransactionPage";

export const TransactionsRoute = () => {

  return (
    <Routes>
        <Route path="/"        element={<Page />} />
        <Route path="page/:id" element={<TransactionPage />} />
    </Routes>

  )
}
