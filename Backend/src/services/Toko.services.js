const { pool } = require('../config/db.config');

exports.getTokoById = async (params) => {
    try {
        const { toko_id } = params;
        if(!toko_id) throw new Error('Toko id is required');
        const response = await pool.query('SELECT * FROM toko WHERE toko_id = $1', [toko_id]);
        if(response.rows.length === 0) throw new Error('Toko not found');

        return { message: 'Toko fetched successfully', data: response.rows[0] };
    } catch (error) {
        return { message: error.message };
    }
}

exports.updateToko = async (params, body) => {
    try {
        const { deskripsi } = body;
        const { toko_id } = params;
        if(!deskripsi) throw new Error('Deskripsi is required');
        if(!toko_id) throw new Error('Toko id is required');

        const response = await pool.query('UPDATE toko SET deskripsi = $1 WHERE toko_id = $2 RETURNING *', [deskripsi, toko_id]);
        if(response.rows.length === 0) throw new Error('Failed to update toko');

        return { message: 'Toko updated successfully', data: response.rows[0] };
    } catch (error) {
        return { message: error.message };
    }
}

exports.deleteToko = async (params) => {
    try {
        const { toko_id } = params;
        if(!toko_id) throw new Error('Toko id is required');

        const response = await pool.query('DELETE FROM toko WHERE toko_id = $1', [toko_id]);
        if(response.rowCount === 0) throw new Error('Failed to delete toko');

        return { message: 'Toko deleted successfully', data: response.rows[0] };
    } catch (error) {
        return { message: error.message };
    }
}

exports.createBarang = async (params, body) => {
    try {
        const { nama_barang, deskripsi, harga_awal, start_time, end_time, kategori, bid_multiplier } = body;
        const { toko_id } = params;
        if (!nama_barang || !deskripsi || !harga_awal || !start_time || !end_time || !kategori || !bid_multiplier) throw new Error('Missing required field');

        const status = 'Not Available';
        const response = await pool.query('INSERT INTO barang (nama_barang, deskripsi, harga_awal, start_time, end_time, kategori, bid_multiplier, status, toko_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [nama_barang, deskripsi, harga_awal, start_time, end_time, kategori, bid_multiplier, status, toko_id]);
        if (response.rows.length === 0) throw new Error('Failed to create barang');

        const barangTokoResponse = await pool.query('INSERT INTO barangToko (barang_id, toko_id) VALUES ($1, $2) RETURNING *', [response.rows[0].barang_id, toko_id]);
        if (barangTokoResponse.rows.length === 0) throw new Error('Failed to create barang');
        
        return { message: 'Create barang successfully', data: response.rows[0] }
    } catch (error) {
        return { message: error.message }
    }
}

exports.editBarang = async (params, body) => {
    try {
        const { ...barang } = body;
        const { toko_id, barang_id } = params;
        if (!barang_id) throw new Error('Missing required field');

        const isBarangValid = await pool.query('SELECT * FROM barangToko WHERE barang_id = $1 AND toko_id = $2', [barang_id, toko_id]);
        if (isBarangValid.rows.length === 0) throw new Error('No barang found');

        const isBarangInDB = await pool.query('SELECT * FROM barang WHERE barang_id = $1', [barang_id]);
        if (isBarangInDB.rows.length === 0) throw new Error('Barang not found');

        if (isBarangInDB.rows[0].start_time < new Date()) throw new Error('Barang has been started, cannot update Barang');

        const fields = [];
        const values = [];

        for (const [key, value] of Object.entries(barang)) {
            fields.push(key);
            values.push(value);
        }

        if (fields.length === 0) throw new Error('Missing required field');

        const query = `UPDATE barang SET ${fields.map((field, index) => `${field} = $${index + 1}`).join(', ')} WHERE barang_id = $${fields.length + 1} RETURNING *`;
        const response = await pool.query(query, [...values, barang_id]);
        if (response.rows.length === 0) throw new Error('Failed to edit barang');

        return { message: 'Edit barang successfully', data: response.rows[0] }
    } catch (error) {
        return { message: error.message }
    }
}

exports.deleteBarang = async (params) => {
    try {
        const { toko_id, barang_id } = params;
        if(!barang_id) throw new Error('Missing required field');

        const isBarangValid = await pool.query('SELECT * FROM barangToko WHERE barang_id = $1 AND toko_id = $2', [barang_id, toko_id]);
        if (isBarangValid.rows.length === 0) throw new Error('No barang found');

        const response = await pool.query('UPDATE barang SET status = $1 WHERE barang_id = $2 RETURNING *', ['Deleted', barang_id]);
        if (response.rows.length === 0) throw new Error('Failed to delete barang');

        return { message: 'Delete barang successfully', data: response.rows[0] }
    } catch (error) {
        return { message: error.message }
    }
}