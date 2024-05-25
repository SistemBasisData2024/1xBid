const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { pool } = require('../config/db.config');

exports.register = async (body) => {
    try {
        const { username, email, fullname, password, date_of_birth, phone_number } = body;
        if (!username || !email || !fullname || !password || !date_of_birth || !phone_number) throw new Error('All input is required');
        const hashedPassword = await bcrypt.hash(password, 10);

        const response = await pool.query('INSERT INTO users (username, email, fullname, password, date_of_birth, phone_number) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [username, email, fullname, hashedPassword, date_of_birth, phone_number]);
        return { message: 'User registered successfully', user: response.rows[0] }
    } catch (error) {
        return { message: error.message };
    }
}

exports.login = async (body) => {
    try {
        const { username, password, email } = body;
        if (!username && !email) throw new Error('Username or email is required');
        if (!password) throw new Error('Password is required');

        const response = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);
        if (response.rows.length === 0) throw new Error('User not found');
        const user = response.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');

        const token = jwt.sign({ user_id: user.user_id, role:user.role }, process.env.JWT_SECRET, { expiresIn: '12h' });
        return { message: 'Login successfully', data: { token, user } };
    } catch (error) {
        return { message: error.message };
    }
};

exports.experiment = async (body) => {
    try {
        const { username } = body;
        if (!username) throw new Error('Username is required');
        const jwtSign = jwt.sign({ user_id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '12h' });
        return { message: 'Token generated successfully', token: jwtSign };
    } catch (error) {
        return { message: error.message };
    }
}