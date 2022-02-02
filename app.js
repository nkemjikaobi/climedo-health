const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const app = express();

dotenv.config({ path: './config/config.env' });

//Connect Database
connectDB();

//Initialize Middleware for accepting data from body
app.use(express.json({ extended: false }));

//Define Routes
app.use('/api/departments', require('./routes'));

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

const PORT = process.env.PORT || 5000;

module.exports = app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
