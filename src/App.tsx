import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import Home from "./pages/Home";
import CardId from "./pages/CardId";
import Liked from "./pages/Liked";
import Basket from "./pages/Basket";
import Sign from "./pages/Sign";
import LoginForm from "./components/loginForm/LoginForm";
import RegistrationForm from "./components/loginForm/RegistrationForm";
import { checkAuth } from "./store/userSlice/userSlice";
import { useAppDispatch } from "./hooks/reduxHooks";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Layout />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Card" element={<CardId />} />
          <Route path="/Liked" element={<Liked />} />
          <Route path="/Basket" element={<Basket />} />
          <Route path="/Login" element={<Sign children={<LoginForm />} />} />
          <Route
            path="/Registration"
            element={<Sign children={<RegistrationForm />} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
