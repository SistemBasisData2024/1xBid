import React from "react";
import { Button } from "@/components/ui/button";

const UserInfo = ({ user, onEdit }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">User Information</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Full Name: {user.fullname}</p>
      <p>Date of Birth: {user.dob}</p>
      <p>Phone: {user.phone}</p>
      <Button onClick={onEdit} className="mt-4" color="primary">
        Edit Profile
      </Button>
    </div>
  );
};

export default UserInfo;
