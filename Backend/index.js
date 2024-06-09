const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./src/routes/Auth.routes');
const tokoRoutes = require('./src/routes/Toko.routes');
const userRoutes = require('./src/routes/User.routes');
const homeRoutes = require('./src/routes/Home.routes');
const bidRoutes = require('./src/routes/Bid.routes');
const transaksiRoutes = require('./src/routes/Transaksi.routes');
const searchRoutes = require('./src/routes/Search.routes');
const utils = require('./src/utils/Auth.utils');
const { pool } = require('./src/config/db.config');
const { updateStatus, bidWinner, checkTransaksiTimeout } = require('./src/routines/Bid.routines');

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
app.use('/home', homeRoutes);
app.use('/bid', bidRoutes);
app.use('/transaksi', transaksiRoutes);
app.use('/search', searchRoutes);

// interval every 5 minutes
setInterval(utils.keepDBAlive, 1000*60*5);
setInterval(() => {
   updateStatus();
   bidWinner();
   checkTransaksiTimeout();
}, 1000);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});