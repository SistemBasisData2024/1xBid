import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Signup from './pages/Signup';
import Login from './pages/Login';
import TokoDetails from './pages/TokoDetails';
import { useEffect } from "react";
import axios from "axios";

const App = () => {


  return (
    <Router>
      <Routes>
        <Route path="/" />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/tokodetails" element={<TokoDetails />} /> 
      </Routes>
    </Router>
  );
};

export default App;
