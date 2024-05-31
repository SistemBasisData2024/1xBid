import React from "react";
import { Button } from "@/components/ui/button";

const Address = ({ address, onEdit }) => {
  return (
    <div className="card">
      <div className="card-body">
        <p>{address.address}, {address.postal_code}, {address.city}, {address.province}</p>
      </div>
      <Button onClick={onEdit} className="mt-4" color="primary">
        Edit Address
      </Button>
    </div>
  );
};

export default Address;
