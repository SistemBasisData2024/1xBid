import { logoutHandler } from "@/api/auth.handler";
import React, { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    const logout = async () => {
        const response = await logoutHandler();
        if(response.message === 'Logout successfully') {
            localStorage.removeItem('token');
            window.location.href = '/';
        } else {
            console.error(response.message);
        }
    }
    logout();
  });
    return (
    <div>
      <h1>Logout Page</h1>
    </div>
  );
};

export default Logout;
