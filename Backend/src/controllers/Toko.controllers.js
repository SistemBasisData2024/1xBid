const tokoServices = require('../services/Toko.services');

exports.createToko = async (req, res) => {
    try {
        const response = await tokoServices.createToko(req.user_id, req.body);
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

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