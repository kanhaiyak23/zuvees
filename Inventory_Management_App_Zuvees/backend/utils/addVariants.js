const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function addVariants() {
  try {
    const variants = [
      {
        name: "Standard",
        code: "STD",
        productId: 1,
        price: 150.0,
        quantity: 10,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc_6cuxpubbJPPGNj-xf1TZ_1e8KAkXkAkyg&s",
      },
      {
        name: "Premium",
        code: "PRM",
        productId: 1,
        price: 200.0,
        quantity: 5,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc_6cuxpubbJPPGNj-xf1TZ_1e8KAkXkAkyg&s",
      },
      {
        name: "Deluxe",
        code: "DLX",
        productId: 1,
        price: 250.0,
        quantity: 3,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc_6cuxpubbJPPGNj-xf1TZ_1e8KAkXkAkyg&s",
      },
      //Chocolate Cake
      {
        name: "Small",
        code: "SML",
        productId: 2,
        price: 350.0,
        quantity: 8,
        image: "https://www.southernliving.com/thmb/cqsN7DiYbKFHR6T-RGGDYmO5FV0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Chocolate-Birthday-Cake_3x2_Batch60-51-262fa5f104fa4a3ba5d3c10c70b2a30e.jpg",
      },
      {
        name: "Medium",
        code: "MED",
        productId: 2,
        price: 500.0,
        quantity: 5,
        image:
          "https://www.southernliving.com/thmb/cqsN7DiYbKFHR6T-RGGDYmO5FV0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Chocolate-Birthday-Cake_3x2_Batch60-51-262fa5f104fa4a3ba5d3c10c70b2a30e.jpg",
      },
      {
        name: "Large",
        code: "LRG",
        productId: 2,
        price: 700.0,
        quantity: 2,
        image: "https://www.southernliving.com/thmb/cqsN7DiYbKFHR6T-RGGDYmO5FV0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Chocolate-Birthday-Cake_3x2_Batch60-51-262fa5f104fa4a3ba5d3c10c70b2a30e.jpg",
      },
      //birthday card
      {
        name: "Standard",
        code: "STD",
        productId: 3,
        price: 300.0,
        quantity: 15,
        image:
          "https://img.freepik.com/premium-photo/happy-birthday-card-with-words-happy-birthday-it_1131934-22786.jpg",
      },
      {
        name: "Custom Message",
        code: "CSTM",
        productId: 3,
        price: 350.0,
        quantity: 10,
        image: "https://img.freepik.com/premium-photo/happy-birthday-card-with-words-happy-birthday-it_1131934-22786.jpg",
      },
      {
        name: "Pop-up Design",
        code: "POP",
        productId: 3,
        price: 400.0,
        quantity: 5,
        image: "https://img.freepik.com/premium-photo/happy-birthday-card-with-words-happy-birthday-it_1131934-22786.jpg",
      },
      //chcolate box
      {
        name: "Small",
        code: "SML",
        productId: 4,
        price: 150.0,
        quantity: 10,
        image: "https://choconnuts.in/wp-content/uploads/2023/08/Assorted-Chocolates-Rakhi-Gift-Box-in-Bhopal-Online-Order.jpeg",
      },
      {
        name: "Medium",
        code: "MED",
        productId: 4,
        price: 250.0,
        quantity: 7,
        image:
          "https://choconnuts.in/wp-content/uploads/2023/08/Assorted-Chocolates-Rakhi-Gift-Box-in-Bhopal-Online-Order.jpeg",
      },
      {
        name: "Large",
        code: "LRG",
        productId: 4,
        price: 400.0,
        quantity: 4,
        image: "https://choconnuts.in/wp-content/uploads/2023/08/Assorted-Chocolates-Rakhi-Gift-Box-in-Bhopal-Online-Order.jpeg",
      },
    ];

    for (const variant of variants) {
      await prisma.variant.create({
        data: variant,
      });
    }
    console.log("Variants added!");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

addVariants();
