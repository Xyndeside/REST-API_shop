require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 4000;
const connectDB = require('./config/db');
const router = require('./routes/index');

const app = express();
app.use(express.json());
app.use('/api', router);

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
    }
}

startServer();

