const { pool } = require('../config/db.config');

exports.createTransaksi = async (user_id, params, body) => {
    try {
        const { price, payment_option } = body;
        if (!price || !payment_option) throw new Error('Missing required field');

        const { barang_id, toko_id } = params;
        const response = await pool.query('INSERT INTO transaksi (user_id, barang_id, toko_id, price, payment_option) VALUES ($1, $2, $3, $4, $5) RETURNING *', [user_id, barang_id, toko_id, price, payment_option]);
        if (response.rows.length === 0) throw new Error('Failed to create transaksi');

        return { message: 'Transaksi created successfully', data: response.rows[0] }
    } catch (error) {
        return { message: error.message }
    }
}

exports.getTransaksi = async (user_id, params) => {
    try {
        const { transaksi_id } = params;
        if (!transaksi_id) throw new Error('Missing required field');
        const response = await pool.query('SELECT * FROM transaksi WHERE transaksi_id = $1 AND user_id = $2', [transaksi_id, user_id]);
        if (response.rows.length === 0) throw new Error('Transaksi not found');

        return { message: 'Get transaksi successfully', data: response.rows[0] }
    } catch (error) {
        return { message: error.message }
    }
}

exports.updateTransaksi = async () => {
    try {

    } catch (error) {
        return { message: error.message }
    }
}

exports.getBidViolation = async (user_id, params, body) => {
    try {
        const { status } = body;
        if (!status) throw new Error('Missing required field');

        const { transaksi_id } = params;
        if (!transaksi_id) throw new Error('Missing required field');

    } catch (error) {
        return { message: error.message }
    }
}