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
import {
  getAddressHandler,
  getTransaksiDetailHandler,
} from "@/api/transaksi.handler";
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
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const navigate = useNavigate();

  const fetchTransaksiDetail = async () => {
    const response = await getTransaksiDetailHandler(transaksi_id);
    if (response) {
      setTransaksi(response.data);
    } else {
      toast.error("Failed to fetch transaksi detail");
      navigate("/notfound");
    }
  };

  const fetchAddress = async () => {
    const response = await getAddressHandler();
    if (response) {
      setAddress(response.data);
    } else {
      toast.error("Failed to fetch address");
    }
  };

  useEffect(() => {
    fetchTransaksiDetail();
    fetchAddress();
  }, [transaksi_id]);

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const pembeli = {
    nama: "NIGGA",
    email: "NIGGA",
    phone_number: "NIGGA",
    saldo: "NIGGA",
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

  const barang = [{ nama_barang: "Barang 1", harga_awal: "$500.00" }];

  const handleSelectedAddress = (address_id) => {
    setSelectedAddress(address.find((addr) => addr.address_id === address_id));
  };

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
                  {Array.isArray(address)
                    ? address.map((addr, index) => (
                        <DropdownMenuCheckboxItem
                          key={index}
                          checked={
                            selectedAddress?.address_id === addr.address_id
                          }
                          onCheckedChange={() =>
                            handleSelectedAddress(addr.address_id)
                          }
                        >
                          {addr.address}, {addr.city}, {addr.province},{" "}
                          {addr.postal_code}
                        </DropdownMenuCheckboxItem>
                      ))
                    : null}
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
                    {transaksi.barang?.nama_barang}
                  </span>
                  <span>
                    {`Rp ${new Intl.NumberFormat("id-ID").format(
                      transaksi.transaksi?.price
                    )},00`}
                  </span>{" "}
                </li>
              </ul>
              <Separator className="my-2" />
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>
                    {`Rp ${new Intl.NumberFormat("id-ID").format(
                      transaksi.transaksi?.price
                    )},00`}
                  </span>
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
                  <span>
                    {`Rp ${new Intl.NumberFormat("id-ID").format(
                      transaksi.transaksi?.price
                    )},00`}
                  </span>
                </li>
              </ul>
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <div className="font-semibold">Shipping Information</div>
                {selectedAddress && (
                  <address className="grid gap-0.5 not-italic text-muted-foreground">
                    <span>{transaksi.user.fullname}</span>
                    <span>{selectedAddress.address}</span>
                    <span>
                      {selectedAddress.city}, {selectedAddress.province}
                    </span>
                    <span>{selectedAddress.postal_code}</span>
                  </address>
                )}
              </div>
              <div className="grid auto-rows-max gap-3">
                <div className="font-semibold text-right">
                  Billing Information
                </div>
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
                  <dd>{transaksi.user?.fullname}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Email</dt>
                  <dd>
                    <a href={`mailto:${transaksi.user?.email}`}>
                      {transaksi.user?.email}
                    </a>
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Phone</dt>
                  <dd>
                    <a href={`tel:${transaksi.user?.phone_number}`}>
                      {transaksi.user?.phone_number}
                    </a>
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
                  <span>
                    {`Rp ${new Intl.NumberFormat("id-ID").format(
                      transaksi.user?.saldo
                    )},00`}
                  </span>
                </div>
              </dl>
            </div>
          </CardContent>
          <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
            <Button
              className={`ml-auto mr-0 ${
                transaksi.user?.saldo < transaksi.transaksi?.price
                  ? "bg-red-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
              variant="outline"
              onClick={handleMakePaymentClick}
              disabled={transaksi.user?.saldo < transaksi.transaksi?.price}
            >
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
                <CardDescription>
                  Confirm your payment to complete your bid
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Are you sure you want to make this payment using your account
                  balance?
                </p>
                <Button
                  className="w-full mt-4"
                  variant="outline"
                  onClick={handleCloseModal}
                >
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
