import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from "@mui/material";
import AddProductModal from "./AddProductModal";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  // Fetch products and categories from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://zuvees-backend-2i63.onrender.com/api/products");
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setProducts(data);
        } else {
          console.error("Failed to fetch products:", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch("https://zuvees-backend-2i63.onrender.com/api/categories");
        const data = await response.json();
        if (response.ok) {
          setCategories(data);
        } else {
          console.error("Failed to fetch categories:", data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4">Products</Typography>
      <Button
        variant="contained"
        sx={{ marginTop: "20px" }}
        onClick={() => setModalOpen(true)}
      >
        Add New Product
      </Button>

      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f4f5FC" }}>
              <TableCell>Product Image</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Default Variant</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow
                key={product.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f4f5FC" : "#fff",
                }}
              >
                <TableCell sx={{ padding: "10px" }}>
                  {product.image ? (
                    <Avatar alt="Product Image" src={product.image} />
                  ) : (
                    <Avatar alt="No Image" />
                  )}
                </TableCell>
                <TableCell sx={{ padding: "10px" }}>{product.name}</TableCell>
                <TableCell sx={{ padding: "10px" }}>
                  {product.category?.name || getCategoryName(product.categoryId)}
                </TableCell>
                <TableCell sx={{ padding: "10px" }}>${product.price}</TableCell>
                <TableCell sx={{ padding: "10px" }}>{product.defaultVariant}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </Box>
  );
};

export default ProductsPage;
