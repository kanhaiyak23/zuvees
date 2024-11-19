import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";
import axios from "axios";

const AddRawMaterialModal = ({ isOpen, onClose, onAddRawMaterial, existingCodes }) => {
  const [rawMaterialData, setRawMaterialData] = useState({
    rawMaterial: "",
    code: "",
    category: "",
    price: "",
    quantity: "",
  });
  
  const [categories, setCategories] = useState([]); // State for categories

  // Fetch categories when the modal is opened
  useEffect(() => {
    if (isOpen) {
      const fetchCategories = async () => {
        try {
          const response = await axios.get("https://zuvees-backend-2i63.onrender.com/api/categories");
          if (response.status === 200) {
            setCategories(response.data); // Set the categories from the API
          } else {
            console.error("Failed to fetch categories:", response.data.message);
          }
        } catch (error) {
          console.error("Error fetching categories:", error.response?.data || error.message);
        }
      };

      fetchCategories();
    }
  }, [isOpen]);

  // Function to generate unique code
  const generateUniqueCode = (codes = []) => {
    let newCode;
    do {
      newCode = `RM${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`;
    } while (codes.includes(newCode));
    return newCode;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRawMaterialData({ ...rawMaterialData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const uniqueCode = generateUniqueCode(existingCodes); // Get a unique code
      const payload = { ...rawMaterialData, code: uniqueCode };

      // API call to save the raw material to the database
      const response = await axios.post("https://zuvees-backend-2i63.onrender.com/api/raw-materials", payload);

      if (response.status === 201) {
        // Call the callback to update the UI
        onAddRawMaterial(response.data);

        // Reset the form
        setRawMaterialData({
          rawMaterial: "",
          code: "",
          category: "",
          price: "",
          quantity: "",
        });

        // Close the modal
        onClose();
      } else {
        console.error("Failed to add raw material:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding raw material:", error.response?.data || error.message);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Add Raw Material</DialogTitle>
      <DialogContent>
        <TextField
          name="rawMaterial"
          label="Raw Material Name"
          fullWidth
          margin="dense"
          value={rawMaterialData.rawMaterial}
          onChange={handleChange}
        />
        
        {/* Dynamic Category Select */}
        <TextField
          name="category"
          label="Category"
          select
          fullWidth
          margin="dense"
          value={rawMaterialData.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          name="price"
          label="Price"
          type="number"
          fullWidth
          margin="dense"
          value={rawMaterialData.price}
          onChange={handleChange}
        />
        <TextField
          name="quantity"
          label="Quantity"
          type="number"
          fullWidth
          margin="dense"
          value={rawMaterialData.quantity}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Add Raw Material
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRawMaterialModal;
