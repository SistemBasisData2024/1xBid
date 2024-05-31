import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const HomePage = () => {
  const [topTrending, setTopTrending] = useState([]);
  const [newestAuctions, setNewestAuctions] = useState([]);

  useEffect(() => {
    const fetchTopTrending = async () => {
      try {
        const response = await axios.get("/api/top-trending-auctions");
        setTopTrending(response.data);
      } catch (error) {
        toast.error("Failed to fetch top trending auctions");
      }
    };

    const fetchNewestAuctions = async () => {
      try {
        const response = await axios.get("/api/newest-auctions");
        setNewestAuctions(response.data);
      } catch (error) {
        toast.error("Failed to fetch newest auctions");
      }
    };

    fetchTopTrending();
    fetchNewestAuctions();
  }, []);

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      {/* Landing Page Section */}
      <section className="text-center py-16 bg-white shadow-lg rounded-lg mb-8">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Our Auction Platform
        </h1>
        <p className="text-lg mb-8">
          Discover, bid, and win amazing items at unbeatable prices!
        </p>
        <Button color="primary">Get Started</Button>
      </section>

      {/* Top Trending Auctions Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Top Trending Auctions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((auction) => (
            <Card key={auction} className="p-6 shadow-lg rounded-lg bg-white">
              <h3 className="text-xl font-bold mb-2">Auction {auction}</h3>
              <p className="mb-4">Description of the trending auction item.</p>
              <Button color="primary">Bid Now</Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Newest Auctions Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Newest Auctions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((auction) => (
            <Card key={auction} className="p-6 shadow-lg rounded-lg bg-white">
              <h3 className="text-xl font-bold mb-2">Auction {auction}</h3>
              <p className="mb-4">Description of the newest auction item.</p>
              <Button color="primary">Bid Now</Button>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
