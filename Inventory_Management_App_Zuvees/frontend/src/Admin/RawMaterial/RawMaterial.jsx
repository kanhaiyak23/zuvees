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
import AddRawMaterialModal from "./AddRawMaterial"; // Assuming you have an AddRawMaterialModal component
import axios from "axios"; // Import Axios for API calls

const RawMaterialPage = () => {
  const [rawMaterials, setRawMaterials] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  // Fetch raw materials from the backend
  useEffect(() => {
    const fetchRawMaterials = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/raw-materials");
        setRawMaterials(response.data);
      } catch (error) {
        console.error("Error fetching raw materials:", error);
      }
    };

    fetchRawMaterials();
  }, []);

  const handleAddRawMaterial = (newRawMaterial) => {
    setRawMaterials([...rawMaterials, newRawMaterial]);
    setModalOpen(false);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4">Raw Materials</Typography>
      <Button
        variant="contained"
        sx={{ marginTop: "20px" }}
        onClick={() => setModalOpen(true)}
      >
        Add New Raw Material
      </Button>

      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f4f5FC" }}>
              <TableCell>Raw Material Image</TableCell>
              <TableCell>Raw Material</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Category</TableCell> {/* Add column for category */}
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rawMaterials.map((material, index) => (
              <TableRow
                key={material.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f4f5FC" : "#fff",
                  padding: "20px",
                  marginTop: "10px",
                }}
              >
                <TableCell sx={{ padding: "10px" }}>
                  {material.image ? (
                    <Avatar alt="Raw Material Image" src={material.image} />
                  ) : (
                    <Avatar alt="No Image" />
                  )}
                </TableCell>
                <TableCell sx={{ padding: "10px" }}>{material.name}</TableCell>
                <TableCell sx={{ padding: "10px" }}>{material.code}</TableCell>
                <TableCell sx={{ padding: "10px" }}>
                  {material.category ? material.category.name : "N/A"} {/* Render category name */}
                </TableCell>
                <TableCell sx={{ padding: "10px" }}>${material.price}</TableCell>
                <TableCell sx={{ padding: "10px" }}>{material.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddRawMaterialModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAddRawMaterial={handleAddRawMaterial}
      />
    </Box>
  );
};

export default RawMaterialPage;
