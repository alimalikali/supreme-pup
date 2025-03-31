const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloud name from your Cloudinary account
  api_key: process.env.CLOUDINARY_API_KEY, // API key from your Cloudinary account
  api_secret: process.env.CLOUDINARY_API_SECRET, // API secret from your Cloudinary account
});

module.exports = cloudinary; // Export the configured cloudinary instance
