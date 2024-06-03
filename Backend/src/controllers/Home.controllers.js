const homeServices = require('../services/Home.services');

exports.getNewestAuctions = async (req, res) => {
    try {
        const response = await homeServices.getNewestAuctions();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getTopTrendingAuctions = async (req, res) => {
    try {
        const response = await homeServices.getTopTrendingAuctions();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}