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



process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// app init
const app = express();



// database connection
connectToDB();

// Security Middleware
// app.use(cors({ origin: process.env.ORIGIN, credentials: true, exposedHeaders: ['X-Total-Count'], methods: ['GET', 'POST', 'PATCH', 'DELETE'] }));


const corsOptions = {
  origin: 'https://alidev-pup.vercel.app', // specify the allowed origin
  credentials: true,  // Allow credentials (cookies, HTTP authentication)
  exposedHeaders: ['X-Total-Count'], // if you want to expose custom headers
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Specify allowed HTTP methods
};

// Apply CORS middleware
app.use(cors(corsOptions));


app.use(helmet()); // Secure HTTP headers
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(xss()); // Prevent XSS attacks
app.use(hpp()); // Prevent parameter pollution

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(morgan('tiny'));

// Rate limiting
const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Performance Middleware
app.use(compression()); // Compress responses

// Routes setup
setupRoutes(app);

app.get('/test', (req, res) => {
  res.send('Test route is working!');
});



app.use('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this app!`, 404));
});

app.use(globalErrorHandler);
app.options('*', cors(corsOptions)); // Handle OPTIONS preflight requests

module.exports = app;

// const port = process.env.PORT || 3000;
// const server = app.listen(port, () => {
//   console.log(`App running on port ${port}...`);
// });




process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  app.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  app.close(() => {
    console.log('💥 Process terminated!');
  });
});

