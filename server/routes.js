
const authRoutes = require("./routes/Auth");
const userRoutes = require("./routes/User");
// const productRoutes = require("./routes/Product");
// const orderRoutes = require("./routes/Order");
// const cartRoutes = require("./routes/Cart");
// const brandRoutes = require("./routes/Brand");
// const categoryRoutes = require("./routes/Category");
// const addressRoutes = require("./routes/Address");
// const reviewRoutes = require("./routes/Review");
// const wishlistRoutes = require("./routes/Wishlist");

const setupRoutes = (server) => {
    server.use("/api/auth", authRoutes);
    server.use("/api/users", userRoutes);
    // server.use("/products", productRoutes);
    // server.use("/orders", orderRoutes);
    // server.use("/cart", cartRoutes);
    // server.use("/brands", brandRoutes);
    // server.use("/categories", categoryRoutes);
    // server.use("/address", addressRoutes);
    // server.use("/reviews", reviewRoutes);
    // server.use("/wishlist", wishlistRoutes);
};

module.exports = setupRoutes;
