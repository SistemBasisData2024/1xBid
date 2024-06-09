import axios from 'axios';

const BE_URL = import.meta.env.VITE_BE_URL;

export const createTransaksiHandler = async (transaksi_id, address_id, payment_method) => {
    try {
        const response = await axios.post(BE_URL + `/transaksi/${transaksi_id}`, { address_id, payment_method }, { headers: { cookies: `token=${localStorage.getItem('token')}` } });
        if (response.status !== 200) throw new Error('Failed to create transaksi');
        return response.data;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const getTransaksiDetailHandler = async (transaksi_id) => {
    try {
        const response = await axios.get(BE_URL + `/transaksi/${transaksi_id}`, { headers: { cookies: `token=${localStorage.getItem('token')}` } });
        if (response.status !== 200) throw new Error('Failed to fetch transaksi detail');
        return response.data;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const getTransaksiHandler = async () => {
    try {
        const response = await axios.get(BE_URL + '/transaksi', { headers: { cookies: `token=${localStorage.getItem('token')}` } });
        if (response.status !== 200) throw new Error('Failed to fetch transaksi data');
        return response.data;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const cancelTransaksi = async (transaksi_id) => {
    try {
        const response = await axios.delete(BE_URL + `/transaksi/${transaksi_id}`, { headers: { cookies: `token=${localStorage.getItem('token')}` } });
        if (response.status !== 200) throw new Error('Failed to cancel transaksi');
        return response.data;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const getAddressHandler = async () => {
    try {
        const response = await axios.get(BE_URL + '/transaksi/address', { headers: { cookies: `token=${localStorage.getItem('token')}` } });
        if (response.data.message === 'Address not found') throw new Error('Address not found');
        if (response.status !== 200) throw new Error('Failed to fetch address');
        return response.data;
    } catch (error) {
        console.error(error);
        return false;
    }
}