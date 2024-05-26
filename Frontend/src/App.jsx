import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import axios from "axios";

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = "ten";
        const password = "ten123";
        const response = await axios.post("http://localhost:5000/auth/login", {
          username,
          password,
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  });

  return (
    <Router>
      <Routes>
        <Route path="/" />
        <Route path="/profile" element={<Profile />} />
        {/* Tambahkan rute lainnya di sini */}
      </Routes>
    </Router>
  );
};

export default App;
