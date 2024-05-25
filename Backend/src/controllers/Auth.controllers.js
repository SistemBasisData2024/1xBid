const authServices = require('../services/Auth.services');

exports.register = async (req, res) => {
    try {
        const response = await authServices.register(req.body);
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.login = async (req, res) => {
    try {
        const response = await authServices.login(req.body);
        res.cookie('token', response.data.token, { maxAge: 3600000, httpOnly: true });
        res.status(200).json(response)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

}

exports.authenticate = async (req, res) => {
    try {
        res.status(200).json({ message: 'Authenticated successfully', user_id: req.user_id });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.experiment = async (req, res) => {
    try {
        const response = await authServices.experiment(req.body);
        res.cookie('token', response.token, { maxAge: 3600000, httpOnly: true });
        res.status(200).json(response)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}