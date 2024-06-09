import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getTransaksiHandler } from "@/api/transaksi.handler";
import { useNavigate } from "react-router-dom";

const HistoryTab = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getTransaksiHandler();
        if (response && response.data) {
          setTransactions(response.data);
        } else {
          console.log("Failed to fetch transaction data");
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []); // Add dependency array to prevent infinite loop

  return (
    <Card className="rounded-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell className="font-bold">Product</TableCell>
                <TableCell className="font-bold">Final Price</TableCell>
                <TableCell className="font-bold">Store</TableCell>
                <TableCell className="font-bold">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{transaction?.barang?.nama_barang}</TableCell>
                  <TableCell>{transaction?.barang?.last_price}</TableCell>
                  <TableCell>{transaction?.toko?.nama_toko}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <span className="material-icons hover:bg-gray-100 hover:shadow-lg hover:cursor-pointer p-2 rounded-lg">
                          more_vert
                        </span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={(event) => {
                            event.stopPropagation();
                            navigate(`/transaksi/${transaction?.transaksi?.transaksi_id}`);
                          }}
                        >
                          Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No transactions found.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default HistoryTab;
