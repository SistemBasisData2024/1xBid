import axios from 'axios';

const BE_URL = import.meta.env.VITE_BE_URL;

export const registerHandler = async (username, email, fullname, password, date_of_birth, phone_number) => {
    try {
        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) throw new Error('Invalid email');
        if (username.match(/[^a-zA-Z0-9]/)) throw new Error('Invalid username');
        if (phone_number.match(/[^0-9]/) || phone_number.length > 12) throw new Error('Invalid phone number');
        const response = await axios.post(BE_URL + '/auth/register', { username, email, fullname, password, date_of_birth, phone_number });
        if (response.status !== 200) throw new Error(response.data.message);
        return { message: response.data.message, data: response.data.user }
    } catch (error) {
        return { message: error.message }
    }
};

export const loginHandler = async (usernameOrEmail, password) => {
    try {
        if (!usernameOrEmail) throw new Error('Username or email is required');

        let email = null;
        let username = null;

        if (usernameOrEmail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            email = usernameOrEmail;
        } else if (usernameOrEmail.match(/^[a-zA-Z0-9]+$/)) {
            username = usernameOrEmail;
        } else {
            throw new Error('Invalid username or email');
        }

        const response = await axios.post(BE_URL + '/auth/login', { username, email, password });

        if (response.status !== 200) throw new Error(response.data.message);

        return response.data;
    } catch (error) {
        return { message: error.message };
    }
}

export const logoutHandler = async () => {
    try {
        const response = await axios.post(BE_URL + '/auth/logout', { headers: { cookies: `token=${localStorage.getItem('token')}` } });
        console.log(response);
        if (response.status !== 200) throw new Error(response.data.message);
        return response.data;
    } catch (error) {
        return { message: error.message }
    }
}