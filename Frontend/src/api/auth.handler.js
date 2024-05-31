import axios from 'axios';


export const registerHandler = async (username, email, fullname, password, date_of_birth, phone_number) => {
    try {
        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) throw new Error('Invalid email');
        if (username.match(/[^a-zA-Z0-9]/)) throw new Error('Invalid username');
        if (phone_number.match(/[^0-9]/) || phone_number.length > 12) throw new Error('Invalid phone number');
        const response = await axios.post('localhost/5000' + '/auth/register', { username, email, fullname, password, date_of_birth, phone_number });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const loginHandler = async (username, email, password) => {
    try {
        if(email && !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) throw new Error('Invalid email');
        if(username && username.match(/[^a-zA-Z0-9]/)) throw new Error('Invalid username');
        const response = await axios.post(process.env.BE_URL + '/auth/login', { username, email, password });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}