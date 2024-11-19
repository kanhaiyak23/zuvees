const { prismaClient } = require("../../config/db");

exports.getAllRawMaterials = async (req, res) => {
  try {
    const rawMaterials = await prismaClient.rawMaterial.findMany({
      include: {
        variants: true, // Include the related category for each raw material
      },
    });
    res.status(200).json(rawMaterials);
  } catch (error) {
    console.error('Error retrieving raw materials:', error);
    res.status(500).json({ message: 'Error retrieving raw materials', error: error.message });
  }
};

exports.createRawMaterial = async (req, res) => {
  const { rawMaterial, code, category, price, quantity } = req.body;

  // Validate the required fields
  if (!rawMaterial || !category || !price || !quantity) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Find the category ID from the category name
    const categoryRecord = await prismaClient.category.findUnique({
      where: {
        name: category,  // Assuming `name` is the field storing the category name
      },
    });

    // If the category doesn't exist, return an error
    if (!categoryRecord) {
      return res.status(400).json({ message: 'Category not found' });
    }

    // Create the new raw material, connecting it to the found category
    const newRawMaterial = await prismaClient.rawMaterial.create({
      data: {
        rawMaterial,
        code,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
        category: {
          connect: { id: categoryRecord.id }, // Connect to the category by ID
        },
      },
    });

    // Return the newly created raw material
    res.status(201).json(newRawMaterial);
  } catch (error) {
    console.error("Error creating raw material:", error);
    res.status(500).json({ message: "Error creating raw material", error: error.message });
  }
};

 


exports.updateRawMaterial = async (req, res) => {
  const { id } = req.params;
  const { name, code, price, quantity, image } = req.body;
  try {
    const updatedRawMaterial = await prismaClient.rawMaterial.update({
      where: { id: Number(id) },
      data: {
        name,
        code,
        price,
        quantity,
        image,
      },
    });
    res.status(200).json(updatedRawMaterial);
  } catch (error) {
    res.status(500).json({ message: 'Error updating raw material', error: error.message });
  }
};

exports.deleteRawMaterial = async (req, res) => {
  const { id } = req.params;
  try {
    await prismaClient.rawMaterial.delete({
      where: { id: Number(id) },
    });
    res.status(204).json({ message: "Deleted raw material" });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting raw material', error: error.message });
  }
};
