import axios from 'axios';

export const getTokoHandler = async (toko_id) => {
    try {
        const response = await axios.get(BE_URL + '/toko/' + toko_id);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const updateTokoHandler = async (toko_id, body) => {
    try {
        const response = await axios.put(BE_URL + '/toko/' + toko_id, body);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteTokoHandler = async (toko_id) => {
    try {
        const response = await axios.delete(BE_URL + '/toko/' + toko_id);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const addBarangHandler = async (toko_id, body) => {
    try {
        const response = await axios.post(BE_URL + '/toko/' + toko_id + '/add-barang', body);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const editBarangHandler = async (toko_id, barang_id, body) => {
    try {
        const response = await axios.put(BE_URL + '/toko/' + toko_id + '/' + barang_id, body);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteBarangHandler = async (toko_id, barang_id) => {
    try {
        const response = await axios.delete(BE_URL + '/toko/' + toko_id + '/' + barang_id);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}