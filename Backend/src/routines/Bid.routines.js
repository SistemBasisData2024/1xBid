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
                const updateBarang = await pool.query('UPDATE barang SET status = $1 WHERE barang_id = $3 RETURNING *', ['Sold', response.rows[i].barang_id]);
                // console.log(`Update winner successfully at ${currentTime}`);
            } else {
                const updateBarang = await pool.query('UPDATE barang SET status = $1 WHERE barang_id = $2 RETURNING *', ['Available', response.rows[i].barang_id]);
                // console.log(`Update failed status successfully at ${currentTime}`);
            }
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}