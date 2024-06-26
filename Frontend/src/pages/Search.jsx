import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { searchBarang } from "@/api/search.handler";

const Search = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getQuery = () => {
    const url = new URL(window.location.href);
    const searchQuery = url.searchParams.get("q") || "";
    return searchQuery;
  };

  const fetchSearchData = async (query) => {
    const response = await searchBarang(query);
    if (response) {
      setProducts(response);
    } else {
      console.error("Failed to fetch search data");
    }
  };

  useEffect(() => {
    const searchQuery = getQuery();
    fetchSearchData(searchQuery);
  }, []);

  // const products = [
  //     { nama_barang: "Smart Headphones", last_price: "$800.00", end_time: "27d 17h 53m 24s", status: "Available", image_url: "https://picsum.photos/500" },
  //     { nama_barang: "Smart Gaming", last_price: "$123.00", end_time: "25d 17h 53m 24s", status: "Available", image_url: "https://picsum.photos/500" },
  //     { nama_barang: "Smart Phone", last_price: "$999.00", end_time: "15d 17h 53m 24s", status: "On Bid", image_url: "https://picsum.photos/500" },
  //     { nama_barang: "Smart Watch", last_price: "$100.00", end_time: "25d 17h 53m 24s", status: "Sold", image_url: "https://picsum.photos/500" },
  //     { nama_barang: "Smart EarBuds", last_price: "$100.00", end_time: "11d 17h 53m 24s", status: "Available", image_url: "https://picsum.photos/500" },
  //     { nama_barang: "Smart Glasses", last_price: "$100.00", end_time: "25d 17h 53m 24s", status: "Available", image_url: "https://picsum.photos/500" },
  //     { nama_barang: "Samsung A20", last_price: "$100.00", end_time: "25d 17h 53m 24s", status: "Available", image_url: "https://picsum.photos/500" },
  //     { nama_barang: "Samsung A30", last_price: "$100.00", end_time: "25d 17h 53m 24s", status: "Available", image_url: "https://picsum.photos/500" }
  //     // Add more products as needed
  // ];

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchQuery = query.get("query") || "";

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.nama_barang.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  return (
    <div className="flex flex-wrap justify-start ml-24 mr-24">
      <p className="w-full text-2xl text-left py-2 ml-4 mt-2">
        Showing Results for "{getQuery()}"
      </p>
      <p className="w-full text-m text-left text-muted-foreground py-2 ml-4">
        Found {filteredProducts.length} Products that Match
      </p>
      {filteredProducts.map((product, index) => (
        <div key={index} className="m-4">
          <Card className="h-full w-72 relative">
            <img
              src={"https://picsum.photos/500"}
              alt={product.nama_barang}
              className="w-full h-48 object-cover rounded-t-md"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-haspopup="true"
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2"
                >
                  <MoreHorizontal className="h-7 w-7" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>View Product</DropdownMenuItem>
                <DropdownMenuItem>Bid Now</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <CardHeader className="pb-2 flex justify-between items-center">
              <CardTitle className="text-xl flex-1">
                {product.nama_barang}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Latest Bid Price: Rp{" "}
                {product.last_price.toLocaleString("id-ID")},00
              </CardDescription>
              <div className="text-xs text-muted-foreground">
                Ends in: {new Date(product.end_time).toLocaleString()}
              </div>{" "}
              <div className="text-xs text-muted-foreground">
                Status: {product.status}
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Search;
