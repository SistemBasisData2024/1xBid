import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/system";
import "./index.css";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Signup";
import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import { ToastContainer } from "react-toastify";
import Logout from "./pages/logout";
import NavBar from "./components/navbar";
import TokoDetails from "./pages/TokoDetails";
import EditShop from "./pages/EditShop";
import AddProduct from "./pages/AddProduct";
import Payment from "./pages/Payment";
import OnBid from "./pages/OnBid";
import NotFound from "./pages/PageNotFound";
import Product from "./pages/Product";
import Search from "./pages/Search";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/editshop" element={<EditShop />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/transaksi/:transaksi_id" element={<Payment />} />
          <Route path="/onbid/:barang_id" element={<OnBid />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/:toko_id" element={<TokoDetails />} />
          <Route path="/:toko_id/:barang_id" element={<Product />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer autoClose={3000} />
    </NextUIProvider>
  </React.StrictMode>
);
