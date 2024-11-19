import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import logo from "../assets/WareView.png";
import plus from "../assets/icon-wrapper-h.png";
import Pagination from "@mui/material/Pagination";
import ProductsPage from "./Product/Product";
import CategoriesPage from "./Category/Category";
import RawMaterialsPage from "./RawMaterial/RawMaterial";
import ProductVariantsPage from "./ProductVariant/ProductVariant";
import { Search, Bell } from 'lucide-react';

const Dashboard = () => {
  const [selectedPage, setSelectedPage] = useState("products");

  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="h-20 px-8 flex items-center">
          <img
            src={logo}
            alt="ware view"
            className=" w-auto"
          />
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-white border-r border-gray-200">
          <Box sx={{ padding: "24px" }} className="space-y-6">
            <Typography variant="h4" className="text-xl font-semibold text-gray-800">
              Dashboard
            </Typography>
            
            <Box className="flex flex-col gap-3">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: selectedPage === "products" ? "#04B4FC" : "white",
                  color: selectedPage === "products" ? "white" : "#64748b",
                  textTransform: "none",
                  boxShadow: 'none',
                  padding: '12px 16px',
                  justifyContent: 'flex-start',
                  '&:hover': {
                    backgroundColor: selectedPage === "products" ? "#0396d6" : "#f8fafc",
                    boxShadow: 'none',
                  },
                }}
                onClick={() => handlePageChange("products")}
              >
                Products
              </Button>
              
              <Button
                variant="contained"
                sx={{
                  backgroundColor: selectedPage === "categories" ? "#04B4FC" : "white",
                  color: selectedPage === "categories" ? "white" : "#64748b",
                  textTransform: "none",
                  boxShadow: 'none',
                  padding: '12px 16px',
                  justifyContent: 'flex-start',
                  '&:hover': {
                    backgroundColor: selectedPage === "categories" ? "#0396d6" : "#f8fafc",
                    boxShadow: 'none',
                  },
                }}
                onClick={() => handlePageChange("categories")}
              >
                Categories
              </Button>
              
              <Button
                variant="contained"
                sx={{
                  backgroundColor: selectedPage === "raw-materials" ? "#04B4FC" : "white",
                  color: selectedPage === "raw-materials" ? "white" : "#64748b",
                  textTransform: "none",
                  boxShadow: 'none',
                  padding: '12px 16px',
                  justifyContent: 'flex-start',
                  '&:hover': {
                    backgroundColor: selectedPage === "raw-materials" ? "#0396d6" : "#f8fafc",
                    boxShadow: 'none',
                  },
                }}
                onClick={() => handlePageChange("raw-materials")}
              >
                Raw Materials
              </Button>
              
              <Button
                variant="contained"
                sx={{
                  backgroundColor: selectedPage === "product-variants" ? "#04B4FC" : "white",
                  color: selectedPage === "product-variants" ? "white" : "#64748b",
                  textTransform: "none",
                  boxShadow: 'none',
                  padding: '12px 16px',
                  justifyContent: 'flex-start',
                  '&:hover': {
                    backgroundColor: selectedPage === "product-variants" ? "#0396d6" : "#f8fafc",
                    boxShadow: 'none',
                  },
                }}
                onClick={() => handlePageChange("product-variants")}
              >
                Product variant
              </Button>
            </Box>
          </Box>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <div className="bg-white border-b border-gray-200 py-6 px-8">
            <div className="flex items-center justify-between">
              <div className="text-xl font-semibold text-gray-800">Inventory</div>
              
              <div className="flex items-center gap-6">
                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                {/* Add New Button */}
                <Button
                  variant="contained"
                  className="bg-[#04B4FC] hover:bg-[#0396d6] text-white shadow-none"
                  style={{ textTransform: "none" }}
                >
                  <img
                    src={plus}
                    alt="add"
                    className="w-4 h-4 mr-2"
                  />
                  Add New Products
                </Button>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="flex-1 p-8 bg-gray-50">
            <div className="bg-white rounded-lg shadow-sm p-6 min-h-[600px]">
              {selectedPage === "products" && <ProductsPage />}
              {selectedPage === "categories" && <CategoriesPage />}
              {selectedPage === "raw-materials" && <RawMaterialsPage />}
              {selectedPage === "product-variants" && <ProductVariantsPage />}
            </div>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="w-[358px] border-l border-gray-200 bg-white p-6">
          <div className="flex items-center gap-4">
            <Avatar 
              alt="User Profile" 
              src="/static/images/avatar/2.jpg"
              sx={{ width: 48, height: 48 }}
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">Admin User</h3>
              <p className="text-sm text-gray-500">admin@wareview.com</p>
            </div>
            <Bell className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center py-6 bg-white border-t border-gray-200">
        <Pagination 
          count={10} 
          variant="outlined" 
          shape="rounded"
          sx={{
            '& .MuiPaginationItem-root': {
              '&.Mui-selected': {
                backgroundColor: '#04B4FC',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#0396d6',
                },
              },
            },
          }} 
        />
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-8 py-6">
          <img
            src={logo}
            alt="ware view"
            className="h-10 w-auto mb-6"
          />
          <div className="border-t border-gray-200 pt-4 text-center text-sm text-gray-500">
            Privacy Policy © 2024 Newton School
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;