const express = require('express');
const cors = require('cors');
const connectDB = require("./config/db");

const tokenRouter = require('./routes/tokensRoutes');
const walletRouter = require('./routes/walletsRoutes');
const positionRouter = require('./routes/positionsRoutes');
const statRouter = require('./routes/statsRoutes');

const app = express();
const port = 5000;

// Connect to DB
connectDB();

// Middleware
app.use(express.json());

// Cors
app.use(cors({
    origin: process.env.FRONT_URL ?? 'http://localhost:3000'
}));

// Routes
app.use('/api/tokens', tokenRouter);
app.use('/api/wallets', walletRouter);
app.use('/api/positions', positionRouter);
app.use('/api/stats', statRouter);

// Start server
app.listen(port, () => {
    console.log('Listening port ' + port)
})