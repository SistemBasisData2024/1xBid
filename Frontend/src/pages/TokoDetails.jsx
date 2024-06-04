import React, { useEffect, useState, useRef } from "react";
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
import {
  addBarangHandler,
  getTokoHandler,
  updateTokoHandler,
} from "@/api/toko.handler";
import { toast } from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const TokoDetails = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);
  const [isEditProductModalOpen, setEditProductModalOpen] = useState(false);
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
    start_time: null,
    end_time: null,
    bid_multiplier: "",
  });

  const escKeyListener = useRef(null);

  const getAvatar = async (fullname) => {
    if (fullname) {
      const response = await fetch(
        "https://ui-avatars.com/api/?name=" + fullname.replace(" ", "+")
      );
      const avatarUrl = await response.url;
      return avatarUrl;
    } else {
      return "https://img.icons8.com/?size=100&id=99268&format=png&color=000000";
    }
  };

  const { toko_id } = useParams();
  const [barang, setBarang] = useState([]);
  const navigate = useNavigate();
  const START_TIME_MIN = import.meta.env.START_TIME_MIN;
  const END_TIME_MIN = import.meta.env.END_TIME_MIN;

  useEffect(() => {
    const fetchToko = async () => {
      const response = await getTokoHandler(toko_id);
      if (response) {
        setBarang(response.barang);
        const avatarUrl = await getAvatar(response.toko.nama_toko);
        setEditData({
          nama_toko: response.toko.nama_toko,
          deskripsi: response.toko.deskripsi,
          toko_picture: avatarUrl,
        });
      } else {
        navigate("/notfound");
        toast.error("Failed to fetch shop data");
      }
    };
    fetchToko();

    escKeyListener.current = (e) => {
      if (e.key === "Escape") {
        setEditModalOpen(false);
        setAddProductModalOpen(false);
        setEditProductModalOpen(false);
      }
    };
    document.addEventListener("keydown", escKeyListener.current);

    return () => {
      document.removeEventListener("keydown", escKeyListener.current);
    };
  }, [toko_id]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleStartTimeChange = (newValue) => {
    setNewProduct({ ...newProduct, start_time: newValue });
    if (newValue === null) toast.error("Start time is required");
  };

  const handleEndTimeChange = (newValue) => {
    setNewProduct({ ...newProduct, end_time: newValue });
    if (newValue === null) toast.error("End time is required");
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });

    if (name === "harga_awal" || name === "bid_multiplier") {
      if (value) {
        const newValue = parseInt(value.replace(/\D/g, ""));
        setNewProduct({
          ...newProduct,
          [name]: `Rp ${newValue.toLocaleString("id-ID")}`,
        });
      }
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const response = await updateTokoHandler(toko_id, editData.deskripsi);
    if (response) {
      toast.success("Shop updated successfully");
      window.location.reload();
    } else {
      toast.error("Failed to update shop");
    }
    setEditModalOpen(false);
  };

  const validateTime = (startTime, endTime) => {
    startTime = new Date(startTime);
    endTime = new Date(endTime);
    if (!startTime || !endTime) {
      return "Start time and end time are required";
    }

    if (startTime >= endTime) {
      return "Start time must be before end time";
    }

    if (startTime <= new Date(new Date().getTime() + START_TIME_MIN)) {
      return "Start time must be at least 5 hours from now";
    }

    if (endTime <= new Date(startTime.getTime() + END_TIME_MIN)) {
      return "End time must be at least 1 hour from start time";
    }

    return null;
  };

  const parseBackPrice = (price) => {
    return parseInt(price.replace(/\D/g, ""));
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    newProduct.harga_awal = parseBackPrice(newProduct.harga_awal);
    newProduct.bid_multiplier = parseBackPrice(newProduct.bid_multiplier);

    const timeError = validateTime(newProduct.start_time, newProduct.end_time);
    if (timeError) {
      toast.error(timeError);
      return;
    }

    const response = await addBarangHandler(toko_id, newProduct);
    if (response) {
      toast.success("Product added successfully");
      window.location.reload();
    } else {
      toast.error("Failed to add product");
    }
    setAddProductModalOpen(false);
  };

  const handleEditBarang = (barang) => {
    setNewProduct(barang);
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
                      <TableHead>Start Time</TableHead>
                      <TableHead>End Time</TableHead>
                      <TableHead>Multiplier</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {barang.map((item) => (
                      <TableRow
                      // key={item.barang_id}
                      // onClick={() =>
                      //   navigate(`/${toko_id}/${item.barang_id}`)
                      // }
                      >
                        <TableCell>{item.nama_barang}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.status}</Badge>
                        </TableCell>
                        <TableCell>{item.kategori}</TableCell>
                        <TableCell>{`Rp ${item.harga_awal.toLocaleString(
                          "id-ID"
                        )},00`}</TableCell>
                        <TableCell>
                          {new Date(item.start_time).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {new Date(item.end_time).toLocaleString()}
                        </TableCell>
                        <TableCell>{`Rp ${item.bid_multiplier.toLocaleString(
                          "id-ID"
                        )},00`}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditProductModalOpen(item);
                              handleEditBarang(item);
                            }}
                          >
                            Edit
                          </Button>
                        </TableCell>
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
                      <option value="Budak">Budak</option>
                      <option value="Barang lainnya">Barang lainnya</option>
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
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="flex flex-col">
                      <Label htmlFor="start_time">Start Time</Label>
                      <DateTimePicker
                        label="Start Time"
                        value={newProduct.start_time}
                        onChange={handleStartTimeChange}
                        renderInput={(props) => (
                          <div className="flex flex-col">
                            <Input
                              {...props}
                              name="start_time"
                              id="start_time"
                              className="rounded"
                            />
                          </div>
                        )}
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <Label htmlFor="end_time">End Time</Label>
                      <DateTimePicker
                        label="End Time"
                        value={newProduct.end_time}
                        onChange={handleEndTimeChange}
                        renderInput={(props) => (
                          <div className="flex flex-col">
                            <Input
                              {...props}
                              name="end_time"
                              id="end_time"
                              className="rounded"
                            />
                          </div>
                        )}
                        required
                      />
                    </div>
                  </LocalizationProvider>
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

      {/* Modal Edit Product */}
      {isEditProductModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <section className="min-h-screen flex items-center justify-center">
            <Card className="mx-auto max-w-md">
              <CardHeader>
                <CardTitle className="text-xl">Edit Product</CardTitle>
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
                      <option value="Budak">Budak</option>
                      <option value="Barang lainnya">Barang lainnya</option>
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
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="flex flex-col">
                      <Label htmlFor="start_time">Start Time</Label>
                      <DateTimePicker
                        label="Start Time"
                        // value={newProduct.start_time}
                        onChange={handleStartTimeChange}
                        renderInput={(props) => (
                          <div className="flex flex-col">
                            <Input
                              {...props}
                              name="start_time"
                              id="start_time"
                              className="rounded"
                            />
                          </div>
                        )}
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <Label htmlFor="end_time">End Time</Label>
                      <DateTimePicker
                        label="End Time"
                        // value={newProduct.end_time}
                        onChange={handleEndTimeChange}
                        renderInput={(props) => (
                          <div className="flex flex-col">
                            <Input
                              {...props}
                              name="end_time"
                              id="end_time"
                              className="rounded"
                            />
                          </div>
                        )}
                        required
                      />
                    </div>
                  </LocalizationProvider>
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
                    Edit Product
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
