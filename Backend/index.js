require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express();
const pgDatabase = require('./src/database/pg.database');
const authenticateToken = require('./src/middleware/auth.middleware');
const checkAdmin = require('./src/middleware/admin.middleware');

const authRoutes = require('./src/routes/auth.route');
const userRoutes = require('./src/routes/users.route');
const bankSampahRoutes = require('./src/routes/bankSampahs.route');
const wasteTypeRoutes = require('./src/routes/wasteTypes.route');
const wasteDepositRoutes = require('./src/routes/wasteDeposits.route');
const rewardRoutes = require('./src/routes/rewards.route');
const rewardRedemptionRoutes = require('./src/routes/rewardRedemptions.route');
const adminRoutes = require('./src/routes/admin.route');
const depositCodeRoutes = require('./src/routes/depositCode.route');

app.use(cors({
origin: [
    'http://localhost:5173',
    'https://greenpoint-fe.vercel.app'
]
}));

app.use(express.json());

pgDatabase.connect();

app.get('/', (req, res) => {
    res.send('GreenPoint Backend is running!');
});

app.use('/api/auth', authRoutes);

app.use('/api/users', authenticateToken, userRoutes);

app.use('/api/bank-sampahs', bankSampahRoutes);

app.use('/api/waste-types', wasteTypeRoutes);

app.use('/api/waste-deposits', authenticateToken, wasteDepositRoutes);

app.use('/api/rewards', rewardRoutes);

app.use('/api/reward-redemptions', rewardRedemptionRoutes);

app.use('/admin', authenticateToken, checkAdmin, adminRoutes);

app.use('/api/deposit-codes', depositCodeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});