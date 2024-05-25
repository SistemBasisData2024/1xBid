const barangServices = require('../services/Barang.services');

exports.createBarang = async (req, res) => {
    try {
        const response = await barangServices.createBarang(req.body);
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.getBarang = async (req, res) => {
    try {
        const response = await barangServices.getBarang(req.params);
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.updateBarang = async (req, res) => {
    try {
        const response = await barangServices.updateBarang(req.params, req.body);
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.deleteBarang = async (req, res) => {
    try {
        const response = await barangServices.deleteBarang(req.params);
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.getBarangByToko = async (req, res) => {
    try {
        const response = await barangServices.getBarangByToko(req.params);
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.getBarangByCategory = async (req, res) => {
    try {
        const response = await barangServices.getBarangByCategory(req.params);
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}