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
import EditShop from './pages/EditShop';
import AddProduct from './pages/AddProduct';
import Payment from './pages/Payment';

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
      <Route path="/storedetails" element={<TokoDetails />} /> 
      <Route path="/editshop" element={<EditShop />} /> 
      <Route path="/addproduct" element={<AddProduct />} /> 
      <Route path="/payment" element={<Payment />} /> 
    </Routes>
  </Router>
);

// buat payment, storedetails, editshop, addproduct blm di tambahin /:id
export default AppRoutes;
