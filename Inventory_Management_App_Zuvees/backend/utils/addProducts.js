const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function addProducts() {
  try {
    const products = [
      {
        name: "Rose Bouquet",
        defaultVariant: "Standard",
        categoryId: 2,
        price: 150,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc_6cuxpubbJPPGNj-xf1TZ_1e8KAkXkAkyg&s",
      },
      {
        name: "Chocolate Cake",
        defaultVariant: "Medium",
        categoryId: 9,
        price: 500,
        image: "https://www.southernliving.com/thmb/cqsN7DiYbKFHR6T-RGGDYmO5FV0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Chocolate-Birthday-Cake_3x2_Batch60-51-262fa5f104fa4a3ba5d3c10c70b2a30e.jpg",
      },
      {
        name: "Happy Birthday Card",
        defaultVariant: "Standard",
        categoryId: 8,
        price: 300,
        image: "https://img.freepik.com/premium-photo/happy-birthday-card-with-words-happy-birthday-it_1131934-22786.jpg",
      },
      {
        name: "Assorted Chocolate Box",
        defaultVariant: "Medium",
        categoryId: 10,
        price: 250,
        image: "https://choconnuts.in/wp-content/uploads/2023/08/Assorted-Chocolates-Rakhi-Gift-Box-in-Bhopal-Online-Order.jpeg",
      },
    ];

    for (const product of products) {
      await prisma.product.create({
        data: product,
      });
    }
    console.log("Products added!");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

addProducts();
