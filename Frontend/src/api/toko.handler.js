import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

exports.getTokoHandler = async (toko_id) => {
    try {
        const response = await axios.get(process.env.BE_URL + '/toko/' + toko_id);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

exports.updateTokoHandler = async (toko_id, body) => {
    try {
        const response = await axios.put(process.env.BE_URL + '/toko/' + toko_id, body);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

exports.deleteTokoHandler = async (toko_id) => {
    try {
        const response = await axios.delete(process.env.BE_URL + '/toko/' + toko_id);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

exports.addBarangHandler = async (toko_id, body) => {
    try {
        const response = await axios.post(process.env.BE_URL + '/toko/' + toko_id + '/add-barang', body);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

exports.editBarangHandler = async (toko_id, barang_id, body) => {
    try {
        const response = await axios.put(process.env.BE_URL + '/toko/' + toko_id + '/' + barang_id, body);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

exports.deleteBarangHandler = async (toko_id, barang_id) => {
    try {
        const response = await axios.delete(process.env.BE_URL + '/toko/' + toko_id + '/' + barang_id);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}