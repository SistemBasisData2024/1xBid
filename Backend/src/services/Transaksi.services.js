const { pool } = require('../config/db.config');

exports.createTransaksi = async (user_id, params, body) => {
    try {
        const { transaksi_id } = params;
        const { address_id, payment_option } = body;
        if (!transaksi_id) throw new Error('Missing required field');
        const response = await pool.query('SELECT * FROM transaksi WHERE transaksi_id = $1 AND user_id = $2', [transaksi_id, user_id]);
        if (response.rows.length === 0) throw new Error('Transaksi not found');

        const updateSaldo = await pool.query('UPDATE users SET saldo = saldo - $1 WHERE user_id = $2 RETURNING *', [response.rows[0].price, user_id]);
        if (updateSaldo.rows.length === 0) throw new Error('Failed to update saldo user');

        const checkAddress = await pool.query('SELECT * FROM address WHERE address_id = $1 AND user_id = $2', [address_id, user_id]);
        if (checkAddress.rows.length === 0) throw new Error('Address not found');

        const updateTransaksi = await pool.query('UPDATE transaksi SET status = $1, address_id = $2, payment_option = $3, payment_at = $4 WHERE transaksi_id = $5 RETURNING *', ['Success', address_id, payment_option, new Date(), transaksi_id]);
        if (updateTransaksi.rows.length === 0) throw new Error('Failed to update transaksi')

        return { message: 'Transaksi success', data: updateTransaksi.rows[0] }
    } catch (error) {
        return { message: error.message }
    }
}

exports.getTransaksiDetail = async (user_id, params) => {
    try {
        const { transaksi_id } = params;
        const response = await pool.query('SELECT * FROM transaksi WHERE transaksi_id = $1 AND user_id = $2', [transaksi_id, user_id]);
        if (response.rows.length === 0) throw new Error('Transaksi not found');

        const barang = await pool.query('SELECT * FROM barang WHERE barang_id = $1', [response.rows[0].barang_id]);
        if (barang.rows.length === 0) throw new Error('Barang not found');
        const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [response.rows[0].user_id]);
        if (user.rows.length === 0) throw new Error('User not found');
        const pembeli = { nama: user.rows[0].fullname, email: user.rows[0].email, phone_number: user.rows[0].phone_number, saldo: user.rows[0].saldo};
        const toko = await pool.query('SELECT * FROM toko WHERE toko_id = $1', [response.rows[0].toko_id]);
        if (toko.rows.length === 0) throw new Error('Toko not found');
        const tokoData = { nama: toko.rows[0].nama_toko };
        
        let address = null;
        if (response.rows[0].address_id) {
            const addressData = await pool.query('SELECT * FROM address WHERE address_id = $1', [response.rows[0].address_id]);
            if (addressData.rows.length > 0) address = addressData.rows[0];
        }

        return { message: 'Transaksi detail', data: { barang: barang.rows[0], pembeli, toko: tokoData, transaksi: response.rows[0], address } }
    } catch (error) {
        return { message: error.message }
    }
}

exports.getTransaksi = async (user_id) => {
    try {
        const response = await pool.query('SELECT * FROM transaksi WHERE user_id = $1', [user_id]);
        if (response.rows.length === 0) throw new Error('Transaksi not found');
        return { message: 'Transaksi found', data: response.rows }
    } catch (error) {
        return { message: error.message }
    }
}

exports.cancelTransaksi = async (user_id, params) => {
    try {
        const { transaksi_id } = params;
        const response = await pool.query('SELECT * FROM transaksi WHERE transaksi_id = $1 AND user_id = $2', [transaksi_id, user_id]);
        if (response.rows.length === 0) throw new Error('Transaksi not found');
        
        const updateTransaksi = await pool.query('UPDATE transaksi SET status = $1 WHERE transaksi_id = $2 RETURNING *', ['Failed', transaksi_id]);
        if (updateTransaksi.rows.length === 0) throw new Error

        const updateBarang = await pool.query('UPDATE barang SET status = $1 WHERE barang_id = $2 RETURNING *', ['Available', response.rows[0].barang_id]);
        if (updateBarang.rows.length === 0) throw new Error('Failed to update barang');

        const updateSaldo = await pool.query('UPDATE users SET saldo = saldo + $1 WHERE user_id = $2 RETURNING *', [response.rows[0].price, user_id]);
        if (updateSaldo.rows.length === 0) throw new Error('Failed to update saldo user');

        const punishUser = await pool.query('UPDATE users SET bid_violation = bid_violation + 1 WHERE user_id = $1 RETURNING *', [user_id]);
        if (punishUser.rows.length === 0) throw new Error('Failed to punish user');

        return { message: 'Transaksi canceled', data: updateTransaksi.rows[0] }
    } catch (error) {
        return { message: error.message }
    }
}