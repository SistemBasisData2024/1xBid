const { pool } = require('../config/db.config');

exports.getNewestAuctions = async () => {
    try {
        const response = await pool.query('SELECT * FROM barang WHERE status = $1 ORDER BY start_time DESC LIMIT 3', ['Not Available']);
        if (response.rows.length === 0) throw new Error('No auctions found');
        return { message: 'Newest auctions fetched successfully', data: response.rows };
    } catch (error) {
        return { message: error.message };
    }
}

exports.getTopTrendingAuctions = async () => {
    try {
        const response = await pool.query('SELECT * FROM barang WHERE status = $1 ORDER BY bid_multiplier DESC LIMIT 3', ['Available']);
        if (response.rows.length === 0) throw new Error('No auctions found');
        return { message: 'Top trending auctions fetched successfully', data: response.rows };
    } catch (error) {
        return { message: error.message };
    }
}