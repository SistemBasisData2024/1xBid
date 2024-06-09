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

        const checkAddress = await pool.query('SELECT * FROM addresses WHERE address_id = $1 AND user_id = $2', [address_id, user_id]);
        if (checkAddress.rows.length === 0) throw new Error('Address not found');
        
        const updateTransaksi = await pool.query('UPDATE transaksi SET address_id = $1, payment_option = $2, status = $3 WHERE transaksi_id = $4 RETURNING *', [address_id, payment_option, 'Success', transaksi_id]);
        if (updateTransaksi.rows.length === 0) throw new Error('Failed to update transaksi')


        return { message: 'Transaksi success', data: updateTransaksi.rows[0] }
    } catch (error) {
        return { message: error.message }
    }
}

exports.getTransaksiDetail = async (user_id, params) => {
    try {
        const { transaksi_id } = params;
        const transaksiResponse = await pool.query('SELECT * FROM transaksi WHERE transaksi_id = $1 AND user_id = $2', [transaksi_id, user_id]);
        if (transaksiResponse.rows.length === 0) throw new Error('Transaksi not found');

        const barangResponse = await pool.query('SELECT * FROM barang WHERE barang_id = $1', [transaksiResponse.rows[0].barang_id]);
        if (barangResponse.rows.length === 0) throw new Error('Barang not found');

        const userResponse = await pool.query('SELECT * FROM users WHERE user_id = $1', [transaksiResponse.rows[0].user_id]);
        if (userResponse.rows.length === 0) throw new Error('User not found');

        const tokoResponse = await pool.query('SELECT * FROM toko WHERE toko_id = $1', [transaksiResponse.rows[0].toko_id]);
        if (tokoResponse.rows.length === 0) throw new Error('Toko not found');

        const addressResponse = await pool.query('SELECT * FROM addresses WHERE user_id = $1', [transaksiResponse.rows[0].user_id]);
        if (addressResponse.rows.length === 0) return null;

        return {
            message: 'Transaksi detail', data: { transaksi: transaksiResponse.rows[0], barang: barangResponse.rows[0], user: userResponse.rows[0], toko: tokoResponse.rows[0], address: addressResponse.rows}
        }
    } catch (error) {
        return { message: error.message }
    }
}

exports.getTransaksi = async (user_id) => {
    try {
        const userTransaction = await pool.query('SELECT * FROM transaksi WHERE user_id = $1', [user_id]);
        if (userTransaction.rows.length === 0) throw new Error('Transaksi not found');

        let barangPromises = userTransaction.rows.map(async (row) => {
            const barang = await pool.query('SELECT * FROM barang WHERE barang_id = $1', [row.barang_id]);
            return barang.rows[0];
        });

        let tokoPromises = userTransaction.rows.map(async (row) => {
            const toko = await pool.query('SELECT * FROM toko WHERE toko_id = $1', [row.toko_id]);
            return toko.rows[0];
        });

        let addressPromises = userTransaction.rows.map(async (row) => {
            if (row.address_id) {
                const address = await pool.query('SELECT * FROM addresses WHERE address_id = $1', [row.address_id]);
                return address.rows[0];
            }
            return null;
        });

        let barang = await Promise.all(barangPromises);
        let toko = await Promise.all(tokoPromises);
        let address = await Promise.all(addressPromises);

        let transaksi = userTransaction.rows.map((row, index) => {
            return { barang: barang[index], toko: toko[index], transaksi: row, address: address[index] }
        });

        return { message: 'Transaksi found', data: transaksi }
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

exports.getAddress = async (user_id) => {
    try {
        const response = await pool.query('SELECT * FROM addresses WHERE user_id = $1', [user_id]);
        if (response.rows.length === 0) throw new Error('Address not found');
        return { message: 'Address found', data: response.rows }
    } catch (error) {
        return { message: error.message }
    }
}