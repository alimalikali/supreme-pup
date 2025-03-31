const { Schema, default: mongoose } = require('mongoose');
const Product = require('../models/Product');
const CatchAsync = require('../utils/CatchAsync');
const Brand = require('../models/Brand');
const Category = require('../models/Category');
const AppError = require('../utils/AppError');
const { uploadToCloudinarySingle, uploadToCloudinaryMany, deleteFromCloudinary } = require('../utils/Cloudinary');
const { default: slugify } = require('slugify');

exports.create = CatchAsync(async (req, res, next) => {
  const { title, description, price, category, brand, stockQuantity, shipping } = req.body;
  console.log('Request Body:', req.body);
  console.log('Uploaded Files:', req.files);

  // Extracting files properly
  const thumbnail = req.files?.thumbnail?.[0]; // Correctly getting the single thumbnail
  const images = req.files?.images || []; // Getting an array of images

  // Validation checks
  if (!title || !description || !price?.original || !price?.current || !category || !brand || !stockQuantity) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (!thumbnail) return next(new AppError('Please add a thumbnail photo', 400));
  if (images.length < 1) return next(new AppError('Please add at least one photo', 400));
  if (images.length > 5) return next(new AppError('You can only upload up to 5 photos', 400));

  try {
    // Uploading images to Cloudinary
    const thumbnailURL = await uploadToCloudinarySingle(thumbnail);
    const imagesURL = await uploadToCloudinaryMany(images);

    // Construct Product Data
    const created = await Product.create({
      title,
      description,
      price: {
        original: price.original,
        current: price.current,
      },
      category,
      brand,
      stockQuantity,
      shipping: {
        weight: shipping.weight,
        dimensions: {
          width: shipping.dimensions.width,
          height: shipping.dimensions.height,
          depth: shipping.dimensions.depth,
        },
        availableRegions: shipping.availableRegions,
      },
      thumbnail: thumbnailURL,
      images: imagesURL,
    });

    console.log('Product Created:', created);
    res.status(201).json(created);
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    return res.status(500).json({ message: 'Failed to upload images' });
  }
});

exports.getAll = CatchAsync(async (req, res) => {
  const filter = { isDeleted: false }; // 🔹 Exclude soft-deleted products
  const sort = req.query.sort ? { [req.query.sort]: req.query.order === 'asc' ? 1 : -1 } : { createdAt: -1 };
  let skip = 0,
    limit = 10; // 🔹 Default pagination

  // 🔹 Apply filters
  if (req.query.brand) filter.brand = { $in: req.query.brand };
  if (req.query.category) filter.category = { $in: req.query.category };

  // 🔹 Apply pagination
  if (req.query.page && req.query.limit) {
    limit = parseInt(req.query.limit);
    skip = (parseInt(req.query.page) - 1) * limit;
  }

  const totalDocs = await Product.find(filter).sort(sort).populate('brand').countDocuments().exec();
  const results = await Product.find(filter).sort(sort).populate('brand').populate('category').skip(skip).limit(limit).exec();

  res.set('X-Total-Count', totalDocs);

  res.status(200).json(results);
});

exports.getById = CatchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(id, 'id');

  const result = await Product.findById(id).populate('brand').populate('category');
  if (!result) return res.status(404).json({ message: 'Product not found' });
  res.status(200).json(result);
});

exports.getBySlug = CatchAsync(async (req, res) => {
  const { slug } = req.params;
  console.log(slug, 'slug');

  const result = await Product.findOne({ slug }).populate('brand').populate('category');
  if (!result) return res.status(404).json({ message: 'Product not found' });
  res.status(200).json(result);
});

exports.updateById = CatchAsync(async (req, res) => {
  const { id } = req.params;

  let product = await Product.findById(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  // 🔹 Extract new files (if provided)
  const newThumbnail = req.files?.thumbnail?.[0];
  const newImages = req.files?.images || [];

  // 🔹 Delete & Upload New Thumbnail (If Updated)
  if (newThumbnail) {
    if (product.thumbnail?.public_id) {
      await deleteFromCloudinary([product.thumbnail.public_id]); // ✅ Wrapped in array
    }
    req.body.thumbnail = await uploadToCloudinarySingle(newThumbnail); // Ensure this returns { public_id, url }
  }

  // 🔹 Delete & Upload New Images (If Updated)
  if (newImages.length > 0) {
    if (product.images.length > 0) {
      await deleteFromCloudinary(product.images.map((img) => img.public_id)); // ✅ Passed as an array
    }
    req.body.images = await uploadToCloudinaryMany(newImages); // Ensure it returns [{ public_id, url }]
  }

  if (req.body.title) {
    req.body.slug = slugify(req.body.title, { lower: true, strict: true });
  }

  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json(updatedProduct);
});

exports.undeleteById = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const restored = await Product.findOneAndUpdate({ id: id, isDeleted: true }, { isDeleted: false }, { new: true }).populate('brand');
  if (!restored) return res.status(404).json({ message: 'Product not found' });
  res.status(200).json(restored);
});

exports.deleteById = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const deleted = await Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  if (!deleted) return res.status(404).json({ message: 'Product not found' });
  res.status(200).json(deleted);
});
