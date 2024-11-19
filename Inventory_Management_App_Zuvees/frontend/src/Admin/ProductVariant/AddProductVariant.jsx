import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";

const AddProductVariantModal = ({ isOpen, onClose, onAddProductVariant }) => {
  const [newVariant, setNewVariant] = useState({
    name: "",
    code: "",
    productId: "",
    price: "",
    quantity: "",
    image: "",
  });

  const [products, setProducts] = useState([]);

  // Fetch products when modal is opened
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://zuvees-backend-2i63.onrender.com/api/products");
        setProducts(response.data); // Assuming the endpoint returns products in the format [{ id, name }]
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (isOpen) {
      fetchProducts();
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVariant({ ...newVariant, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      // API call to save the product variant to the database
      const response = await axios.post("https://zuvees-backend-2i63.onrender.com/api/variants", newVariant);

      if (response.status === 201) {
        // Call the callback with the new variant data
        onAddProductVariant(response.data);
        // Reset the form
        setNewVariant({
          name: "",
          code: "",
          productId: "",
          price: "",
          quantity: "",
          image: "",
        });
        // Close the modal
        onClose();
      } else {
        console.error("Failed to add product variant:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding product variant:", error.response?.data || error.message);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" sx={{ marginBottom: "20px" }}>
          Add New Product Variant
        </Typography>

        <TextField
          fullWidth
          label="Variant Name"
          name="name"
          value={newVariant.name}
          onChange={handleInputChange}
          sx={{ marginBottom: "15px" }}
        />

        <TextField
          fullWidth
          label="Code"
          name="code"
          value={newVariant.code}
          onChange={handleInputChange}
          sx={{ marginBottom: "15px" }}
        />

        {/* Dropdown for selecting a product */}
        <FormControl fullWidth sx={{ marginBottom: "15px" }}>
          <InputLabel>Product</InputLabel>
          <Select
            name="productId"
            value={newVariant.productId}
            onChange={handleInputChange}
            label="Product"
          >
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Price"
          type="number"
          name="price"
          value={newVariant.price}
          onChange={handleInputChange}
          sx={{ marginBottom: "15px" }}
        />

        <TextField
          fullWidth
          label="Quantity"
          type="number"
          name="quantity"
          value={newVariant.quantity}
          onChange={handleInputChange}
          sx={{ marginBottom: "15px" }}
        />

        <TextField
          fullWidth
          label="Image URL"
          name="image"
          value={newVariant.image}
          onChange={handleInputChange}
          sx={{ marginBottom: "15px" }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ marginTop: "15px" }}
        >
          Add Product Variant
        </Button>
      </Box>
    </Modal>
  );
};

// Style for modal box
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "8px",
  boxShadow: 24,
};

export default AddProductVariantModal;
