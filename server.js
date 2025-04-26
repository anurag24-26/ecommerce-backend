const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const cloudinary = require("./config/cloudinary"); // Import Cloudinary

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Set up CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Multer Storage (Temporary for File Uploads)
const storage = multer.memoryStorage(); // Keep images in memory
const upload = multer({ storage });

app.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No image uploaded" });

    const result = await cloudinary.uploader
      .upload_stream({ folder: "products" }, (error, result) => {
        if (error) {
          console.error("Cloudinary upload failed:", error);
          return res
            .status(500)
            .json({ message: "Cloudinary Upload Failed", error });
        }

        console.log("Cloudinary Upload Successful:", result.secure_url);
        res.json({ imageUrl: result.secure_url });
      })
      .end(req.file.buffer);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Image upload failed", error });
  }
});

// Routes
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
