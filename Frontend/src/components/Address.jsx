import React from "react";

const Address = ({ address, onEdit }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Address</h2>
      <p>{address}</p>
      <button
        className="mt-2 bg-blue-600 text-white py-1 px-3 rounded-lg hover:bg-blue-700"
        onClick={onEdit}
      >
        Edit Address
      </button>
    </div>
  );
};

export default Address;
