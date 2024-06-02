import React, { useState, useEffect } from "react";
import { getUserHandler } from "@/api/user.handler";
import ProfileTab from "@/components/profiles/profileTab";
import AddressTab from "@/components/profiles/addressTab";
import SaldoTab from "@/components/profiles/saldoTab";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "profile"
  );
  const [user, setUser] = useState({});
  const [userAvatar, setUserAvatar] = useState("");
  const [address, setAddress] = useState([]);
  const [toko, setTokos] = useState({});
  const navigate = useNavigate();

  const getAvatar = async (fullname) => {
    if (fullname) {
      const response = await fetch(
        "https://ui-avatars.com/api/?name=" + fullname.replace(" ", "+")
      );
      const avatarUrl = await response.url;
      return avatarUrl;
    } else {
      return "https://img.icons8.com/?size=100&id=99268&format=png&color=000000";
    }
  };

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
        if (response.toko) setTokos(response.toko);

        const avatarUrl = await getAvatar(user.fullname);
        setUserAvatar(avatarUrl);
      } else {
        window.location.href = "/login";
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
      <div className="flex justify-between items-center mt-16">
        <div className="flex items-center">
          <img
            src={userAvatar}
            className="w-32 h-32 rounded-full border-2 border-blue-500"
          />
          <div className="ml-4">
            <h1 className="text-2xl font-bold text-blue-500">
              {user.fullname}
            </h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <a href="/logout">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </a>
          <a href={toko.toko_id || "/open-toko"}>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              {toko.toko_id ? "My Toko" : "Open Toko"}
            </button>
          </a>
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
    </div>
  );
};

export default ProfilePage;
