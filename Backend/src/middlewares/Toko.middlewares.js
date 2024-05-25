const jwt = require('jsonwebtoken');
const { pool } = require('../config/db.config');

exports.isTokoOwner = async (req, res, next) => {
    try {
        const token = req.headers.cookie.split('=')[1];
        if(!token) throw new Error('Token is required');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user_id = decoded.user_id;
        const { toko_id } = req.params;
        if(!toko_id) throw new Error('Toko id is required');

        const response = await pool.query('SELECT * FROM toko WHERE toko_id = $1 AND owner_id = $2', [toko_id, user_id]);
        if(response.rows.length === 0) throw new Error('Unauthorized');
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.isAlreadyTokoOwner = async (req, res, next) => {
    try {
        const token = req.headers.cookie.split('=')[1];
        if(!token) throw new Error('Token is required');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user_id = decoded.user_id;

        const response = await pool.query('SELECT * FROM toko WHERE owner_id = $1', [user_id]);
        if(response.rows.length > 0) throw new Error('You already have a toko');
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}