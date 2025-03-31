const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const multerUpload = upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'images', maxCount: 5 },
]);

module.exports = { multerUpload };
