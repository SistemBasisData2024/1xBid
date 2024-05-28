const { pool } = require('../config/db.config');

exports.keepDBAlive = async () => {
    try {
        await pool.query('SELECT 1');
    } catch (error) {
        console.error(error);
    }
};