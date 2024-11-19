import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import axios from "axios";

const AddCategoryModal = ({ isOpen, onClose, onAddCategory }) => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    imageUrl: "", // Change to imageUrl for URL input
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      // Send category data without rawMaterial
      await axios.post("https://zuvees-backend-2i63.onrender.com/api/categories", categoryData);
      onAddCategory(categoryData);
      setCategoryData({
        name: "",
        imageUrl: "", // Reset image URL field
      });
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Add New Category</DialogTitle>
      <DialogContent>
        <TextField
          name="name"
          label="Category Name"
          fullWidth
          margin="dense"
          value={categoryData.name}
          onChange={handleChange}
        />
        
        {/* Image URL input */}
        <TextField
          name="imageUrl"
          label="Image URL"
          fullWidth
          margin="dense"
          value={categoryData.imageUrl}
          onChange={handleChange}
        />

        {/* Image Preview */}
        {categoryData.imageUrl && (
          <Box sx={{ marginTop: "10px", textAlign: "center" }}>
            <img
              src={categoryData.imageUrl}
              alt="Category Preview"
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
          Add Category
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCategoryModal;
