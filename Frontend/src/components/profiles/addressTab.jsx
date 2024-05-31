import { addAddressHandler, editAddressHandler } from "@/api/user.handler";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddressTab = ({ address }) => {
  const [addr, setAddr] = useState({
    address: "",
    postal_code: "",
    city: "",
    province: "",
  });
  const [isAddressModalOpen, setAddressModalOpen] = useState(false);
  const [addr_id, setAddrId] = useState("");

  const addNewAddressSubmit = async () => {
    const response = await addAddressHandler(
      addr.address,
      addr.postal_code,
      addr.city,
      addr.province
    );
    if (response) {
      toast.success("Address added successfully");
      window.location.reload();
    } else {
      toast.error("Failed to add address");
    }
  };

  const editAddressSubmit = async () => {
    const updatedAddr = { ...addr };
    for (const key in updatedAddr) {
      if (updatedAddr[key] === "") {
        delete updatedAddr[key];
      }
    }

    const response = await editAddressHandler(addr_id, updatedAddr.address, updatedAddr.postal_code, updatedAddr.city, updatedAddr.province);
    console.log(response);
    if (response) {
      toast.success("Address updated successfully");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      toast.error("Failed to update address");
    }
  };

  const handleAddClick = () => {
    setAddr({
      address: "",
      postal_code: "",
      city: "",
      province: "",
    });
    setAddrId("");
    setAddressModalOpen(true);
  };

  const handleEditClick = (addr) => {
    setAddr(addr);
    setAddrId(addr.address_id);
    setAddressModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addr_id) {
      editAddressSubmit();
    } else {
      addNewAddressSubmit();
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Address</h2>
      <button
        onClick={handleAddClick}
        className="mt-2 py-2 px-4 bg-green-500 text-white rounded"
      >
        Add Address
      </button>
      <div className="mt-2 space-y-2">
        {address.map((addr, index) => (
          <div
            key={index}
            className="p-4 bg-gray-200 rounded cursor-pointer"
            onClick={() => handleEditClick(addr)}
          >
            <p>
              {addr.address}, {addr.postal_code}, {addr.city}, {addr.province}
            </p>
          </div>
        ))}
      </div>

      {isAddressModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {addr_id ? "Edit Address" : "Add Address"}
            </h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-2">
                Address
                <input
                  type="text"
                  value={addr.address}
                  onChange={(e) =>
                    setAddr({ ...addr, address: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  required
                />
              </label>
              <label className="block mb-2">
                Postal Code
                <input
                  type="text"
                  value={addr.postal_code}
                  onChange={(e) =>
                    setAddr({ ...addr, postal_code: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  required
                />
              </label>
              <label className="block mb-2">
                City
                <input
                  type="text"
                  value={addr.city}
                  onChange={(e) =>
                    setAddr({ ...addr, city: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  required
                />
              </label>
              <label className="block mb-2">
                Province
                <input
                  type="text"
                  value={addr.province}
                  onChange={(e) =>
                    setAddr({ ...addr, province: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  required
                />
              </label>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setAddressModalOpen(false)}
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
  );
};

export default AddressTab;
