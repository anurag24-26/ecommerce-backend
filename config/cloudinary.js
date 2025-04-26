const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
  cloud_name: "dd2hnjua0",
  api_key: "159113443413878",
  api_secret: "kJG7NkSUvaBaERbmhtEzfK7_5xg",
});

module.exports = cloudinary;
