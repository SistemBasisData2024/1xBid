import axios from 'axios';

const BE_URL = import.meta.env.VITE_BE_URL;

export const getUserHandler = async () => {
    try {
        const response = await axios.get(BE_URL + '/user/profile', { headers: { cookies: `token=${localStorage.getItem('token')}` } });
        console.log(response.data);
        if(response.status !== 200) throw new Error('Failed to fetch user data');
        if(response.status === 401) throw new Error('Unauthorized');
        if(response.data.data.toko) return { message: response.data.message, user: response.data.data.user, address: response.data.data.address, toko: response.data.data.toko };
        return { message: response.data.message, user: response.data.data.user, address: response.data.data.address };
    } catch (error) {
        return false;
    }
}

export const updateUserHandler = async (body) => {
    try {
        const response = await axios.put(BE_URL + '/user/profile', body, { headers: { cookies: `token=${localStorage.getItem('token')}` } });
        if(response.status !== 200) throw new Error('Failed to update user data');
        return response.data;
    } catch (error) {
        return { message: error.message };
    }
}

export const deleteUserHandler = async () => {
    try {
        const response = await axios.delete(BE_URL + '/user/profile', { headers: { cookies: `token=${localStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        return false;
    }
}

export const addAddressHandler = async (address, postal_code, city, province) => {
    try {
        const response = await axios.post(BE_URL + '/user/add-address', { address, postal_code, city, province }, { headers: { cookies: `token=${localStorage.getItem('token')}` } });
        if(response.status !== 200) throw new Error('Failed to add address');
        return response.data;
    } catch (error) {
        return false;
    }
}

export const editAddressHandler = async (address_id, address, postal_code, city, province) => {
    try {
        const response = await axios.put(BE_URL + '/user/edit-address', { address_id, address, postal_code, city, province }, { headers: { cookies: `token=${localStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const topUpSaldoHandler = async (saldo) => {
    try {
        const response = await axios.post(BE_URL + '/user/top-up', { saldo }, { headers: { cookies: `token=${localStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const openTokoHandler = async (nama_toko, deskripsi) => {
    try {
        if (!nama_toko || !deskripsi) throw new Error('All fields must be filled');
        if (nama_toko.match(/[^a-zA-Z0-9 ]/)) throw new Error('Nama toko cannot contain special characters');
        const response = await axios.post(BE_URL + '/user/open-toko', { nama_toko, deskripsi }, { headers: { cookies: `token=${localStorage.getItem('token')}` } });
        return response.data.data;
    } catch (error) {
        return false
    }
}