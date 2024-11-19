import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronRight, User } from 'lucide-react';
import Footer from './footer';

const UserPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAdminPasscode, setShowAdminPasscode] = useState(false);
  const [passcode, setPasscode] = useState('');
  const navigate = useNavigate();

  // Fetch categories and products
  useEffect(() => {
    // Fetch categories using Axios
    axios.get('http://localhost:3001/api/categories')
      .then(response => {
        setCategories(response.data);
        if (response.data.length > 0) {
          setSelectedCategory(response.data[0].id); // Set first category as default
        }
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });

    // Fetch all products using Axios
    axios.get('http://localhost:3001/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // Filter products based on the selected category
  const filteredProducts = products.filter(product => product.categoryId === selectedCategory);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Admin passcode check
  const isAdmin = () => {
    return localStorage.getItem('admin_token') === 'admin123'; // Check stored admin token
  };

  // Handle admin passcode submission
  const handlePasscodeSubmit = () => {
    if (passcode === 'admin123') {
      localStorage.setItem('admin_token', 'admin123');
      setShowAdminPasscode(false); // Close the passcode input
      alert('Admin access granted');
      navigate('/admin'); // Redirect to the admin page if the user is an admin
    } else {
      alert('Incorrect passcode');
    }
  };

  // Navigate to the admin page
  const goToAdminPage = () => {
    if (isAdmin()) {
      navigate('/admin'); // Redirect to the admin page if the user is an admin
    } else {
      setShowAdminPasscode(true); // Show the passcode form if not admin
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Navigation */}
      <nav className="py-4 flex items-center justify-between">
        <div className="text-2xl font-bold">
          zu<span className="text-red-500">♥</span>ees
        </div>
        <div className="flex items-center space-x-8 bg-gray-100 rounded-full px-6 py-2">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${selectedCategory === category.id ? 'bg-rose-200' : ''} px-4 py-1 rounded-full`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={goToAdminPage} className="p-2 text-sm font-semibold text-blue-600">
            Admin
          </button>
          <button className="p-2">
            <User size={24} />
          </button>
        </div>
      </nav>

      {/* Admin Passcode Form */}
      {showAdminPasscode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Enter Admin Passcode</h2>
            <input
              type="password"
              placeholder="Enter passcode"
              className="border border-gray-300 p-2 rounded mb-4 w-full"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
            />
            <div className="flex justify-between">
              <button
                onClick={handlePasscodeSubmit}
                className="bg-blue-600 text-white py-2 px-4 rounded"
              >
                Submit
              </button>
              <button
                onClick={() => setShowAdminPasscode(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative mt-4 rounded-2xl overflow-hidden">
        <img
          src="https://www.wedding-recycle.com/wp-content/uploads/2024/02/bride-diy-bouquet-1024x683.jpg"
          alt="Florist making bouquet"
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <span>Summer special Handmade bouquet</span>
          <ChevronRight size={20} />
        </div>
      </div>

      {/* Product Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Products</h2>
        <div className="relative">
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {filteredProducts.length === 0 ? (
              <p>No products available in this category</p>
            ) : (
              filteredProducts.map((product) => (
                <div key={product.id} className="flex-none w-64" onClick={() => handleProductClick(product.id)}>
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="mt-2">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.price}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2">
            <ChevronRight size={24} />
          </button>
        </div> 
      </div>
     <Footer/>
    </div>
  );
};

export default UserPage;
