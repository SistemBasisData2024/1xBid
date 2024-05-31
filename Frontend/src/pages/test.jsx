import React, { useState, useEffect } from "react";
import { getUserHandler } from "@/api/user.handler";
import { toast, ToastContainer } from "react-toastify";
import ProfileTab from "@/components/profiles/profileTab";
import AddressTab from "@/components/profiles/addressTab";
import SaldoTab from "@/components/profiles/saldoTab";
import Navbar from "@/components/navbar";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "profile"
  );
  const [user, setUser] = useState({});
  const [address, setAddress] = useState([]);

  useEffect(() => {
    const lastActiveTab = localStorage.getItem("activeTab");
    if (lastActiveTab) {
      setActiveTab(lastActiveTab);
    }
    const fetchUser = async () => {
      const response = await getUserHandler();
      if (response) {
        response.user.date_of_birth = new Date(
          response.user.date_of_birth
        ).toLocaleDateString();
        setUser(response.user);
        setAddress(response.address);
      } else {
        toast.error("Failed to fetch user data");
      }
    };
    fetchUser();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

  return (
    <div className="p-4">
      <Navbar />
      <div className="flex mt-16 bg-white">
        <img
          src="profile.jpg"
          alt="Profile"
          className="w-32 h-32 rounded-full border-2 border-blue-500"
        />
        <div className="ml-4">
          <h1 className="text-2xl font-bold text-blue-500">{user.fullname}</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex space-x-4">
          <button
            onClick={() => handleTabClick("profile")}
            className={`py-2 px-4 ${
              activeTab === "profile" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            User Profile
          </button>
          <button
            onClick={() => handleTabClick("address")}
            className={`py-2 px-4 ${
              activeTab === "address" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            Address
          </button>
          <button
            onClick={() => handleTabClick("saldo")}
            className={`py-2 px-4 ${
              activeTab === "saldo" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            Saldo
          </button>
        </div>

        <div className="mt-4">
          {activeTab === "profile" && <ProfileTab user={user} />}
          {activeTab === "address" && <AddressTab address={address} />}
          {activeTab === "saldo" && <SaldoTab user={user} />}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProfilePage;
