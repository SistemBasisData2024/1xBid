import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const getUserHandler = async () => {
    try {
        const response = await axios.get(process.env.BE_URL + '/user/profile', { headers: { cookie: `token=${localStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const updateUserHandler = async (body) => {
    try {
        const response = await axios.put(process.env.BE_URL + '/user/profile', body, { headers: { cookie: `token=${localStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteUserHandler = async () => {
    try {
        const response = await axios.delete(process.env.BE_URL + '/user/profile', { headers: { cookie: `token=${localStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const addAddressHandler = async (address, postal_code, city, province) => {
    try {
        const response = await axios.post(process.env.BE_URL + '/user/add-address', { address, postal_code, city, province }, { headers: { cookie: `token=${localStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const editAddressHandler = async (address_id, address, postal_code, city, province) => {
    try {
        const response = await axios.put(process.env.BE_URL + '/user/edit-address', { address_id, address, postal_code, city, province }, { headers: { cookie: `token=${localStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const topUpSaldoHandler = async (saldo) => {
    try {
        const response = await axios.post(process.env.BE_URL + '/user/top-up', { saldo }, { headers: { cookie: `token=${localStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const openTokoHandler = async (nama_toko, toko_description) => {
    try {
        if (!nama_toko || !toko_description) throw new Error('All fields must be filled');
        if (nama_toko.match(/[^a-zA-Z0-9 ]/)) throw new Error('Nama toko cannot contain special characters');
        const response = await axios.post(process.env.BE_URL + '/user/open-toko', { nama_toko, toko_description }, { headers: { cookie: `token=${localStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}