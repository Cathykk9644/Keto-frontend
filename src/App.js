import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AddNewMeal from "./pages/AddNewMeal";
import Orders from "./components/Orders";
import Profile from "./components/Profile";
import Loading from "./components/Loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaymentSuccess from "./pages/PaymentSuccess";

const App = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [location]);

  return (
    <div className="font-titleFont">
      {loading && <Loading />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addmeal" element={<AddNewMeal />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />{" "}
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
      </Routes>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default App;
