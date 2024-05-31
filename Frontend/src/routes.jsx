import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserProfile from "./components/UserProfile";
import Product from "./pages/Product";
import Store from "./pages/Store";
import Search from "./pages/Search";
import TokoDetails from './pages/TokoDetails';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/user/settings" element={<UserProfile />} />
      <Route path="/product/:productId" element={<Product />} />
      <Route path="/store/:id" element={<Store />} />
      <Route path="/search" element={<Search />} />
      <Route path="/tokodetails" element={<TokoDetails />} /> 
    </Routes>
  </Router>
);

export default AppRoutes;
