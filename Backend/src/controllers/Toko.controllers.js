const tokoServices = require('../services/Toko.services');

exports.getTokoById = async (req, res) => {
    try {
        const response = await tokoServices.getTokoById(req.params);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ message: err.message });
    }
}

exports.updateToko = async (req, res) => {
    try {
        const response = await tokoServices.updateToko(req.params, req.body);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ message: err.message });
    }
}

exports.deleteToko = async (req, res) => {
    try { 
        const response = await tokoServices.deleteToko(req.params);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ message: err.message });
    }
}

exports.createBarang = async (req, res) => {
    try {
        const response = await tokoServices.createBarang(req.params, req.body);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ message: err.message });
    }
}

exports.editBarang = async (req, res) => {
    try {
        const response = await tokoServices.editBarang(req.params, req.body);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ message: err.message });
    }
}

exports.deleteBarang = async (req, res) => {
    try {
        const response = await tokoServices.deleteBarang(req.params);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ message: err.message });
    }
}