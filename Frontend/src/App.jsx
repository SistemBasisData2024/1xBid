import React from "react";
<<<<<<< HEAD
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
=======

const App = () => {
  return (
    <div>
      <h1>React App</h1>
    </div>
>>>>>>> 8936e655b7fec74710da4b4ebf9f6363cae4a20d
  );
};

export default App;
