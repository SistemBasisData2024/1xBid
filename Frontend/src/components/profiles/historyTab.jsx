import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const HistoryTab = () => {
  //   const [transactions, setTransactions] = useState([]);

  //   useEffect(() => {
  //     // Fetch transaction data from your API and set it to state
  //     const fetchTransactions = async () => {
  //       // endpoint
  //       const response = await fetch("/api/transactions");
  //       const data = await response.json();
  //       setTransactions(data);
  //     };

  //     fetchTransactions();
  //   }, []);

  const transactions = [
    {
      itemName: "Laptop",
      amount: "Rp. 15.000.000",
      shopName: "Toko Elektronik",
    },
    {
      itemName: "Smartphone",
      amount: "Rp. 10.000.000",
      shopName: "Toko Handphone",
    },
    { itemName: "Headphone", amount: "Rp. 1.500.000", shopName: "Toko Musik" },
  ];

  return (
    <Card className="rounded-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className="font-bold">Product</TableCell>
              <TableCell className="font-bold">Final Price</TableCell>
              <TableCell className="font-bold">Store</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>{transaction.itemName}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.shopName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default HistoryTab;
