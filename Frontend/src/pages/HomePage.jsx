import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import homeImage from "/src/assets/home_image.jpg";

const HomePage = () => {
  const [topTrending, setTopTrending] = useState([]);
  const [newestAuctions, setNewestAuctions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopTrending = async () => {
      try {
        const response = await axios.get("http://localhost:5000/home/trending");
        setTopTrending(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        toast.error("Failed to fetch top trending auctions");
      }
    };

    const fetchNewestAuctions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/home/newest");
        setNewestAuctions(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        toast.error("Failed to fetch newest auctions");
      }
    };

    fetchTopTrending();
    fetchNewestAuctions();
  }, []);

  const handleBidNowClick = (tokoId, barangId) => {
    navigate(`/${tokoId}/${barangId}`);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      {/* Landing Page Section */}
      <section
        className="text-center py-16 bg-white shadow-lg rounded-lg mb-8"
        style={{
          backgroundImage: `url(${homeImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: 'white'
        }}
      >
        <h1
          className="text-4xl font-bold mb-4"
          style={{
            textShadow: "2px 2px 4px black, -2px -2px 4px black, 2px -2px 4px black, -2px 2px 4px black"
          }}
        >
          Welcome to Our Auction Platform
        </h1>
        <p
          className="text-lg mb-8"
          style={{
            textShadow: "2px 2px 4px black, -2px -2px 4px black, 2px -2px 4px black, -2px 2px 4px black"
          }}
        >
          Discover, bid, and win amazing items at unbeatable prices!
        </p>
      </section>

      {/* Top Trending Auctions Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Top Trending Auctions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topTrending.length > 0 ? (
            topTrending.map((auction, index) => (
              <Card key={index} className="p-6 shadow-lg rounded-lg bg-white flex flex-col">
                <h3 className="text-xl font-bold mb-2">{auction.nama_barang}</h3>
                <p className="mb-4">{auction.deskripsi}</p>
                <p className="mb-4">Current Price: Rp.{auction.last_price}</p>
                <div className="mt-auto">
                  <Button color="primary" onClick={() => handleBidNowClick(auction.toko_id, auction.barang_id)}>View Product</Button>
                </div>
              </Card>
            ))
          ) : (
            <p>No trending auctions available.</p>
          )}
        </div>
      </section>

      {/* Newest Auctions Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Newest Auctions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {newestAuctions.length > 0 ? (
            newestAuctions.map((auction, index) => (
              <Card key={index} className="p-6 shadow-lg rounded-lg bg-white flex flex-col">
                <h3 className="text-xl font-bold mb-2">{auction.nama_barang}</h3>
                <p className="mb-4">{auction.deskripsi}</p>
                <p className="mb-4">Starting Price: Rp.{auction.harga_awal}</p>
                <div className="mt-auto">
                  <Button color="primary" onClick={() => handleBidNowClick(auction.toko_id, auction.barang_id)}>View Product</Button>
                </div>
              </Card>
            ))
          ) : (
            <p>No newest auctions available.</p>
          )}
        </div>
      </section>

      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default HomePage;
