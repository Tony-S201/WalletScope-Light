const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require("./config/db");

const authRouter = require('./routes/authRoutes');
const tokenRouter = require('./routes/tokensRoutes');
const walletRouter = require('./routes/walletsRoutes');
const positionRouter = require('./routes/positionsRoutes');
const statRouter = require('./routes/statsRoutes');

const app = express();
const port = 5000;

// Connect to DB
connectDB();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: process.env.FRONT_URL ?? 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/tokens', tokenRouter);
app.use('/api/wallets', walletRouter);
app.use('/api/positions', positionRouter);
app.use('/api/stats', statRouter);

// Start server
app.listen(port, () => {
    console.log('Listening port ' + port)
})