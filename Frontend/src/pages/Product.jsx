import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { getBarangHandler } from "@/api/toko.handler";
import { toast } from "react-toastify";

const calculateTimeLeft = (endTime) => {
  const difference = +new Date(endTime) - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const calculateProgress = (endTime, duration) => {
  const difference = +new Date(endTime) - +new Date();
  return ((difference / duration) * 100).toFixed(2);
};

const Product = () => {
  const { toko_id, barang_id } = useParams();
  const [timeLeft, setTimeLeft] = useState({});
  const [progress, setProgress] = useState(100);
  const [product, setProduct] = useState({});
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const fetchProduct = async () => {
    const response = await getBarangHandler(toko_id, barang_id);
    if (response) {
      setProduct(response);
    } else {
      toast.error("Failed to fetch product");
      navigate("/notfound");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [toko_id, barang_id]);

  useEffect(() => {
    if (product.start_time && product.end_time) {
      const now = new Date();
      const startTime = new Date(product.start_time);
      const endTime = new Date(product.end_time);
      let targetTime = startTime;
      let text = "Auction starts in";

      if (now > startTime) {
        targetTime = endTime;
        text = "Auction ends in";
      }

      const auctionDuration = targetTime - startTime;
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(targetTime));
        setProgress(calculateProgress(targetTime, auctionDuration));
        setText(text);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [product, timeLeft]);

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <Card className="max-w-4xl mx-auto my-8">
      <div className="flex flex-col lg:flex-row">
        <CardHeader className="flex-shrink-0 lg:w-1/3">
          <img
            src={product.image || "https://via.placeholder.com/150"}
            alt={product.nama_barang || "Product"}
            className="w-full h-auto rounded-l-lg lg:rounded-none"
          />
        </CardHeader>
        <CardContent className="flex-grow p-6">
          <h1 className="text-2xl font-bold mb-2">
            {product.nama_barang || "Product Name"}
          </h1>
          <Separator className="my-2" />
          <a href={`/${product.toko_id}`} className="text-blue-500 underline">
            {product.toko_id || "Shop Name"}
          </a>
          <Separator className="my-2" />
          <p className="text-lg text-blue-600 mb-4">
            {product.last_price
              ? `Rp ${product.last_price.toLocaleString("id-ID")},00`
              : "Price"}
          </p>
          <Separator className="my-2" />
          <p className="mb-4">{product.deskripsi || "Product description"}</p>
          <Separator className="my-2" />
          <div className="mt-4">
            {timerComponents.length ? (
              <div className="text-xl font-bold">
                {text}: {timerComponents}
              </div>
            ) : (
              <span className="text-xl font-bold">
                Auction has <span className="text-red-600">ended!</span>
              </span>
            )}
          </div>
          <Progress value={progress} className="mt-4" />
        </CardContent>
      </div>
      <Separator className="my-2" />
      <CardFooter className="p-6">
        <Button
          className={`w-full text-white ${
            Object.keys(timeLeft).length && product.status === "On Bid"
              ? "bg-green-500"
              : "bg-gray-500"
          }`}
          disabled={
            !Object.keys(timeLeft).length || product.status !== "On Bid"
          }
          onClick={() => navigate(`/onbid/${barang_id}`)}
        >
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Product;
