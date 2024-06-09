const searchServices = require('../services/Search.services');

exports.search = async (req, res) => {
    try {
        const searchQuery = req.query.q;
        if (!searchQuery) throw new Error('Search query is required');

        const response = await searchServices.search(searchQuery);
        if (response.message) throw new Error(response.message);

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};