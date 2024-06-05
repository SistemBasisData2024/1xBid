const bidServices = require('../services/Bid.services');

exports.placeBid = async (req, res) => {
    try {
        const response = await bidServices.placeBid(req.user_id, req.params, req.body);
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.getBidHistory = async (req, res) => {
    try {
        const response = await bidServices.getBidHistory(req.params);
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.getBarang = async (req, res) => {
    try {
        const response = await bidServices.getBarang(req.params);
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}