import React, { useEffect, useState } from "react";
import UserInfo from "./UserInfo";
import Address from "./Address";
import Balance from "./Balance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const UserProfile = () => {
  const [profile, setProfile] = useState("");

  /*useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get("http://localhost:5000/user/profile");
        setProfile(data.data.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);*/

  const [user, setUser] = useState({
    username: setProfile.username,
    email: "john@example.com",
    fullname: "John Doe",
    dob: "1990-01-01",
    phone: "123456789",
    address: "123 Main St, Anytown, USA",
    balance: 100.0,
  });

  const handleEditProfile = () => {
    toast.info("Edit Profile Clicked");
    // Handle edit profile logic here
  };

  const handleEditAddress = () => {
    toast.info("Edit Address Clicked");
    // Handle edit address logic here
  };

  const handleTopUp = (amount) => {
    setUser((prevState) => ({
      ...prevState,
      balance: prevState.balance + parseFloat(amount),
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">User Profile</h1>
          <UserInfo user={user} onEdit={handleEditProfile} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 mt-4">
          <Address address={user.address} onEdit={handleEditAddress} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 mt-4">
          <Balance balance={user.balance} onTopUp={handleTopUp} />
        </div>
        <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          Open Store
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
