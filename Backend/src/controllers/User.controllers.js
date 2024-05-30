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
        res.clearCookie('token');
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.addAddress = async (req, res) => {
    try {
        const response = await userServices.addAddress(req.user_id, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.editAddress = async (req, res) => {
    try {
        const response = await userServices.editAddress(req.user_id, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.topUpSaldo = async (req, res) => {
    try {
        const response = await userServices.topUpSaldo(req.user_id, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.openToko = async (req, res) => {
    try {
        const response = await userServices.openToko(req.user_id, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}