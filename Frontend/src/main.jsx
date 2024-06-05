import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/system";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/editshop",
    element: <EditShop />,
  },
  {
    path: "/addproduct",
    element: <AddProduct />,
  },
  {
    path: "/transaksi/:transaksi_id",
    element: <Payment />,
  },
  {
    path: "/onbid/:barang_id",
    element: <OnBid />,
  },
  {
    path: "/notfound",
    element: <NotFound />,
  },
  {
    path: "/:toko_id",
    element: <TokoDetails />,
  },
  {
    path: "/:toko_id/:barang_id",
    element: <Product />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/search/:searchQuery", 
    element: <Search />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <NavBar />
      <RouterProvider router={router} />
      <ToastContainer autoClose={3000} />
    </NextUIProvider>
  </React.StrictMode>
);
