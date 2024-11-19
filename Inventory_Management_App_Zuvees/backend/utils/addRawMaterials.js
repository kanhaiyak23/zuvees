const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function addRawMaterials() {
  try {
    const rawMaterials = [
      { name: "Rose Petals", price: 2.5, quantity: 50 },
      { name: "Ribbon", price: 0.5, quantity: 5 },
      { name: "Flour", price: 1.2, quantity: 20 },
      { name: "Chocolate", price: 3.5, quantity: 10 },
      { name: "Sugar", price: 0.8, quantity: 5 },
      { name: "Cardboard", price: 0.5, quantity: 1 },
      { name: "Ink", price: 0.2, quantity: 0.1 },
      { name: "Chocolate", price: 3.5, quantity: 10 },
      { name: "Box", price: 1.0, quantity: 1 },
    ];

    for (const material of rawMaterials) {
      await prisma.rawMaterial.create({
        data: material,
      });
    }
    console.log("Raw Materials added!");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

addRawMaterials();
