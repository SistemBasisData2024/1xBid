import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

const OnBid = () => {
    const [bidPrice, setBidPrice] = useState("");
    const [timeLeft, setTimeLeft] = useState({});
    
    const pembeli = [
        { pembeli_id: 1, nama: "Nama Panjang 1", email: "test1@mail.com", bid: "$120.00", timestamp: "2024-06-01 10:00:00" },
        { pembeli_id: 2, nama: "Nama Panjang 2", email: "test2@mail.com", bid: "$300.00", timestamp: "2024-06-01 11:00:00" },
        { pembeli_id: 3, nama: "Nama Panjang 3", email: "test3@mail.com", bid: "$450.00", timestamp: "2024-06-01 12:00:00" },
    ];

    const barang = { nama_barang: "Barang 1", harga_awal: "$100.00", deskripsi: "Barang keren banget inimah wajib dibeli cok yang ga beli pasti nyesel dah", bid_multiplier: "x1.5" };

    const endTime = new Date("2024-06-05T12:00:00");

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const distance = endTime - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });

            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft({});
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleBidPriceChange = (e) => {
        setBidPrice(e.target.value);
    };

    const handlePlaceBid = () => {
        console.log(`New bid placed: ${bidPrice}`);
        // Add logic here to handle placing the new bid
    };

    return (
        <>
            <div className="flex flex-wrap justify-center gap-4 mt-8 mb-4">
                <Card className="flex-grow w-full sm:w-1/3 lg:w-1/4 mx-auto">
                    <CardHeader className="pb-3">
                        <CardTitle>{barang.nama_barang}</CardTitle>
                        <CardDescription className="max-w-lg text-balance leading-relaxed">
                            {barang.deskripsi}
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Input
                            type="text"
                            placeholder="Enter your bid"
                            value={bidPrice}
                            onChange={handleBidPriceChange}
                            className="mr-2"
                        />
                        <Button onClick={handlePlaceBid}>Place New Bid</Button>
                    </CardFooter>
                </Card>
                <Card className="flex-grow w-full sm:w-1/3 lg:w-1/4 mx-auto">
                    <CardHeader className="pb-2">
                        <CardDescription>Starting Price</CardDescription>
                        <CardTitle className="text-4xl">{barang.harga_awal}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">The Lowest Possible Bid That Can Be Placed</div>
                    </CardContent>
                </Card>
                <Card className="flex-grow w-full sm:w-1/3 lg:w-1/4 mx-auto">
                    <CardHeader className="pb-2">
                        <CardDescription>Latest Price</CardDescription>
                        <CardTitle className="text-4xl">$450.00</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">The Highest Bid Currently Offered</div>
                    </CardContent>
                </Card>
            </div>

            <Card className="flex-grow w-full sm:w-1/2 lg:w-1/3 mx-auto mb-4">
                <CardHeader className="pb-3">
                <CardDescription>Auction Countdown</CardDescription>
                </CardHeader>
                <CardContent>
                    {timeLeft.days !== undefined ? (
                        <div className="text-2xl flex justify-center space-x-2">
                            <div className="flex flex-col items-center">
                                <div className="font-bold">{timeLeft.days}</div>
                                <div className="text-sm">Days</div>
                            </div>
                            <div className="font-bold">:</div>
                            <div className="flex flex-col items-center">
                                <div className="font-bold">{timeLeft.hours}</div>
                                <div className="text-sm">Hours</div>
                            </div>
                            <div className="font-bold">:</div>
                            <div className="flex flex-col items-center">
                                <div className="font-bold">{timeLeft.minutes}</div>
                                <div className="text-sm">Minutes</div>
                            </div>
                            <div className="font-bold">:</div>
                            <div className="flex flex-col items-center">
                                <div className="font-bold">{timeLeft.seconds}</div>
                                <div className="text-sm">Seconds</div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-2xl text-center">Auction has ended</div>
                    )}
                </CardContent>
            </Card>

            <Card className="w-full">
                <CardHeader className="px-7">
                    <CardTitle>Bid History</CardTitle>
                    <CardDescription>Bids that have been placed for this product</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Bidder</TableHead>
                                <TableHead className="hidden sm:table-cell">Email</TableHead>
                                <TableHead className="hidden sm:table-cell">Time</TableHead>
                                <TableHead className="text-right">Bid Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pembeli.map((item) => (
                                <TableRow key={item.pembeli_id} className={item.pembeli_id % 2 === 0 ? "bg-accent" : ""}>
                                    <TableCell>
                                        <div className="font-medium">{item.nama}</div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">{item.email}</TableCell>
                                    <TableCell className="hidden sm:table-cell">{item.timestamp}</TableCell>
                                    <TableCell className="text-right">{item.bid}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
};

export default OnBid;
