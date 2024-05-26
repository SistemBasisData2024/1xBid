import React, { useState } from "react";

const Balance = ({ balance, onTopUp }) => {
  const [amount, setAmount] = useState("");

  const handleTopUp = () => {
    onTopUp(amount);
    setAmount("");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Balance</h2>
      <p>Current Balance: ${balance.toFixed(2)}</p>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="input input-bordered w-full max-w-xs"
      />
      <button
        className="mt-2 bg-blue-600 text-white py-1 px-3 rounded-lg hover:bg-blue-700"
        onClick={handleTopUp}
      >
        Top Up
      </button>
    </div>
  );
};

export default Balance;
