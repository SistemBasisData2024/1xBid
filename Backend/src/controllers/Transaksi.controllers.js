const transaksiServices = require('../services/Transaksi.services');

exports.createTransaksi = async (req, res) => {
    try {
        const response = await transaksiServices.createTransaksi(req.user_id, req.params, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.getTransaksiDetail = async (req, res) => {
    try {
        const response = await transaksiServices.getTransaksiDetail(req.user_id, req.params);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.getTransaksi = async (req, res) => {
    try {
        const response = await transaksiServices.getTransaksi(req.user_id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.cancelTransaksi = async (req, res) => {
    try {
        const response = await transaksiServices.cancelTransaksi(req.user_id, req.params);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.getAddress = async (req, res) => {
    try {
        const response = await transaksiServices.getAddress(req.user_id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}