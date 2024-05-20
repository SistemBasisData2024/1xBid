const { pool } = require('../config/db.config');
const { authenticate } = require('../utils/Auth.utils');

exports.getUserProfile = async (user_id) => {
    try {
        const response = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
        return { message: 'User profile fetched successfully', data: response.rows[0] };
    } catch (error) {
        return { message: error.message, data: null };
    }
}

exports.updateUserProfile = async (user_id, body) => {
    try {
        const { fullname, phone_number, address, email } = body;
        const newFullname = fullname || user.rows[0].fullname;
        const newPhoneNumber = phone_number || user.rows[0].phone_number;
        const newAddress = address || user.rows[0].address;
        const newEmail = email || user.rows[0].email;

        const response = await pool.query('UPDATE users SET fullname = $1, phone_number = $2, address = $3, email = $4 WHERE user_id = $5 RETURNING *', [newFullname, newPhoneNumber, newAddress, newEmail, user_id]);
        return { message: 'User profile updated successfully', data: response.rows[0] };
    } catch (error) {
        return { message: error.message, data: null };
    }
}

exports.deleteUserProfile = async (user_id) => {
    try {
        const response = await pool.query('DELETE FROM users WHERE user_id = $1', [user_id]);
        return { message: 'User profile deleted successfully', data: response.rows[0] };
    } catch (error) {
        return { message: error.message, data: null };
    }
}