const { pool } = require('../config/db.config');

exports.placeBid = async (user_id, params, body) => {
    try {
        const { barang_id } = params;
        const { last_price } = body;
        if(!last_price) throw new Error('Bid price is required');
        if(!user_id) throw new Error('User id is required');
        const checkBarang = await pool.query('SELECT * FROM barang WHERE barang_id = $1', [barang_id]);
        if(checkBarang.rows.length === 0) throw new Error('Barang not found');
        if(checkBarang.rows[0].last_price >= last_price) throw new Error('Bid price must be higher than current price');
        if(last_price % checkBarang.rows[0].bid_multiplier !== 0) throw new Error(`Bid price must be a multiple of ${checkBarang.rows[0].bid_multiplier}`);

        const response = await pool.query('INSERT INTO historybid (barang_id, user_id, bid_price) VALUES ($1, $2, $3) RETURNING *', [barang_id, user_id, last_price]);
        const updateBarang = await pool.query('UPDATE barang SET last_price = $1 WHERE barang_id = $2 RETURNING *', [last_price, barang_id]);
        return { message: 'Place bid successfully', bidData: response.rows[0], data: updateBarang.rows[0] }
    } catch (error) {
        return { message: error.message }
    }
}

exports.getBidHistory = async (params) => {
    try {
        const { barang_id } = params;
        const response = await pool.query('SELECT * FROM historybid WHERE barang_id = $1', [barang_id]);
        return { message: 'Get bid history successfully', data: response.rows }
    } catch (error) {
        return { message: error.message }
    }
}