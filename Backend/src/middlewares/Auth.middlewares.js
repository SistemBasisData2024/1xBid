const jwt = require('jsonwebtoken');

exports.authenticate = async (req, res, next) => {
    try {
        const token = req.headers.cookies.split('=')[1];
        if(!token) throw new Error('Token is required');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user_id = decoded.user_id;
        next();
    } catch(err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

exports.isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.cookies.split('=')[1];
        if(!token) throw new Error('Token is required');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.role !== 'admin') throw new Error('Forbidden');
        next();
    } catch(err) {
        return res.status(403).json({ message: 'Forbidden' });
    }
}