const { pool } = require('../config/db.config');

exports.createBarang = async (body) => {
    // try {
    //     const { nama_barang, deskripsi }
    // } catch (error) {
    //     return { message: error.message }
    // }
};

exports.getBarang = async (params) => {
    try {
        const { barang_id } = params;
        const response = await pool.query('SELECT * FROM barang WHERE barang_id = $1', [barang_id]);
        return { message: 'Get barang successfully', data: response.rows[0] }
    } catch (error) {
        return { message: error.message }
    }
};

exports.updateBarang = async (body) => {
    try {
        const { ...barang } = body;
        const response = [];
        return { message: 'Update barang successfully', data: response.rows[0] }
    } catch (error) {
        return { message: error.message };
    }
};

exports.deteleBarang = async (params) => {
    try {
        const { barang_id } = params;
        const response = await pool.query('DELETE FROM barang WHERE barang_id = $1', [barang_id]);
        return { message: 'Delete barang successfully' }
    } catch (error) {
        return { message: error.message }
    }
};

exports.getBarangByToko = async (params) => {
    try {
        const { toko_id } = params;
        const response = await pool.query('SELECT * FROM barang WHERE toko_id = $1', [toko_id]);
        return { message: 'Get barang by toko successfully', data: response.rows }
    } catch (error) {
        return { message: error.message }

    }
};

exports.getBarangByCategory = async (params) => {
    try {
        const { category } = params;
        const response = await pool.query('SELECT * FROM barang WHERE category = $1', [category]);
        return { message: 'Get barang by category successfully', data: response.rows }
    } catch (error) {
        return { message: error.message }
    }
};