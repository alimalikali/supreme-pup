const express = require('express');
const productController = require('../controllers/Product');
const { singleUpload, multiUpload, multerUpload } = require('../middleware/Multer');

const router = express.Router();

router
  .post('/', multerUpload, productController.create)
  .patch('/:id', multerUpload, productController.updateById)

  .get('/', productController.getAll)
  .get('/:slug', productController.getBySlug)
  .get('/id/:id', productController.getById)
  .patch('/undelete/:id', productController.undeleteById)
  .delete('/:id', productController.deleteById);

module.exports = router;
