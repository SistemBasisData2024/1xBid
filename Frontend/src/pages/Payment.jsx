import React, { useEffect, useState } from "react";
import { CreditCard, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useParams } from "react-router-dom";
import { getTransaksiDetailHandler } from "@/api/transaksi.handler";
import { toast } from "react-toastify";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Payment = () => {
  const { transaksi_id } = useParams();
  const [transaksi, setTransaksi] = useState({});

  const navigate = useNavigate();

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

    const pembeli = {
        nama: "Nama Panjang Banget",
        email: "darren06nb@gmail.com",
        phone_number: "0877123123",
        saldo: "$1000.00",
        addresses: [
            {
                address: "123 Main St",
                city: "Jakarta",
                province: "DKI Jakarta",
                postal_code: "12345",
                chosen: true,
            },
            {
                address: "456 Elm St",
                city: "Bandung",
                province: "West Java",
                postal_code: "67890",
                chosen: false,
            },
            {
                address: "789 Kutek",
                city: "Depok",
                province: "West Java",
                postal_code: "88888",
                chosen: false,
            },
        ],
    };

    const barang = [
        { nama_barang: "Barang 1", harga_awal: "$500.00" },
    ];

    const [selectedAddress, setSelectedAddress] = useState(pembeli.addresses.find(addr => addr.chosen).address);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const handleMakePaymentClick = () => {
        setIsConfirmOpen(true);
    };

    const handleCloseModal = () => {
        setIsConfirmOpen(false);
    };

    return (
        <>
            <div className="flex justify-center items-center min-h-screen">
            <Card className="h-full w-1/2 relative overflow-hidden">
                    <CardHeader className="flex flex-row items-start bg-muted/50">
                        <div className="grid gap-0.5">
                            <CardTitle className="group flex items-center gap-2 text-lg">
                                Payment for Bid Winner
                            </CardTitle>
                            <CardDescription>Date: {currentDate}</CardDescription>
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button size="sm" variant="outline" className="h-8 gap-1">
                                        <Truck className="h-3.5 w-3.5" />
                                        <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                                            Select Address
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>Select Address</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {pembeli.addresses.map((address, index) => (
                                        <DropdownMenuCheckboxItem
                                            key={index}
                                            checked={selectedAddress === address.address}
                                            onCheckedChange={() => setSelectedAddress(address.address)}
                                        >
                                            {address.address}, {address.city}, {address.province}, {address.postal_code}
                                        </DropdownMenuCheckboxItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 text-sm">
                        <div className="grid gap-3">
                            <div className="font-semibold">Order Details</div>
                            <ul className="grid gap-3">
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                        {barang[0].nama_barang}
                                    </span>
                                    <span>{barang[0].harga_awal}</span>
                                </li>
                            </ul>
                            <Separator className="my-2" />
                            <ul className="grid gap-3">
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>$500.00</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span>$10.00</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Tax</span>
                                    <span>$50.00</span>
                                </li>
                                <li className="flex items-center justify-between font-semibold">
                                    <span className="text-muted-foreground">Total</span>
                                    <span>$560.00</span>
                                </li>
                            </ul>
                        </div>
                        <Separator className="my-4" />
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-3">
                                <div className="font-semibold">Shipping Information</div>
                                <address className="grid gap-0.5 not-italic text-muted-foreground">
                                    <span>{pembeli.nama}</span>
                                    <span>{selectedAddress}</span>
                                    <span>{pembeli.addresses.find(addr => addr.address === selectedAddress).city}, {pembeli.addresses.find(addr => addr.address === selectedAddress).province}</span>
                                    <span>{pembeli.addresses.find(addr => addr.address === selectedAddress).postal_code}</span>
                                </address>
                            </div>
                            <div className="grid auto-rows-max gap-3">
                                <div className="font-semibold text-right">Billing Information</div>
                                <div className="text-muted-foreground text-right">
                                    Same as shipping address
                                </div>
                            </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="grid gap-3">
                            <div className="font-semibold">Customer Information</div>
                            <dl className="grid gap-3">
                                <div className="flex items-center justify-between">
                                    <dt className="text-muted-foreground">Customer</dt>
                                    <dd>{pembeli.nama}</dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="text-muted-foreground">Email</dt>
                                    <dd>
                                        <a href={`mailto:${pembeli.email}`}>{pembeli.email}</a>
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="text-muted-foreground">Phone</dt>
                                    <dd>
                                        <a href={`tel:${pembeli.phone_number}`}>{pembeli.phone_number}</a>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                        <Separator className="my-4" />
                        <div className="grid gap-3">
                            <div className="font-semibold">Payment Information</div>
                            <dl className="grid gap-3">
                                <div className="flex items-center justify-between">
                                    <dt className="flex items-center gap-1 text-muted-foreground">
                                        <CreditCard className="h-4 w-4" />
                                        Account Balance
                                    </dt>
                                    <span>{pembeli.saldo}</span>
                                </div>
                            </dl>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                        <Button className="ml-auto mr-0 " variant="outline" onClick={handleMakePaymentClick}>
                            Make Payment
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            {isConfirmOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="min-h-screen flex items-center justify-center">
                        <Card className="mx-auto max-w-md">
                            <CardHeader>
                                <CardTitle className="text-xl">Confirm Payment</CardTitle>
                                <CardDescription>Confirm your payment to complete your bid</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Are you sure you want to make this payment using your account balance?</p>
                                <Button className="w-full mt-4" variant="outline" onClick={handleCloseModal}>
                                    Confirm Payment
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </>
    );
};

export default Payment;
