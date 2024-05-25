const jwt = require('jsonwebtoken');
const { pool } = require('../config/db.config');

exports.isNotSeller = async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const { barang_id } = req.params;
        // check if bidder is not seller, if seller send 'you cannot bid your own product' using join
        const response = await pool.query(`
            SELECT * 
            FROM barang 
            JOIN barangToko ON barang.barang_id = barangToko.barang_id 
            JOIN toko ON barangToko.toko_id = toko.toko_id 
            WHERE barang.barang_id = $1 AND toko.owner_id = $2
        `, [barang_id, user_id]);

        if (response.rows.length > 0) throw new Error('You cannot bid your own product');
        next();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}