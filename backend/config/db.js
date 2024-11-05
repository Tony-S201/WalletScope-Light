const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGO_URL;

const connectDB = async() => {
    try {
        await mongoose.connect(mongoURL);
        console.log('Database connexion success');
    } catch(error) {
        console.error('Database connexion error', error);
        process.exit(1);
    }
};  

module.exports = connectDB;