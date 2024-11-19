const express = require("express");
const router = express.Router();
const productController = require("../controllers/products/productControllers");

// Get all products
router.get("/", productController.getAllProducts);

// Get a single product by ID
router.get("/:productId", productController.getProductById);

// Create a new product
router.post("/", productController.createProduct);

// Update an existing product
router.put("/:id", productController.updateProduct);

// Delete a product
router.delete("/:id", productController.deleteProduct);

module.exports = router;
