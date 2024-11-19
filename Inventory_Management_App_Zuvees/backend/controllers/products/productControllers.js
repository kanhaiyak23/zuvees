const { prismaClient } = require("../../config/db");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await prismaClient.product.findMany({
      
    });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ message: 'Error retrieving products', error: error.message });
  }
};
// Get a product by productId
exports.getProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await prismaClient.product.findUnique({
      where: {
        id: parseInt(productId), // Ensure the productId is parsed as an integer if it's numeric
      },
      
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error retrieving product:', error);
    res.status(500).json({ message: 'Error retrieving product', error: error.message });
  }
};




exports.createProduct = async (req, res) => {
  const { name, price, defaultVariant, category, imageUrl } = req.body;

  console.log(category, price, defaultVariant, imageUrl);

  if (!category) {
    return res.status(400).json({ message: 'Category is required' });
  }

  try {
    // Fetch category ID based on the category name
    const categoryRecord = await prismaClient.category.findUnique({
      where: {
        id: (category),  // Using `category` to fetch category record
      },
    });

    // If category doesn't exist, return an error
    if (!categoryRecord) {
      return res.status(400).json({ message: 'Category not found' });
    }

    // Create the new product, connecting it to the found category
    const newProduct = await prismaClient.product.create({
      data: {
        name,
        price: parseFloat(price),
        defaultVariant,
        image: imageUrl,  // Use the image URL provided by the frontend
        category: {
          connect: { id: categoryRecord.id },  // Connect to the category by ID
        },
      },
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};



  

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, categoryIds, price, defaultVariant, image } = req.body;
  try {
    const updatedProduct = await prismaClient.product.update({
      where: { id: Number(id) },
      data: {
        name,
        price,
        defaultVariant,
        image,
        categories: {
          set: categoryIds.map(id => ({ id })),
        },
      },
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await prismaClient.product.delete({
      where: { id: Number(id) },
    });
    res.status(204).json({ message: "Deleted product" });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};
