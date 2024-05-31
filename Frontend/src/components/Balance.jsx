import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Balance = ({ balance, onTopUp }) => {
  const [amount, setAmount] = useState("");

  const handleTopUp = () => {
    onTopUp(amount);
    setAmount("");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Balance</h2>
      {/* <p>Current Balance: ${balance.toFixed(2)}</p> */}
      <Input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="w-full max-w-xs"
      />
      <Button className="mt-2" color="primary" onClick={handleTopUp}>
        Top Up
      </Button>
    </div>
  );
};

export default Balance;
