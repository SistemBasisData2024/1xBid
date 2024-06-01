import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EditShop = () => {
    const [toko, setToko] = useState({
        nama_toko: "Toko Sukses",
        deskripsi: "Toko yang menjual berbagai macam barang berkualitas.",
        toko_picture: "https://via.placeholder.com/150",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setToko({ ...toko, [name]: value });
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
            <CardTitle className="text-xl">Edit Shop</CardTitle>
            </CardHeader>
            <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                <Label htmlFor="nama_toko">Nama Toko</Label>
                <Input
                    type="text"
                    name="nama_toko"
                    id="nama_toko"
                    value={toko.nama_toko}
                    onChange={handleChange}
                    required
                />
                </div>
                <div>
                <Label htmlFor="deskripsi">Deskripsi</Label>
                <textarea
                    name="deskripsi"
                    id="deskripsi"
                    value={toko.deskripsi}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
                </div>
                <div>
                <Label htmlFor="toko_picture">Toko Picture URL</Label>
                <Input
                    type="text"
                    name="toko_picture"
                    id="toko_picture"
                    value={toko.toko_picture}
                    onChange={handleChange}
                    required
                />
                </div>
                <Button type="submit" className="w-full">
                Save Changes
                </Button>
            </form>
            </CardContent>
        </Card>
        </section>
    );
};

export default EditShop;
