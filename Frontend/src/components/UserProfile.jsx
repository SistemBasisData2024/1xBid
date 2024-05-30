import React, { useEffect, useState } from "react";
import UserInfo from "./UserInfo";
import Address from "./Address";
import Balance from "./Balance";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import {
//   getUserHandler,
//   updateUserHandler,
//   addAddressHandler,
//   editAddressHandler,
//   topUpSaldoHandler,
//   openTokoHandler,
// } from "@/api/user.handler";

// const UserProfile = () => {
//   const [user, setUser] = useState({
//     username: "",
//     email: "",
//     fullname: "",
//     dob: "",
//     phone: "",
//     address: "",
//     balance: 0.0,
//   });

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const data = await getUserHandler();
//       if (data) {
//         setUser(data);
//       } else {
//         toast.error("Failed to fetch user data");
//       }
//     };
//     fetchUserData();
//   }, []);

//   const handleEditProfile = async (updatedUser) => {
//     const response = await updateUserHandler(updatedUser);
//     if (response) {
//       setUser(response);
//       toast.success("Profile updated successfully");
//     } else {
//       toast.error("Failed to update profile");
//     }
//   };

//   const handleEditAddress = async (newAddress) => {
//     const response = await editAddressHandler(newAddress);
//     if (response) {
//       setUser((prevState) => ({ ...prevState, address: response.address }));
//       toast.success("Address updated successfully");
//     } else {
//       toast.error("Failed to update address");
//     }
//   };

//   const handleTopUp = async (amount) => {
//     const response = await topUpSaldoHandler(amount);
//     if (response) {
//       setUser((prevState) => ({
//         ...prevState,
//         balance: prevState.balance + parseFloat(amount),
//       }));
//       toast.success("Balance topped up successfully");
//     } else {
//       toast.error("Failed to top up balance");
//     }
//   };

//   const handleOpenStore = async () => {
//     const storeData = { nama_toko: "My Store", toko_description: "Best store" };
//     const response = await openTokoHandler(storeData);
//     if (response) {
//       toast.success("Store opened successfully");
//     } else {
//       toast.error("Failed to open store");
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
//     <ToastContainer />
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       <Card className="p-6 shadow-lg rounded-lg bg-white">
//         <h1 className="text-2xl font-bold mb-4 text-gray-700">
//           User Profile
//         </h1>
//         <UserInfo user={user} onEdit={handleEditProfile} />
//       </Card>
//       <Card className="p-6 shadow-lg rounded-lg bg-white">
//         <Address address={user.address} onEdit={handleEditAddress} />
//       </Card>
//       <Card className="p-6 shadow-lg rounded-lg bg-white">
//         <Balance balance={user.balance} onTopUp={handleTopUp} />
//       </Card>
//     </div>
//     <div className="flex justify-center mt-6">
//       <Button className="mt-4" color="primary">
//         Open Store
//       </Button>
//     </div>
//   </div>
// );

// export default UserProfile;

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

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserHandler();
      if (data) setUser(data);
    };
    fetchUserData();
  }, []);

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

  const handleAddAddress = () => {
    toast.info("Add Address Clicked");
    // Handle add address logic here
    // For now, let's assume it's implemented in addAddressHandler
    addAddressHandler();
  };

  const handleTopUp = (amount) => {
    setUser((prevState) => ({
      ...prevState,
      balance: prevState.balance + parseFloat(amount),
    }));
  };

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 shadow-lg rounded-lg bg-white">
          <h1 className="text-2xl font-bold mb-4 text-gray-700">
            User Profile
          </h1>
          <UserInfo user={user} onEdit={handleEditProfile} />
        </Card>
        <Card className="p-6 shadow-lg rounded-lg bg-white">
          <Address address={user.address} onEdit={handleEditAddress} />
        </Card>
        <Card className="p-6 shadow-lg rounded-lg bg-white">
          <Balance balance={user.balance} onTopUp={handleTopUp} />
        </Card>
      </div>
      <div className="flex justify-center mt-6">
        <Button className="mt-4" color="primary">
          Open Store
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
