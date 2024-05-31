import { topUpSaldoHandler } from "@/api/user.handler";
import React, { useState } from "react";
import { toast } from "react-toastify";

const SaldoTab = ({ user }) => {
  const [saldo, setSaldo] = useState("");

  const topUpSubmit = async (e) => {
    e.preventDefault();
    if (!saldo) return toast.error("Saldo must be filled");
    if (saldo < 0) return toast.error("Saldo must be a positive number");
    
    const response = await topUpSaldoHandler(saldo);
    console.log(response);
    if (response) {
      toast.success("Saldo updated successfully");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      toast.error("Failed to update saldo");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Saldo</h2>
      <p className="text-lg">Total Saldo: {user.saldo}</p>
      <form onSubmit={topUpSubmit}>
        <label className="block mb-2">
          Amount
          <input
            type="number"
            className="mt-2 p-2 w-full border rounded"
            placeholder="Enter amount"
            value={saldo}
            onChange={(e) => setSaldo(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="mt-2 py-2 px-4 bg-blue-500 text-white rounded"
        >
          Top Up
        </button>
      </form>
    </div>
  );
};

export default SaldoTab;
