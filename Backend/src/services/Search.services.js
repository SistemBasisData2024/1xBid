const { pool } = require('../config/db.config');

exports.search = async (searchQuery) => {
    try {
        const response = await pool.query('SELECT * FROM barang WHERE nama_barang ILIKE $1', [`%${searchQuery}%`]);
        return response.rows;
    } catch (error) {
        return { message: error.message };
    }
}