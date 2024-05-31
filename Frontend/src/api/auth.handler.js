import axios from 'axios';

<<<<<<< HEAD
=======
const BE_URL = import.meta.env.VITE_BE_URL;
>>>>>>> 8936e655b7fec74710da4b4ebf9f6363cae4a20d

export const registerHandler = async (username, email, fullname, password, date_of_birth, phone_number) => {
    try {
        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) throw new Error('Invalid email');
        if (username.match(/[^a-zA-Z0-9]/)) throw new Error('Invalid username');
        if (phone_number.match(/[^0-9]/) || phone_number.length > 12) throw new Error('Invalid phone number');
<<<<<<< HEAD
        const response = await axios.post('localhost/5000' + '/auth/register', { username, email, fullname, password, date_of_birth, phone_number });
        return response.data;
=======
        const response = await axios.post(BE_URL + '/auth/register', { username, email, fullname, password, date_of_birth, phone_number });
        if(response.status !== 200) throw new Error(response.data.message);
        return { message: response.data.message, data: response.data.user}
>>>>>>> 8936e655b7fec74710da4b4ebf9f6363cae4a20d
    } catch (error) {
        return { message: error.message }
    }
};

export const loginHandler = async (username, email, password) => {
    try {
        if (email && !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) throw new Error('Invalid email');
        if (username && username.match(/[^a-zA-Z0-9]/)) throw new Error('Invalid username');
        const response = await axios.post(BE_URL + '/auth/login', { username, email, password });
        if(response.status !== 200) throw new Error(response.data.message);
        return response.data;
    } catch (error) {
        return { message: error.message }
    }
}

export const logoutHandler = async () => {
    try {
        const response = await axios.post(BE_URL + '/auth/logout', { headers: { cookies: `token=${localStorage.getItem('token')}` } });
        console.log(response);
        if(response.status !== 200) throw new Error(response.data.message);
        return response.data;
    } catch (error) {
        return { message: error.message }
    }
}