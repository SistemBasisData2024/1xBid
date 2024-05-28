import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

exports.handleRegister = async () => {
    try {
        const response = await axios.post(process.env.BE_URL + '/auth/register', {})
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

exports.handleLogin = async (username, email, password) => {
    try {
        const response = await axios.post(process.env.BE_URL + '/auth/login', { username, password, email });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

exports.handleGetUserProfile = async () => {
    try {
        const response = await axios.get(process.env.BE_URL + '/user/profile', { headers: { cookie: `token=${localStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

exports.handleUpdateUserProfile = async (body) => {
    try {
        const response = await axios.put(process.env.BE_URL + '/user/profile', body, { headers: { cookie: `token=${localStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

exports.handleDeleteUserProfile = async () => {
    try {
        const response = await axios.delete(process.env.BE_URL + '/user/profile', { headers: { cookie: `token=${localStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

exports.handleAddAddress = async (address, postal_code, city, province) => {
    try {
        const response = await axios.post(process.env.BE_URL + '/user/add-address', { address, postal_code, city, province }, { headers: { cookie: `token=${localStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

exports.handleEditAddress = async (address_id, address, postal_code, city, province) => {
    try {
        const response = await axios.put(process.env.BE_URL + '/user/edit-address', { address_id, address, postal_code, city, province }, { headers: { cookie: `token=${localStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

exports.handleTopUpSaldo = async (saldo) => {
    try {
        const response = await axios.post(process.env.BE_URL + '/user/top-up', { saldo }, { headers: { cookie: `token=${localStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

exports.handleOpenToko = async (nama_toko, deskripsi) => {
    try {
        const response = await axios.post(process.env.BE_URL + '/user/open-toko', { nama_toko, deskripsi }, { headers: { cookie: `token=${localStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}