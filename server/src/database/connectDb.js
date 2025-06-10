const mongoose = require('mongoose');
require('dotenv').config();

exports.databaseConnection = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log('Database connected successfully');
        })
        .catch((error) => {
            console.error('Database connection failed:', error);
            process.exit(1); // Exit the process if the database connection fails
        });
};
