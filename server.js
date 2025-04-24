const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // Remove the .js extension
const userRoutes = require("./routes/userRoutes"); // Remove the .js extension
const adminRoutes = require("./routes/adminRoutes"); // Remove the .js extension
const productRoutes = require("./routes/productRoutes"); // Remove the .js extension
const orderRoutes = require("./routes/orderRoutes"); // Remove the .js extension
const { notFound, errorHandler } = require("./middleware/errorMiddleware"); // Remove the .js extension
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // or "*" for all origins (not recommended for production)
    credentials: true,
  })
);

app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
