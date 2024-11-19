const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoute");
const variantRoutes = require("./routes/variantRoutes");
const categoryRoutes = require("./routes/categoryRoute");
const rawMaterialRoutes = require("./routes/rawMaterialRoute");

// Middleware to parse incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:3000','https://zuvees-red.vercel.app/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Use routes
app.use("/api/products",productRoutes);
app.use("/api/variants", variantRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/raw-materials", rawMaterialRoutes);

// Error handling for unsupported routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
