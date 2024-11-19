// src/services/api.js

import axios from "axios";

// Set the base URL for API requests (make sure the backend is running on the same URL or adjust accordingly)
const API_URL = "http://localhost:3001/api"; // Update this based on your backend URL

// Get all products
export const getAllProducts = () => axios.get(`${API_URL}/products`);

// Create a new product
export const createProduct = (data) => axios.post(`${API_URL}/products`, data);

// Get all variants
export const getAllVariants = () => axios.get(`${API_URL}/variants`);

// Create a new variant
export const createVariant = (data) => axios.post(`${API_URL}/variants`, data);

// Get all categories
export const getAllCategories = () => axios.get(`${API_URL}/categories`);

// Create a new category
export const createCategory = (data) => axios.post(`${API_URL}/categories`, data);

// Get all raw materials
export const getAllRawMaterials = () => axios.get(`${API_URL}/raw-materials`);

// Create a new raw material
export const createRawMaterial = (data) => axios.post(`${API_URL}/raw-materials`, data);
