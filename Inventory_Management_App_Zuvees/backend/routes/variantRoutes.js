const express = require("express");
const router = express.Router();
const variantController = require("../controllers/Variants/variantController");

// Get all variants
router.get("/", variantController.getAllVariants);

// Get variants of a product by productId
router.get("/:productId", variantController.getProductVariants);

// Create a new variant
router.post("/", variantController.createVariant);

// Update an existing variant
router.put("/:id", variantController.updateVariant);

// Delete a variant
router.delete("/:id", variantController.deleteVariant);

module.exports = router;
