import { topUpSaldoHandler } from "@/api/user.handler";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const SaldoTab = ({ user }) => {
  const [saldo, setSaldo] = useState("");
  const [saldoText, setSaldoText] = useState("");

  const topUpSubmit = async (e) => {
    e.preventDefault();
    if (!saldo) return toast.error("Saldo must be filled");
    if (saldo < 0) return toast.error("Saldo must be a positive number");

    const response = await topUpSaldoHandler(saldo);
    if (response) {
      toast.success("Saldo updated successfully");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      toast.error("Failed to update saldo");
    }
  };

  useEffect(() => {
    if (user.saldo < 0) {
      setSaldoText("Rp 0");
    } else {
      setSaldoText(`Rp ${user?.saldo?.toLocaleString("id-ID")},00`);
    }
  });

  return (
    <Card className="p-6 shadow-lg rounded-lg bg-white">
      <div>
        <h2 className="text-xl font-bold">Saldo</h2>
        <p className="text-lg">{saldoText}</p>
        <form onSubmit={topUpSubmit}>
          <label className="block mb-2">
            Amount
            <input
              type="text"
              className="mt-2 p-2 w-full border rounded"
              placeholder="Enter amount"
              value={`Rp ${saldo.toLocaleString("id-ID")}`}
              onChange={(e) => {
                const value = parseInt(
                  e.target.value.replace(/[^0-9]/g, ""),
                  10
                );
                setSaldo(isNaN(value) ? "" : value);
              }}
              required
            />
          </label>
          <Button className="mt-2 py-2 px-4 bg-black text-white rounded">
            Top Up
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default SaldoTab;
