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
import axios from "axios"; // Import Axios for API calls
import AddCategoryModal from "./AddCategoryModal";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://zuvees-backend-2i63.onrender.com/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
    setModalOpen(false);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4">Categories</Typography>
      <Button
        variant="contained"
        sx={{ marginTop: "20px" }}
        onClick={() => setModalOpen(true)}
      >
        Add New Category
      </Button>

      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
  <Table>
    <TableHead>
      <TableRow sx={{ backgroundColor: "#f4f5FC" }}>
       
        <TableCell>Code</TableCell>
        <TableCell>Category</TableCell>
        <TableCell>Raw Material</TableCell>
        <TableCell>Raw Material Quantity</TableCell> {/* New column for raw material quantity */}
         {/* Quantity of category */}
      </TableRow>
    </TableHead>
    <TableBody>
  {categories.map((category, index) => (
    <TableRow
      key={category.id}
      sx={{
        backgroundColor: index % 2 === 0 ? "#f4f5FC" : "#fff",
        padding: "20px",
        marginTop: "10px",
      }}
    >
      {/* <TableCell sx={{ padding: "10px" }}>
        {category.image ? (
          <Avatar alt="Category Image" src={category.image} />
        ) : (
          <Avatar alt="No Image" />
        )}
      </TableCell> */}
      <TableCell sx={{ padding: "10px" }}>{category.id}</TableCell>
      <TableCell sx={{ padding: "10px" }}>{category.name}</TableCell>

      {/* Display Raw Materials Name */}
      <TableCell sx={{ padding: "10px" }}>
        {
          Array.isArray(category.rawMaterials) && category.rawMaterials.length > 0
            ? category.rawMaterials
                .filter(rawMaterial => rawMaterial.categoryId === category.id) // Filter raw materials by categoryId
                .map(rawMaterial => (
                  <div key={rawMaterial.id}>
                    {rawMaterial.name}
                  </div>
                ))
            : "No raw materials available"
        }
      </TableCell>

      {/* Display Raw Materials Quantity */}
      <TableCell sx={{ padding: "10px" }}>
        {
          Array.isArray(category.rawMaterials) && category.rawMaterials.length > 0
            ? category.rawMaterials
                .filter(rawMaterial => rawMaterial.categoryId === category.id) // Filter raw materials by categoryId
                .map(rawMaterial => (
                  <div key={rawMaterial.id}>
                    {rawMaterial.quantity}
                  </div>
                ))
            : "No quantity available"
        }
      </TableCell>
    </TableRow>
  ))}
</TableBody>

  </Table>
</TableContainer>




      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAddCategory={handleAddCategory}
        existingCodes={categories.map((category) => category.code)}
      />
    </Box>
  );
};

export default CategoryPage;
