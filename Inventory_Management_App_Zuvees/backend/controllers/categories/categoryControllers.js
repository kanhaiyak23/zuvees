const { prismaClient } = require("../../config/db");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await prismaClient.category.findMany({
      include: {
        products: true, // Include raw materials related to each category
      },
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error retrieving categories:', error);
    res.status(500).json({ message: 'Error retrieving categories', error: error.message });
  }
};

exports.createCategory = async (req, res) => {
  const { name } = req.body; // Only get the name for the category

  try {
    const newCategory = await prismaClient.category.create({
      data: {
        name: name, // Only set the category name
        // No need to connect to products here
      }
    });

    res.status(201).json({
      message: "Category created successfully!",
      category: newCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Failed to create category" });
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, rawMaterialIds } = req.body;
  try {
    const updatedCategory = await prismaClient.category.update({
      where: { id: Number(id) },
      data: {
        name,
        rawMaterials: {
          set: rawMaterialIds.map(id => ({ id })),
        },
      },
    });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await prismaClient.category.delete({
      where: { id: Number(id) },
    });
    res.status(204).json({ message: "Deleted category" });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error: error.message });
  }
};
