import { getTokoHandler } from "@/api/toko.handler";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const StoreProfile = () => {
  const { toko_id } = useParams();
  const [toko, setToko] = useState({});

  useEffect(() => {
    const fetchToko = async () => {
      const response = await getTokoHandler(toko_id);
      if(response) setToko(response.toko);
      else toast.error('Failed to fetch store data');
    };

    fetchToko();
  }, [toko_id]);

  return (
    <div>
      <h1>Store Profile</h1>
    </div>
  );
};

export default StoreProfile;
