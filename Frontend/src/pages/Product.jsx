import React from "react";
import { useParams } from "react-router-dom";

const ProductPage = () => {
    const { toko_id, barang_id } = useParams();
    const [product, setProduct] = useState({});

    return (
        <div>
            <h1>Product Page</h1>
        </div>
    )
};

export default ProductPage;