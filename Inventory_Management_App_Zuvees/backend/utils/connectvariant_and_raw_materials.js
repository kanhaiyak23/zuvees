const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function connectRawMaterialsToVariants() {
    try {
      const connections = [
        { variantId: 1, rawMaterialId: 1 },
        { variantId: 1, rawMaterialId: 2 },
        { variantId: 4, rawMaterialId: 3 },
        { variantId: 4, rawMaterialId: 4 },
        { variantId: 4, rawMaterialId: 5 },
        { variantId: 7, rawMaterialId: 6 },
        { variantId: 7, rawMaterialId: 7 },
        { variantId: 10, rawMaterialId: 8 },
        { variantId: 10, rawMaterialId: 9 },
        

      ];
  
      for (const connection of connections) {
        await prisma.variant.update({
          where: { id: connection.variantId },
          data: {
            rawMaterials: {
              connect: { id: connection.rawMaterialId },
            },
          },
        });
      }
      console.log("Raw Materials connected to Variants!");
    } catch (error) {
      console.error(error);
    } finally {
      await prisma.$disconnect();
    }
  }
  
  connectRawMaterialsToVariants();
  