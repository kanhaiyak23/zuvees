import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Box,
} from "@mui/material";

const AddProductModal = ({ isOpen, onClose, onAddProduct }) => {
  const [productData, setProductData] = useState({
    name: "",
    price: 0.0,
    defaultVariant: "",
    imageUrl: "",
    category: "",
  });
  
  const [categories, setCategories] = useState([]); // To store fetched categories

  // Fetch categories when the modal is opened
  useEffect(() => {
    if (isOpen) {
      // Fetch categories from API
      axios
        .get("https://zuvees-backend-2i63.onrender.com/api/categories")
        .then((response) => {
          setCategories(response.data); // Assuming response contains the categories
        })
        .catch((error) => {
          console.error("Failed to fetch categories:", error);
        });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async () => {
    const formData = {
      name: productData.name,
      price: productData.price,
      defaultVariant: productData.defaultVariant,
      category: productData.category,
      imageUrl: productData.imageUrl,
    };

    try {
      const response = await axios.post(
        "https://zuvees-backend-2i63.onrender.com/api/products",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        onAddProduct(response.data);
        onClose();
      }
    } catch (error) {
      console.error("Failed to add product:", error.response?.data || error.message);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent>
        <TextField
          name="name"
          label="Product Name"
          fullWidth
          margin="dense"
          value={productData.name}
          onChange={handleChange}
        />
        {/* Category select with dynamic options */}
        <TextField
          name="category"
          label="Category"
          select
          fullWidth
          margin="dense"
          value={productData.category}
          onChange={handleChange}
        >
          {/* Display categories fetched from API */}
          {categories.length > 0 ? (
            categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="">No categories available</MenuItem>
          )}
        </TextField>
        <TextField
          name="price"
          label="Price"
          type="number"
          fullWidth
          margin="dense"
          value={productData.price}
          onChange={handleChange}
        />
        <TextField
          name="defaultVariant"
          label="Default Variant"
          fullWidth
          margin="dense"
          value={productData.defaultVariant}
          onChange={handleChange}
        />
        <TextField
          name="imageUrl"
          label="Image URL"
          fullWidth
          margin="dense"
          value={productData.imageUrl}
          onChange={handleChange}
        />

        {/* Preview Image */}
        {productData.imageUrl && (
          <Box sx={{ marginTop: "10px", textAlign: "center" }}>
            <img
              src={productData.imageUrl}
              alt="Product Preview"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Add Product
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductModal;
