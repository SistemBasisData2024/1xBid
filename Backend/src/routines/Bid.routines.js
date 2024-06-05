const { pool } = require('../config/db.config');

exports.updateStatus = async () => {
    try {
        const currentTime = new Date();
        const response = await pool.query('UPDATE barang SET status = $1 WHERE start_time < $2 AND end_time > $3 RETURNING *', ['On Bid', currentTime, currentTime]);
        // console.log(`Update status successfully at ${currentTime}`);
    }  catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

exports.bidWinner = async () => {
    try {
        const currentTime = new Date();
        const response = await pool.query('SELECT * FROM barang WHERE end_time < $1 AND status = $2', [currentTime, 'On Bid']);
        for(let i = 0; i < response.rows.length; i++) {
            const bidHistory = await pool.query('SELECT * FROM historybid WHERE barang_id = $1 ORDER BY bid_price DESC', [response.rows[i].barang_id]);
            if(bidHistory.rows.length > 0) {
                const winner = await pool.query('SELECT * FROM users WHERE user_id = $1', [bidHistory.rows[0].user_id]);
                const updateBarang = await pool.query('UPDATE barang SET status = $1, winner_id = $2 WHERE barang_id = $3 RETURNING *', ['Sold', winner.rows[0].user_id, response.rows[i].barang_id]);                
                const makeTransaksi = await pool.query('INSERT INTO transaksi (barang_id, user_id, toko_id, price) VALUES ($1, $2, $3, $4) RETURNING *', [response.rows[i].barang_id, winner.rows[0].user_id, response.rows[i].toko_id, bidHistory.rows[0].bid_price]);
            } else {
                const updateBarang = await pool.query('UPDATE barang SET status = $1 WHERE barang_id = $2 RETURNING *', ['Available', response.rows[i].barang_id]);
            }
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

exports.checkTransaksiTimeout = async () => {
    try {
        const currentTime = new Date();
        currentTime.setHours(currentTime.getHours() - 12); // Subtract 12 hours from the current time
        const response = await pool.query('SELECT * FROM transaksi WHERE status = $1 AND created_at < $2', ['Pending', currentTime]);
        for(let i = 0; i < response.rows.length; i++) {
            const updateTransaksi = await pool.query('UPDATE transaksi SET status = $1 WHERE transaksi_id = $2 RETURNING *', ['Failed', response.rows[i].transaksi_id]);
            const updateBarang = await pool.query('UPDATE barang SET status = $1 WHERE barang_id = $2 RETURNING *', ['Available', response.rows[i].barang_id]);
            const punishUser = await pool.query('UPDATE users SET bid_violation = bid_violation + 1 WHERE user_id = $1 RETURNING *', [response.rows[i].user_id]);
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}