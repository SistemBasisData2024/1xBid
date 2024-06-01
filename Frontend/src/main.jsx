import React from "react";
import ReactDOM from "react-dom/client";
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
import Product from "./pages/Product";

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
  // {
  //   path: "/test",
  //   element: <ProfilePage />,
  // },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/storedetails",
    element: <TokoDetails />,
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
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/product",
    element: <Product />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="p-4">
      <NavBar />
      <RouterProvider router={router} />
    </div>
    <ToastContainer autoClose={3000} />
  </React.StrictMode>
);
