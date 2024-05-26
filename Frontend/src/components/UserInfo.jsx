import React from "react";

const UserInfo = ({ user, onEdit }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">User Information</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Full Name: {user.fullname}</p>
      <p>Date of Birth: {user.dob}</p>
      <p>Phone: {user.phone}</p>
      <button
        className="mt-2 bg-blue-600 text-white py-1 px-3 rounded-lg hover:bg-blue-700"
        onClick={onEdit}
      >
        Edit Profile
      </button>
    </div>
  );
};

export default UserInfo;
