import axios from 'axios';

const BE_URL = import.meta.env.VITE_BE_URL;

export const getTokoHandler = async (toko_id) => {
    try {
        const response = await axios.get(BE_URL + '/toko/' + toko_id);
        if(response.status !== 200) throw new Error('Failed to fetch toko data');
        return { message: response.data.message, toko: response.data.data.toko, barang: response.data.data.barang };
    } catch (error) {
        return false;
    }
}

export const updateTokoHandler = async (toko_id, deskripsi) => {
    try {
        const response = await axios.put(BE_URL + '/toko/' + toko_id, { deskripsi }, { headers: { cookies: `token=${localStorage.getItem('token')}` } });
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
        const response = await axios.post(BE_URL + '/toko/' + toko_id + '/add-barang', body, { headers: { cookies: `token=${localStorage.getItem('token')}` } });
        console.log(response.data);
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

export const getBarangHandler = async (toko_id, barang_id) => {
    try {
        const response = await axios.get(BE_URL + '/toko/' + toko_id + '/' + barang_id);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return false;
    }
}