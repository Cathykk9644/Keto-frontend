import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccout";
import SetProfile from "./pages/SetProfile";

const App = () => {
  return (
    <div className="font-titleFont">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/setprofile" element={<SetProfile />} />
      </Routes>
    </div>
  );
};

export default App;
