const { pool } = require('../config/db.config');

exports.getBarang = async (params) => {
    try {
        const { barang_id } = params;
        const response = await pool.query('SELECT * FROM barang WHERE barang_id = $1', [barang_id]);
        return { message: 'Get barang successfully', data: response.rows[0] }
    } catch (error) {
        return { message: error.message }
    }
};

exports.updateBarang = async (params, body) => {
    try {
        const { ...barang } = body;
        const { barang_id } = params;
        if (!barang_id) throw new Error('Missing required field');

        const response = await pool.query('SELECT * FROM barang WHERE barang_id = $1', [barang_id]);
        if (response.rows.length === 0) throw new Error('Barang not found');

        if (response.rows[0].start_time < new Date()) throw new Error('Barang has been started, cannot update Barang');

        const fields = [];
        const values = [];
        for (const [key, value] of Object.entries(barang)) {
            fields.push(key);
            values.push(value);
        };

        if (fields.length === 0) throw new Error('Missing required field');

        const query = `UPDATE barang SET ${fields.map((field, index) => `${field} = $${index + 1}`).join(', ')} WHERE barang_id = $${fields.length + 1} RETURNING *`;
        const updateResponse = await pool.query(query, [...values, barang_id]);
        if (updateResponse.rows.length === 0) throw new Error('Failed to update barang');

        return { message: 'Update barang successfully', data: updateResponse.rows[0] }
    } catch (error) {
        return { message: error.message };
    }
};

exports.deteleBarang = async (params) => {
    try {
        const { barang_id } = params;
        const response = await pool.query('DELETE FROM barang WHERE barang_id = $1', [barang_id]);
        return { message: 'Delete barang successfully', data: response.rows[0] }
    } catch (error) {
        return { message: error.message }
    }
};