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
import AddProductVariantModal from "./AddProductVariant"; // Assuming the modal component is in the same folder
import axios from "axios"; // Axios for making API calls

const ProductVariantsPage = () => {
  const [productVariants, setProductVariants] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  // Fetch product variants from the database
  useEffect(() => {
    const fetchProductVariants = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/variants");
        setProductVariants(response.data);
      } catch (error) {
        console.error("Error fetching product variants:", error);
      }
    };

    fetchProductVariants();
  }, []);

  const handleAddProductVariant = (newVariant) => {
    setProductVariants([...productVariants, newVariant]);
    setModalOpen(false);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4">Product Variants</Typography>
      <Button
        variant="contained"
        sx={{ marginTop: "20px" }}
        onClick={() => setModalOpen(true)}
      >
        Add New Product Variant
      </Button>

      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f4f5FC" }}>
              <TableCell>Variant Image</TableCell>
              <TableCell>Variant Name</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productVariants.map((variant, index) => (
              <TableRow
                key={variant.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f4f5FC" : "#fff", // Alternate row colors
                  padding: "20px", // Padding for each row
                  marginTop: "10px", // Space between rows
                }}
              >
                <TableCell sx={{ padding: "10px" }}>
                  {variant.image ? (
                    <Avatar alt="Variant Image" src={variant.image} />
                  ) : (
                    <Avatar alt="No Image" />
                  )}
                </TableCell>
                <TableCell sx={{ padding: "10px" }}>{variant.name}</TableCell>
                <TableCell sx={{ padding: "10px" }}>{variant.code}</TableCell>
                <TableCell sx={{ padding: "10px" }}>{variant.product?.name || "N/A"}</TableCell>
                <TableCell sx={{ padding: "10px" }}>${variant.price}</TableCell>
                <TableCell sx={{ padding: "10px" }}>{variant.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddProductVariantModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAddProductVariant={handleAddProductVariant}
      />
    </Box>
  );
};

export default ProductVariantsPage;
