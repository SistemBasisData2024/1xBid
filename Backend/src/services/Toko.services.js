const { pool } = require('../config/db.config');

exports.createToko = async (user_id, body) => {
    try {
        const { nama_toko, deskripsi } = body;
        const response = await pool.query('INSERT INTO toko (nama_toko, deskripsi, user_id) VALUES ($1, $2, $3) RETURNING *', [nama_toko, deskripsi, user_id]);
        return { message: 'Toko created successfully', data: response.rows[0] };
    } catch (error) {
        return { message: error.message };
    }
}

exports.getTokoById = async (params) => {
    try {
        const response = await pool.query('SELECT * FROM toko WHERE toko_id = $1', [params.toko_id]);
        return { message: 'Toko fetched successfully', data: response.rows[0] };
    } catch (error) {
        return { message: error.message };
    }
}

exports.updateToko = async (params, body) => {
    try {
        const { deskripsi } = body;
        const response = await pool.query('UPDATE toko SET deskripsi = $1 WHERE toko_id = $2 RETURNING *', [deskripsi, params.toko_id]);
        return { message: 'Toko updated successfully', data: response.rows[0] };
    } catch (error) {
        return { message: error.message };
    }
}

exports.deleteToko = async (params) => {
    try {
        const response = await pool.query('DELETE FROM toko WHERE toko_id = $1', [params.toko_id]);
        return { message: 'Toko deleted successfully', data: response.rows[0] };
    } catch (error) {
        return { message: error.message };
    }
}