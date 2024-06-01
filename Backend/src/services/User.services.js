const { pool } = require('../config/db.config');
const bcrypt = require('bcrypt');

exports.getUserProfile = async (user_id) => {
    try {
        const responseUser = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
        if (responseUser.rows.length === 0) throw new Error('User not found');
        delete responseUser.rows[0].password;
        const responseAddress = await pool.query('SELECT * FROM addresses WHERE user_id = $1', [user_id]);
        const address = responseAddress.rows;
        return { message: 'User profile fetched successfully', data: { user: responseUser.rows[0], address } };
    } catch (error) {
        return { message: error.message };
    }
}

exports.updateUserProfile = async (user_id, body) => {
    try {
        const { ...user } = body;
        if (!user_id) throw new Error('Missing required field');

        if (user.role && user.role === 'Admin') throw new Error('Forbidden');

        if (user.account_status) delete user.account_status;

        if(user.password) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
        }

        const fields = [];
        const values = [];
        for (const [key, value] of Object.entries(user)) {
            fields.push(key);
            values.push(value);
        };

        if (fields.length === 0) throw new Error('Missing required field');

        const query = `UPDATE users SET ${fields.map((field, index) => `${field} = $${index + 1}`).join(', ')} WHERE user_id = $${fields.length + 1} RETURNING *`;
        const updateResponse = await pool.query(query, [...values, user_id]);
        if (updateResponse.rows.length === 0) throw new Error('Failed to update user');

        return { message: 'User profile updated successfully', data: updateResponse.rows[0] };
    } catch (error) {
        return { message: error.message };
    }
}

exports.deleteUserProfile = async (user_id) => {
    try {
        if (!user_id) throw new Error('Missing required field');

        const query = 'UPDATE users SET account_status = $1 WHERE user_id = $2 RETURNING *';
        const updateResponse = await pool.query(query, ['Deleted', user_id]);
        if (updateResponse.rows.length === 0) throw new Error('Failed to delete user');


        return { message: 'User profile deleted successfully', data: updateResponse.rows[0] };
    } catch (error) {
        return { message: error.message };
    }
}

exports.addAddress = async (user_id, body) => {
    try {
        const { address, postal_code, city, province } = body;
        if (!user_id) throw new Error('Missing required field');
        if (!address || !postal_code || !city || !province) throw new Error('Missing required field');

        const addressResponse = await pool.query('INSERT INTO addresses (user_id, address, postal_code, city, province) VALUES ($1, $2, $3, $4, $5) RETURNING *', [user_id, address, postal_code, city, province]);
        return { message: 'Address added successfully', data: addressResponse.rows[0] };
    } catch (error) {
        return { message: error.message };
    }
}

exports.editAddress = async (user_id, body) => {
    try {
        const { address_id, address, postal_code, city, province } = body;
        if (!user_id) throw new Error('Missing required field');
        if (!address_id || !address || !postal_code || !city || !province) throw new Error('Missing required field');

        const response = await pool.query('SELECT * FROM addresses WHERE address_id = $1', [address_id]);
        if (response.rows.length === 0) throw new Error('Address not found');

        const query = 'UPDATE addresses SET address = $1, postal_code = $2, city = $3, province = $4 WHERE address_id = $5 RETURNING *';
        const updateResponse = await pool.query(query, [address, postal_code, city, province, address_id]);
        if (updateResponse.rows.length === 0) throw new Error('Failed to update address');

        return { message: 'Address updated successfully', data: updateResponse.rows[0] };
    } catch (error) {
        return { message: error.message };
    }
}

exports.topUpSaldo = async (user_id, body) => {
    try {
        const { saldo } = body;
        if (!user_id) throw new Error('Missing user_id field');
        if (!saldo) throw new Error('Missing required field');

        const query = 'UPDATE users SET saldo = saldo + $1 WHERE user_id = $2 RETURNING *';
        const updateResponse = await pool.query(query, [saldo, user_id]);
        if (updateResponse.rows.length === 0) throw new Error('Failed to top up saldo');

        return { message: 'Saldo topped up successfully', data: updateResponse.rows[0] };
    } catch (error) {
        return { message: error.message };
    }
}

exports.openToko = async (user_id, body) => {
    try {
        const { nama_toko, deskripsi } = body;
        if (!user_id) throw new Error('Missing required field');
        if (!nama_toko || !deskripsi) throw new Error('Missing required field');

        const tokoResponse = await pool.query('INSERT INTO toko (nama_toko, deskripsi, owner_id) VALUES ($1, $2, $3) RETURNING *', [nama_toko, deskripsi, user_id]);
        if(tokoResponse.rows.length === 0) throw new Error('Failed to create toko');
        return { message: 'Toko created successfully', data: tokoResponse.rows[0] };
    } catch (error) {
        return { message: error.message };
    }
}