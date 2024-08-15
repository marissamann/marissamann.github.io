import React from "react";
import { Route, Routes } from "react-router-dom";
import Records from "./components/records.js";
import SessionRegister from "./components/session_register.js"
import SessionLogin from "./components/session_login.js"
import SessionLogout from "./components/session_logout.js"
import AccountSummary from "./components/account_summary.js";
import Balances from "./components/balances.js";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Records />} />
        <Route path="/session_register" element={<SessionRegister />} />
        <Route path="/session_login" element={<SessionLogin />} />
        <Route path="/session_logout" element={<SessionLogout />} />
        <Route path="/account_summary/:email" element={<AccountSummary />} />
        <Route path="/balances/:email" element={<Balances />} />
      </Routes>
    </div>
  );
}
export default App;

