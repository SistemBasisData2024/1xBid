import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

exports.registerHandler = async (username, email, fullname, password, date_of_birth, phone_number) => {
    try {
        const response = await axios.post(process.env.BE_URL + '/auth/register', { username, email, fullname, password, date_of_birth, phone_number });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

exports.loginHandler = async (username, email, password) => {
    try {
        const response = await axios.post(process.env.BE_URL + '/auth/login', { username, email, password });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}