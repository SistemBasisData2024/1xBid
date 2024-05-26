const jwt = require('jsonwebtoken');

exports.authenticate = async (token) => {
    try {
        if (!token) throw new Error('Token is required');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (err) {
        throw err;
    }
}