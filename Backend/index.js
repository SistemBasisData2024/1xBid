const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./src/routes/Auth.routes');
const tokoRoutes = require('./src/routes/Toko.routes');
const userRoutes = require('./src/routes/User.routes');
const utils = require('./src/utils/Auth.utils');
const { pool } = require('./src/config/db.config');

dotenv.config();
const app = express();
pool.connect().then(() => {
    console.log('Database connected successfully');
}).catch((err) => {
    console.log(err);
});

app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    origin: 'http://localhost:5173',
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/toko', tokoRoutes);
app.use('/user', userRoutes);

// interval every 5 minutes
setInterval(utils.keepDBAlive, 1000*60*5);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});