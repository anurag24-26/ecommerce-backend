const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Set up CORS
app.use(
  cors({
    origin: "*", // Allows requests from any domain
    methods: ["GET", "POST", "PUT", "DELETE"], // Ensure all necessary methods are allowed
    credentials: true, // Allows cookies & authorization headers
  })
);

// Setup Multer storage
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Serve static uploads
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Route for image upload
app.post("/api/upload", upload.single("image"), (req, res) => {
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
