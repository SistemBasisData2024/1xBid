const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = async (body) => {
    try {
        const { username, email, password, fullName, dateOfBirth, phoneNumber } = body;
    } catch (error) {
        return { message: error.message }
    }
}

exports.login = async (body) => {
    try {
        const { username, password } = body;
        if (!username || !password) throw new Error('Username and password are required');
        const token = jwt.sign({ id: username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return { token };
    } catch (error) {
        return { message: error.message };
    }
};