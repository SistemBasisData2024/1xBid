const userServices = require('../services/User.services');

exports.getUserProfile = async (req, res) => {
    try {
        const response = await userServices.getUserProfile(req.user_id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.updateUserProfile = async (req, res) => {
    try {
        const response = await userServices.updateUserProfile(req.user_id, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.deleteUserProfile = async (req, res) => {
    try {
        const response = await userServices.deleteUserProfile(req.user_id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}