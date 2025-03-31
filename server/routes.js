const authRoutes = require('./routes/Auth');
const userRoutes = require('./routes/User');
const productRoutes = require('./routes/Product');
const cartRoutes = require('./routes/Cart');
const orderRoutes = require('./routes/Order');
const addressRoutes = require('./routes/Address');
const brandRoutes = require('./routes/Brand');
const categoryRoutes = require('./routes/Category');
const reviewRoutes = require('./routes/Review');
// const wishlistRoutes = require("./routes/Wishlist");

const setupRoutes = (app) => {
  app.get('/', (req, res) => {
    res.send('Test route works!');
  });
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/cart', cartRoutes);
  app.use('/api/orders', orderRoutes);
  app.use('/api/address', addressRoutes);
  app.use('/brands', brandRoutes);
  app.use('/categories', categoryRoutes);
  app.use('/reviews', reviewRoutes);
  // app.use("/wishlist", wishlistRoutes);
};

module.exports = setupRoutes;
