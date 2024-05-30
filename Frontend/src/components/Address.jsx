import React from "react";
import { Button } from "@/components/ui/button";

const Address = ({ address, onEdit }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Address</h2>
      <p>{address}</p>
      <Button className="mt-2" color="primary" onClick={onEdit}>
        Edit Address
      </Button>
    </div>
  );
};

export default Address;
