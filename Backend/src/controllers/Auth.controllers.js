const authServices = require('../services/Auth.services');

exports.login = async (req, res) => {
    try {
        const response = await authServices.login(req.body);
        res.cookie('token', response.token, { maxAge: 3600000, httpOnly: true });
        res.status(200).json(response)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.authenticate = async (req, res) => {
    try {
        const response = await authServices.authenticate(req.headers.cookie.split('=')[1]);
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}