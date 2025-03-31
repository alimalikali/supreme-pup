require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const setupRoutes = require('./routes');
const { connectToDB } = require('./config/db');
const globalErrorHandler = require('./utils/ErrorController');
const AppError = require('./utils/AppError');
const formData = require('express-form-data');
const multer = require('multer');

// app init
const app = express();
// database connection

// Security Middleware
app.use(cors({ origin: process.env.ORIGIN, credentials: true, exposedHeaders: ['X-Total-Count'], methods: ['GET', 'POST', 'PATCH', 'DELETE'] }));

app.use(helmet()); // Secure HTTP headers
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(xss()); // Prevent XSS attacks
app.use(hpp()); // Prevent parameter pollution

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(multer({ limits: { fileSize: 10 * 1024 * 1024 } }).any()); // 10MB

app.use(cookieParser());
app.use(morgan('tiny'));

// Rate limiting
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from this IP, please try again in an hour!',
// });
// app.use('/api', limiter);

// Performance Middleware
app.use(compression()); // Compress responses

// Routes setup
setupRoutes(app);

app.use('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this app!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
