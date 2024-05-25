const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./src/routes/Auth.routes');
const tokoRoutes = require('./src/routes/Toko.routes');
const barangRoutes = require('./src/routes/Barang.routes');
const userRoutes = require('./src/routes/User.routes');
const { pool } = require('./src/config/db.config');

dotenv.config();
const app = express();
pool.connect().then(() => {
    console.log('Database connected successfully');
}).catch((err) => {
    console.log(err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/toko', tokoRoutes);
app.use('/barang', barangRoutes);
app.use('/user', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});