import { useParams } from "react-router-dom";
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

// const ProductPage = () => {
//   const { toko_id, barang_id } = useParams();
//   const [product, setProduct] = useState({});

const ProductPage = {
  id: 1,
  name: "Product Name",
  image: "https://via.placeholder.com/150",
  price: "$99.99",
  description: "Deskripsi produk ntar disini",
  auctionStart: new Date(Date.now() + 3600 * 1000).toISOString(), // 1 hour from now
  shop: {
    id: 1,
    name: "Shop Name",
  },
};

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
  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(product.auctionStart)
  );
  const [progress, setProgress] = useState(100);

  const auctionDuration = 3600 * 1000; // 1 hour in milliseconds

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(product.auctionStart));
      setProgress(calculateProgress(product.auctionStart, auctionDuration));
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, progress]);

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
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-l-lg lg:rounded-none"
          />
        </CardHeader>
        <CardContent className="flex-grow p-6">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <Separator className="my-2" />
          <a
            href={`/shop/${product.shop.id}`}
            className="text-blue-500 underline"
          >
            {product.shop.name}
          </a>
          <Separator className="my-2" />
          <p className="text-lg text-blue-600 mb-4">{product.price}</p>
          <Separator className="my-2" />
          <p className="mb-4">{product.description}</p>
          <Separator className="my-2" />
          <div className="mt-4">
            {timerComponents.length ? (
              <div className="text-xl font-bold">
                Auction starts in: {timerComponents}
              </div>
            ) : (
              <span className="text-xl font-bold">Auction has started!</span>
            )}
          </div>
          <Progress value={progress} className="mt-4" />
        </CardContent>
      </div>
      <Separator className="my-2" />
      <CardFooter className="p-6">
        <Button className="w-full bg-green-500 text-white">Buy Now</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductPage;
