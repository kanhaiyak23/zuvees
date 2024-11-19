const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categories/categoryControllers");

// Get all categories
router.get("/", categoryController.getAllCategories);

// Create a new category
router.post("/", categoryController.createCategory);

// Update an existing category
router.put("/:id", categoryController.updateCategory);

// Delete a category
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
