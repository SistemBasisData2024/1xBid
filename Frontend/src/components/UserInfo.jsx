import React from "react";
import { Button } from "@/components/ui/button";

const UserInfo = ({ user, onEdit }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold mb-2">User Information</h2>
      <div className="flex flex-col space-y-2">
        <p className="flex">
          <span className="w-1/4 font-semibold">Fullname</span>
          <span>:&nbsp;</span>
          <span>{user.fullname}</span>
        </p>
        <p className="flex">
          <span className="w-1/4 font-semibold">Username</span>
          <span>:&nbsp;</span>
          <span>{user.username}</span>
        </p>
        <p className="flex">
          <span className="w-1/4 font-semibold">Email</span>
          <span>:&nbsp;</span>
          <span>{user.email}</span>
        </p>
        <p className="flex">
          <span className="w-1/4 font-semibold">Date of Birth</span>
          <span>:&nbsp;</span>
          <span>{formatDate(user.date_of_birth)}</span>
        </p>
        <p className="flex">
          <span className="w-1/4 font-semibold">Phone</span>
          <span>:&nbsp;</span>
          <span>{user.phone_number}</span>
        </p>
      </div>
      <Button onClick={onEdit} className="mt-4" color="primary">
        Edit Profile
      </Button>
    </div>
  );
};

export default UserInfo;
