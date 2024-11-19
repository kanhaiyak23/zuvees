const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { Storage } = require("multer-storage-cloudinary");

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Multer storage configuration (upload to Cloudinary)
const storage = new Storage({
  cloudinary: cloudinary,
  params: {
    folder: "product_images", // Folder where images will be stored
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
  },
});

const upload = multer({ storage: storage });
