import axios from 'axios';

const BE_URL = import.meta.env.VITE_BE_URL;

export const placeBid = async (barang_id, last_price) => {
    try {
        const response = await axios.post(BE_URL + '/bid/place/' + barang_id, { last_price }, { headers: { cookies: `token=${localStorage.getItem('token')}` } });
        if (response.data.message !== 'Place bid successfully') throw new Error('Failed to place bid');
        return response.data;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

export const getBidHistory = async (barang_id) => {
    try {
        const response = await axios.get(BE_URL + '/bid/history/' + barang_id);
        if (response.status !== 200) throw new Error('Failed to fetch bid history');
        return response.data;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

export const getBarang = async (barang_id) => {
    try {
        const response = await axios.get(BE_URL + '/bid/' + barang_id);
        console.log(response.data);
        if (response.status !== 200) throw new Error('Failed to fetch barang data');
        return response.data;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}