const { pool } = require('../config/db.config');
const { io } = require('../config/ws.config');

exports.placeBid = async (user_id, params, body) => {
    try {
        const { barang_id } = params;
        const { last_price } = body;
        if (!last_price) throw new Error('Bid price is required');
        if (!user_id) throw new Error('User id is required');
        await pool.query('BEGIN');
        const checkBarang = await pool.query(`
        SELECT b.*, 
               COALESCE(hb.user_id, NULL) as highest_bidder 
        FROM barang b 
        LEFT JOIN historybid hb 
        ON b.barang_id = hb.barang_id AND hb.bid_price = (
            SELECT MAX(bid_price) 
            FROM historybid 
            WHERE barang_id = $1
        )
        WHERE b.barang_id = $1 AND b.status = $2
    `, [barang_id, 'On Bid']);

        if (checkBarang.rows.length === 0) throw new Error('Barang not found');
        const barang = checkBarang.rows[0];

        if (barang.last_price >= last_price) throw new Error('Bid price must be higher than current price');
        if (last_price % barang.bid_multiplier !== 0) throw new Error(`Bid price must be a multiple of ${barang.bid_multiplier}`);
        if (barang.highest_bidder === user_id) throw new Error('You are already the highest bidder. No need to place another bid.');

        const response = await pool.query('INSERT INTO historybid (barang_id, user_id, bid_price) VALUES ($1, $2, $3) RETURNING *', [barang_id, user_id, last_price]);
        if (response.rows.length === 0) throw new Error('Failed to place bid');

        const updateBarang = await pool.query('UPDATE barang SET last_price = $1 WHERE barang_id = $2 and status = $3 RETURNING *', [last_price, barang_id, 'On Bid']);
        if (updateBarang.rows.length === 0) throw new Error('Failed to update barang');
        await pool.query('COMMIT');

        io.emit('new_bid', { barang_id, user_id, last_price });

        return { message: 'Place bid successfully', bidData: response.rows[0], data: updateBarang.rows[0] }
    } catch (error) {
        return { message: error.message }
    }
}

exports.getBidHistory = async (params) => {
    try {
        const { barang_id } = params;
        const response = await pool.query('SELECT * FROM historybid WHERE barang_id = $1', [barang_id]);
        if (response.rows.length === 0) throw new Error('No bid history found');
        let bidderPromises = response.rows.map(async (row) => {
            const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [row.user_id]);
            return { username: user.rows[0].username, email: user.rows[0].email, bid_price: row.bid_price, bid_at: row.bid_at, user_id: row.user_id, fullname: user.rows[0].fullname }
        });

        let bidder = await Promise.all(bidderPromises);
        return { message: 'Get bid history successfully', data: response.rows, bidder }
    } catch (error) {
        return { message: error.message }
    }
}

exports.getBarang = async (params) => {
    try {
        const { barang_id } = params;
        const response = await pool.query('SELECT * FROM barang WHERE barang_id = $1', [barang_id]);
        if (response.rows.length === 0) throw new Error('Barang not found');
        return { message: 'Get barang successfully', data: response.rows[0] }
    } catch (error) {
        return { message: error.message }
    }
}