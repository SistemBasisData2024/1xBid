import React, { useState, useEffect } from "react";
import { getUserHandler } from "@/api/user.handler";
import ProfileTab from "@/components/profiles/profileTab";
import AddressTab from "@/components/profiles/addressTab";
import SaldoTab from "@/components/profiles/saldoTab";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "profile"
  );
  const [isModalOpen, setModalOpen] = useState(false);
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
      console.log(response);
      if (response) {
        response.user.date_of_birth = new Date(
          response.user.date_of_birth
        ).toLocaleDateString();
        setUser(response.user);
        setAddress(response.address);

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

  const handleEditChange = (e) => {
    const { name, value } = e.target;
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Handle submit logic for editing shop
    setEditModalOpen(false);
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
          <button
            type="submit"
            onClick={() => {
              if (toko.toko_id) {
                navigate(`/shop/${toko.toko_id}`);
              } else {
                setModalOpen(true);
              }
            }}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            {toko.toko_id ? "My Toko" : "Open Toko"}
          </button>
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <section className="min-h-screen flex items-center justify-center">
            <Card className="mx-auto max-w-md">
              <CardHeader>
                <CardTitle className="text-xl">Edit Shop</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleEditSubmit}>
                  <div>
                    <Label htmlFor="nama_toko">Nama Toko</Label>
                    <Input
                      type="text"
                      name="nama_toko"
                      id="nama_toko"
                      // value={editData.nama_toko}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="deskripsi">Deskripsi</Label>
                    <textarea
                      name="deskripsi"
                      id="deskripsi"
                      // value={editData.deskripsi}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="toko_picture">Toko Picture URL</Label>
                    <Input
                      type="text"
                      name="toko_picture"
                      id="toko_picture"
                      // value={editData.toko_picture}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
