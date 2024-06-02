import React, { useState, useEffect } from "react";
import { getUserHandler } from "@/api/user.handler";
import ProfileTab from "@/components/profiles/profileTab";
import AddressTab from "@/components/profiles/addressTab";
import SaldoTab from "@/components/profiles/saldoTab";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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

        const avatarUrl = await getAvatar(response.user.fullname);
        setUserAvatar(avatarUrl);
      } else {
        window.location.href = "/login";
      }
    };
    fetchUser();
  }, []);

  const handleTabChange = (tab) => {
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
            alt="User Avatar"
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
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="profile">User Profile</TabsTrigger>
            <TabsTrigger value="address">Address</TabsTrigger>
            <TabsTrigger value="saldo">Saldo</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileTab user={user} />
          </TabsContent>

          <TabsContent value="address">
            <AddressTab address={address} />
          </TabsContent>

          <TabsContent value="saldo">
            <SaldoTab user={user} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
