import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddProduct = () => {
    const [product, setProduct] = useState({
        nama_barang: "",
        harga_awal: "",
        kategori: "",
        deskripsi: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle submit logic
        navigate("/storedetails");
    };

    return (
        <section className="bg-gray-100 min-h-screen flex items-center justify-center">
        <Card className="mx-auto max-w-md">
            <CardHeader>
            <CardTitle className="text-xl">Add Product</CardTitle>
            </CardHeader>
            <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                <Label htmlFor="nama_barang">Nama Barang</Label>
                <Input
                    type="text"
                    name="nama_barang"
                    id="nama_barang"
                    value={product.nama_barang}
                    onChange={handleChange}
                    required
                />
                </div>
                <div>
                <Label htmlFor="harga_awal">Harga Awal</Label>
                <Input
                    type="text"
                    name="harga_awal"
                    id="harga_awal"
                    value={product.harga_awal}
                    onChange={handleChange}
                    required
                />
                </div>
                <div>
                <Label htmlFor="kategori">Kategori</Label>
                <select
                    name="kategori"
                    id="kategori"
                    value={product.kategori}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                >
                    <option value="">Select Category</option>
                    <option value="Elektronik">Elektronik</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Otomotif">Otomotif</option>
                    <option value="Perhiasaan dan Aksesoris">Perhiasaan dan Aksesoris</option>
                    <option value="Mainan dan Hobi">Mainan dan Hobi</option>
                    <option value="Alat Musik">Alat Musik</option>
                    <option value="Barang Antik">Barang Antik</option>
                    <option value="Seni">Seni</option>
                    <option value="Budak">Budak</option>
                    <option value="Barang lainnya">Barang lainnya</option>
                </select>
                </div>
                <div>
                <Label htmlFor="deskripsi">Deskripsi</Label>
                <textarea
                    name="deskripsi"
                    id="deskripsi"
                    value={product.deskripsi}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
                </div>
                <Button type="submit" className="w-full">
                Add Product
                </Button>
            </form>
            </CardContent>
        </Card>
        </section>
    );
};

export default AddProduct;
