const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function addCategories() {
  try {
    const categories = [
      { name: "Flowers" },
      { name: "Cakes" },
      { name: "Chocolates" },
    ];

    for (const category of categories) {
      await prisma.category.create({
        data: category,
      });
    }
    console.log("Categories added!");
  } catch (error) {
    console.error("Error adding categories:", error);
  } finally {
    await prisma.$disconnect(); // Ensure disconnect is called on the correct instance
  }
}

addCategories();
