const { prismaClient } = require("../../config/db");
exports.getAllVariants = async (req, res) => {
  try {
    const variants = await prismaClient.variant.findMany({
      include: {
        product: true,
        
      },
    });
    res.status(200).json(variants);
  } catch (error) {
    console.error('Error retrieving variants:', error);
    res.status(500).json({ message: 'Error retrieving variants', error: error.message });
  }
};
// Get variants of a product by productId
exports.getProductVariants = async (req, res) => {
  const { productId } = req.params;
  console.log(productId);

  try {
    const product = await prismaClient.product.findUnique({
      where: {
        id: parseInt(productId), // Ensure the productId is parsed as an integer if it's numeric
      },
      include: {
        variants: true, // Include related variants in the response
      },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Send back only the variants related to the product
    res.status(200).json(product.variants);
  } catch (error) {
    console.error('Error retrieving product variants:', error);
    res.status(500).json({ message: 'Error retrieving product variants', error: error.message });
  }
};



exports.createVariant = async (req, res) => {
  try {
    const { name, code, productId, price, quantity, image } = req.body;

    // Ensure 'productId' is part of the request body and valid
    const newVariant = await prismaClient.variant.create({
      data: {
        name,
        code,
        product: {
          connect: { id: productId }, // Link product by its ID
        },
        price: parseFloat(price),  // Ensure the price is treated as a number
        quantity: parseInt(quantity), // Ensure the quantity is an integer
        image,
      },
    });

    res.status(201).json(newVariant);
  } catch (error) {
    console.error("Error creating product variant:", error);
    res.status(500).json({ message: "Error creating product variant" });
  }
}

;

exports.updateVariant = async (req, res) => {
  const { id } = req.params;
  const { name, price, quantity, image } = req.body;
  try {
    const updatedVariant = await prismaClient.variant.update({
      where: { id: Number(id) },
      data: {
        name,
        price,
        quantity,
        image,
      },
    });
    res.status(200).json(updatedVariant);
  } catch (error) {
    res.status(500).json({ message: 'Error updating variant', error: error.message });
  }
};

exports.deleteVariant = async (req, res) => {
  const { id } = req.params;
  try {
    await prismaClient.variant.delete({
      where: { id: Number(id) },
    });
    res.status(204).json({ message: "Deleted variant" });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting variant', error: error.message });
  }
};
