const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // Create categories
  const categories = await prisma.category.createMany({
    data: [
      { name: "Electronics" },
      { name: "Furniture" },
      { name: "Groceries" },
    ],
  });

  console.log(`Created ${categories.count} categories.`);

  // Fetch all categories
  const allCategories = await prisma.category.findMany();

  // Create raw materials
  const rawMaterials = [];
  for (const category of allCategories) {
    rawMaterials.push(
      await prisma.rawMaterial.create({
        data: {
          name: `Raw Material for ${category.name}`,
          price: Math.random() * 100,
          quantity: Math.floor(Math.random() * 50) + 1,
          categoryId: category.id,
        },
      })
    );
  }
  console.log(`Created ${rawMaterials.length} raw materials.`);

  // Create products
  const products = [];
  for (const category of allCategories) {
    products.push(
      await prisma.product.create({
        data: {
          name: `Product for ${category.name}`,
          defaultVariant: `Default for ${category.name}`,
          categoryId: category.id,
          price: Math.random() * 500,
          image: null,
        },
      })
    );
  }
  console.log(`Created ${products.length} products.`);

  // Create variants for products
  const variants = [];
  for (const product of products) {
    for (let i = 0; i < 3; i++) {
      variants.push(
        await prisma.variant.create({
          data: {
            name: `Variant ${i + 1} for ${product.name}`,
            code: `CODE-${i + 1}`,
            productId: product.id,
            price: product.price + i * 10,
            quantity: Math.floor(Math.random() * 100) + 1,
          },
        })
      );
    }
  }
  console.log(`Created ${variants.length} variants.`);

  // Create orders for products
  const orders = [];
  for (const product of products) {
    for (let i = 0; i < 2; i++) {
      orders.push(
        await prisma.order.create({
          data: {
            productId: product.id,
            quantity: Math.floor(Math.random() * 10) + 1,
            totalPrice: product.price * Math.floor(Math.random() * 10),
          },
        })
      );
    }
  }
  console.log(`Created ${orders.length} orders.`);

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
