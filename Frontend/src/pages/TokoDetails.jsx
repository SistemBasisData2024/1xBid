import React from "react";
import { PlusCircle, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const TokoDetails = () => {
    const navigate = useNavigate();

    const toko = {
        nama_toko: "Toko Sukses",
        deskripsi: "Toko yang menjual berbagai macam barang berkualitas.",
        toko_picture: "https://via.placeholder.com/150"
    };

    const barang = [
        { barang_id: 1, nama_barang: "Barang 1", status: "Tersedia", kategori: "Makanan", harga_awal: "$150.00" },
        { barang_id: 2, nama_barang: "Barang 2", status: "Habis", kategori: "Minuman", harga_awal: "$250.00" },
    ];

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-4 sm:py-4">
                <div className="mx-auto w-full px-4 pb-8 md:px-6 md:pb-12">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center">
                            <img 
                                src={toko.toko_picture} 
                                alt={toko.nama_toko} 
                                className="mr-4 h-16 w-16 object-cover rounded-full" 
                            />
                            <h1 className="text-2xl font-bold">{toko.nama_toko}</h1>
                        </div>
                        <div className="flex space-x-2">
                            <Button variant="outline" className="hidden sm:inline-flex" onClick={() => navigate('/editshop')}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Toko
                            </Button>
                            <Button onClick={() => navigate('/addproduct')}>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Product
                            </Button>
                        </div>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Deskripsi Toko</CardTitle>
                            <CardDescription>{toko.deskripsi}</CardDescription>
                        </CardHeader>
                    </Card>
                    <div className="mt-8">
                        <Tabs defaultValue="products">
                            <TabsList className="mb-4">
                                <TabsTrigger value="products">Products</TabsTrigger>
                            </TabsList>
                            <TabsContent value="products">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Categories</TableHead>
                                            <TableHead>Initial Price</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {barang.map((item) => (
                                            <TableRow key={item.barang_id}>
                                                <TableCell>{item.nama_barang}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{item.status}</Badge>
                                                </TableCell>
                                                <TableCell>{item.kategori}</TableCell>
                                                <TableCell>{item.harga_awal}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TokoDetails;
