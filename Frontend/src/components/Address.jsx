import React from "react";
import { Button } from "@/components/ui/button";

const Address = ({ address, onEdit }) => {
  return (
    <div>
      <p>
        <strong>Address:</strong> {address}
      </p>
      <Button onClick={onEdit} className="mt-4" color="primary">
        Edit Address
      </Button>
    </div>
  );
};

export default Address;
