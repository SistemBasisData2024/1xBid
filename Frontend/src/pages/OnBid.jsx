import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { placeBid, getBidHistory, getBarang } from "@/api/bid.handler";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const OnBid = () => {
  const [bidPrice, setBidPrice] = useState("");
  const [timeLeft, setTimeLeft] = useState({});
  const { barang_id } = useParams();
  const [bidder, setBidder] = useState([]);
  const [barang, setBarang] = useState({});
  const [latestPrice, setLatestPrice] = useState("");
  const [initialPrice, setInitialPrice] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const calculateTimeLeft = (endTime) => {
    const now = new Date();
    const distance = new Date(endTime) - now;
    if (distance <= 0) return {};

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const connectSocket = () => {
    const socket = io("http://localhost:5001");
    socket.on("new_bid", (data) => {
      if (data.barang_id === barang_id) {
        fetchBidHistory();
        fetchBarang();
      }
    });
  }

  const fetchBarang = async () => {
    const response = await getBarang(barang_id);
    if (response) {
      setBarang(response.data);
      setLatestPrice(response.data.last_price ? response.data.last_price.toLocaleString("id-ID") : "");
      setInitialPrice(response.data.harga_awal ? response.data.harga_awal.toLocaleString("id-ID") : "");
    } else {
      toast.error("Failed to fetch product");
      navigate("/notfound");
    }
  };

  const fetchBidHistory = async () => {
    const response = await getBidHistory(barang_id);
    if (response) {
      setBidder(response.bidder.sort((a, b) => b.bid_price - a.bid_price));
    } else {
      toast.error("Failed to fetch bid history");
    }
  };

  useEffect(() => {
    fetchBarang();
    fetchBidHistory();
    connectSocket();

    setIsLoading(false);
  }, [barang_id]);

  useEffect(() => {
    const interval = setInterval(() => {
      const timeleft = calculateTimeLeft(barang.end_time);
      setTimeLeft(timeleft);

      if (!timeleft) {
        clearInterval(interval);
        setTimeLeft({});
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  const handleBidPriceChange = (e) => {
    const value = Number(e.target.value.replace(/[^0-9]/g, ""));
    setBidPrice(value);
  };

  const handlePlaceBid = async () => {
    const response = await placeBid(barang_id, bidPrice);
    console.log(response);
    if (response) {
      toast.success("Bid placed successfully");
      window.location.reload();
    } else {
      toast.error("Failed to place bid");
    }
  };

  const censorEmail = (email) => {
    let [username, domain] = email.split("@");
    username = username[0] + "*".repeat(username.length - 1);
    domain = domain[0] + "*".repeat(domain.length - 1);
    return `${username}@${domain}`;
  };

  const censorName = (name) => {
    return name
      .split(" ")
      .map((word) => word[0] + "*".repeat(word.slice(1).length))
      .join(" ");
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen text-2xl text-gray-400">
          Loading...
        </div>
      ) : (
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
                  value={`Rp ${bidPrice.toLocaleString("id-ID")}`}
                  onChange={handleBidPriceChange}
                  className="mr-2"
                />
                <Button onClick={handlePlaceBid}>Place New Bid</Button>
              </CardFooter>
            </Card>
            <Card className="flex-grow w-full sm:w-1/3 lg:w-1/4 mx-auto">
              <CardHeader className="pb-2">
                <CardDescription>Starting Price</CardDescription>
                <CardTitle className="text-4xl">{`Rp ${initialPrice}`}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  The Lowest Possible Bid That Can Be Placed
                </div>
              </CardContent>
            </Card>
            <Card className="flex-grow w-full sm:w-1/3 lg:w-1/4 mx-auto">
              <CardHeader className="pb-2">
                <CardDescription>Latest Price</CardDescription>
                <CardTitle className="text-4xl">{`Rp ${latestPrice}`}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  The Highest Bid Currently Offered
                </div>
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
              <CardDescription>
                Bids that have been placed for this product
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bidder</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Email
                    </TableHead>
                    <TableHead className="hidden sm:table-cell">Time</TableHead>
                    <TableHead className="text-right">Bid Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bidder.map((item, index) => (
                    <TableRow
                      key={index}
                      className={index % 2 === 0 ? "bg-accent" : ""}
                    >
                      <TableCell>
                        <div className="font-medium">
                          {censorName(item.fullname)}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {censorEmail(item.email)}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {new Date(item.bid_at).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">{`Rp ${item.bid_price.toLocaleString(
                        "id-ID"
                      )}`}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
};

export default OnBid;
