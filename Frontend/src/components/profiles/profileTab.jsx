import React, { useState } from "react";
import { updateUserHandler } from "@/api/user.handler";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "react-toastify";

const ProfileTab = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEdited, setUserEdited] = useState({
    username: "",
    email: "",
    fullname: "",
    phone_number: "",
    password: "",
  });

  const editUserSubmit = async () => {
    const updatedUser = { ...userEdited };
    for (const key in updatedUser) {
      if (updatedUser[key] === "") {
        delete updatedUser[key];
      }
    }

    const response = await updateUserHandler(updatedUser);
    console.log(response);
    if (response) {
      toast.success("User updated successfully");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      toast.error("Failed to update user");
    }
  };

  return (
    <Card className="p-6 shadow-lg rounded-lg bg-white">
      <div>
        <h2 className="text-xl font-bold">User Profile</h2>
        <div className="flex flex-col space-y-2">
          <p className="flex">
            <span className="w-1/6 font-semibold">Fullname</span>
            <span>:&nbsp;</span>
            <span>{user.fullname}</span>
          </p>
          <p className="flex">
            <span className="w-1/6 font-semibold">Username</span>
            <span>:&nbsp;</span>
            <span>{user.username}</span>
          </p>
          <p className="flex">
            <span className="w-1/6 font-semibold">Email</span>
            <span>:&nbsp;</span>
            <span>{user.email}</span>
          </p>
          <p className="flex">
            <span className="w-1/6 font-semibold">Date of Birth</span>
            <span>:&nbsp;</span>
            <span>{user.date_of_birth}</span>
          </p>
          <p className="flex">
            <span className="w-1/6 font-semibold">Phone</span>
            <span>:&nbsp;</span>
            <span>{user.phone_number}</span>
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="mt-2"
          color="blue"
          rounded
        >
          Edit User Profile
        </Button>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit User Profile</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  editUserSubmit();
                }}
              >
                <label className="block mb-2">
                  Username
                  <input
                    type="text"
                    value={userEdited.username}
                    onChange={(e) =>
                      setUserEdited({ ...userEdited, username: e.target.value })
                    }
                    placeholder={user.username || "Username"}
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                  />
                </label>
                <label className="block mb-2">
                  Email
                  <input
                    type="email"
                    value={userEdited.email}
                    onChange={(e) =>
                      setUserEdited({ ...userEdited, email: e.target.value })
                    }
                    placeholder={user.email || "Email"}
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                  />
                </label>
                <label className="block mb-2">
                  Full Name
                  <input
                    type="text"
                    value={userEdited.fullname}
                    onChange={(e) =>
                      setUserEdited({ ...userEdited, fullname: e.target.value })
                    }
                    placeholder={user.fullname || "Full Name"}
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                  />
                </label>
                <label className="block mb-2">
                  Phone Number
                  <input
                    type="text"
                    value={userEdited.phone_number}
                    onChange={(e) =>
                      setUserEdited({
                        ...userEdited,
                        phone_number: e.target.value,
                      })
                    }
                    placeholder={user.phone_number || "Phone Number"}
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                  />
                </label>
                <label className="block mb-2">
                  Password
                  <input
                    type="password"
                    value={userEdited.password}
                    onChange={(e) =>
                      setUserEdited({ ...userEdited, password: e.target.value })
                    }
                    placeholder="Password"
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                  />
                </label>
                <div className="flex justify-end mt-4">
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-2"
                    color="blue"
                    rounded
                  >
                    Save
                  </Button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="ml-2 py-2 px-4 bg-gray-500 text-white rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProfileTab;
