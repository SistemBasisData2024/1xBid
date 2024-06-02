import React, { useEffect, useState } from "react";
import { PlusCircle, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TimeInput } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getTokoHandler } from "@/api/toko.handler";
import { toast } from "react-toastify";

const TokoDetails = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    nama_toko: "Toko Sukses",
    deskripsi: "Toko yang menjual berbagai macam barang berkualitas.",
    toko_picture: "https://via.placeholder.com/150",
  });
  const [newProduct, setNewProduct] = useState({
    nama_barang: "",
    harga_awal: "",
    kategori: "",
    deskripsi: "",
    start_time: "",
    end_time: "",
    bid_multiplier: "",
  });

  const { toko_id } = useParams();
  // const [toko, setToko] = useState({});
  // const [barang, setBarang] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchToko = async () => {
      const response = await getTokoHandler(toko_id);
      if (response) {
        setToko(response);
        setBarang(response.barang);
      } else {
        navigate("/notfound");
      }
    };

    fetchToko();
  }, [toko_id]);

  const toko = {
    nama_toko: "Toko Sukses",
    deskripsi: "Toko yang menjual berbagai macam barang berkualitas.",
    toko_picture: "https://via.placeholder.com/150",
  };

  const barang = [
    {
      barang_id: 1,
      nama_barang: "Barang 1",
      status: "Tersedia",
      kategori: "Makanan",
      harga_awal: "$150.00",
    },
    {
      barang_id: 2,
      nama_barang: "Barang 2",
      status: "Habis",
      kategori: "Minuman",
      harga_awal: "$250.00",
    },
  ];

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Handle submit logic for editing shop
    setEditModalOpen(false);
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    // Handle submit logic for adding product
    setAddProductModalOpen(false);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <div className="mx-auto w-full px-4 pb-8 md:px-6 md:pb-12">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={editData.toko_picture}
                alt={editData.nama_toko}
                className="mr-4 h-16 w-16 object-cover rounded-full"
              />
              <h1 className="text-2xl font-bold">{editData.nama_toko}</h1>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                className="hidden sm:inline-flex"
                onClick={() => setEditModalOpen(true)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Store
              </Button>
              <Button onClick={() => setAddProductModalOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Store Description</CardTitle>
              <CardDescription>{editData.deskripsi}</CardDescription>
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

      {/* Edit Shop Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <section className="min-h-screen flex items-center justify-center">
            <Card className="mx-auto max-w-md">
              <CardHeader>
                <CardTitle className="text-xl">Edit Shop</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleEditSubmit}>
                  <div>
                    <Label htmlFor="nama_toko">Nama Toko</Label>
                    <Input
                      type="text"
                      name="nama_toko"
                      id="nama_toko"
                      value={editData.nama_toko}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="deskripsi">Deskripsi</Label>
                    <textarea
                      name="deskripsi"
                      id="deskripsi"
                      value={editData.deskripsi}
                      onChange={handleEditChange}
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
                      value={editData.toko_picture}
                      onChange={handleEditChange}
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
        </div>
      )}

      {/* Add Product Modal */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <section className="min-h-screen flex items-center justify-center">
            <Card className="mx-auto max-w-md">
              <CardHeader>
                <CardTitle className="text-xl">Add Product</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleProductSubmit}>
                  <div>
                    <Label htmlFor="nama_barang">Nama Barang</Label>
                    <Input
                      type="text"
                      name="nama_barang"
                      id="nama_barang"
                      value={newProduct.nama_barang}
                      onChange={handleProductChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="harga_awal">Harga Awal</Label>
                    <Input
                      type="text"
                      name="harga_awal"
                      id="harga_awal"
                      value={newProduct.harga_awal}
                      onChange={handleProductChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="kategori">Kategori</Label>
                    <select
                      name="kategori"
                      id="kategori"
                      value={newProduct.kategori}
                      onChange={handleProductChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Elektronik">Elektronik</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Otomotif">Otomotif</option>
                      <option value="Perhiasaan dan Aksesoris">
                        Perhiasaan dan Aksesoris
                      </option>
                      <option value="Mainan dan Hobi">Mainan dan Hobi</option>
                      <option value="Alat Musik">Alat Musik</option>
                      <option value="Barang Antik">Barang Antik</option>
                      <option value="Seni">Seni</option>
                      <option value="Dekorasi Rumah">Dekorasi Rumah</option>
                      <option value="Pertanian">Pertanian</option>
                      <option value="Lain-lain">Lain-lain</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="deskripsi">Deskripsi</Label>
                    <textarea
                      name="deskripsi"
                      id="deskripsi"
                      value={newProduct.deskripsi}
                      onChange={handleProductChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="start_time">Start Time</Label>
                    <TimeInput
                      className="w-full p-2 border border-gray-300 rounded"
                      isRequired
                      name="start_time"
                      id="start_time"
                      label="Start Time"
                      value={newProduct.start_time}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          start_time: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="end_time">End Time</Label>
                    <TimeInput
                      className="w-full p-2 border border-gray-300 rounded"
                      isRequired
                      name="end_time"
                      id="end_time"
                      label="End Time"
                      value={newProduct.end_time}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          end_time: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="bid_multiplier">Bid Multiplier</Label>
                    <Input
                      type="text"
                      name="bid_multiplier"
                      id="bid_multiplier"
                      value={newProduct.bid_multiplier}
                      onChange={handleProductChange}
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
        </div>
      )}
    </div>
  );
};

export default TokoDetails;
