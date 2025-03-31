const mongoose = require('mongoose');
const { Schema } = mongoose;
const slugify = require('slugify');

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    price: {
      original: { type: Number, required: true },
      current: { type: Number, required: true },
      currency: { type: String, default: 'USD' },
      discount: {
        percentage: { type: Number, default: 0 },
        expiry: { type: Date, default: null },
      },
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
      required: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: [0, 'Stock quantity cannot be negative'],
    },
    thumbnail: {
      public_id: { type: String, required: true }, // Cloudinary public ID
      url: { type: String, required: true }, // Secure URL
    },
    images: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    shipping: {
      weight: { type: String, required: true },
      dimensions: {
        width: { type: String, required: true },
        height: { type: String, required: true },
        depth: { type: String, required: true },
      },
      availableRegions: { type: [String], required: true },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false },
);

// 🔹 Auto-generate slug before saving
productSchema.pre('validate', function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// 🔹 Auto-calculate current price
productSchema.virtual('currentPrice').get(function () {
  if (this.price.discount.percentage > 0) {
    return this.price.original - (this.price.original * this.price.discount.percentage) / 100;
  }
  return this.price.original;
});

module.exports = mongoose.model('Product', productSchema);
