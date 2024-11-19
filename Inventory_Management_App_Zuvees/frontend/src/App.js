// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Admin/Dashboard";


import User from '../src/Product/main'
import Description from '../src/Product/description/index'
const App = () => {
  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/admin" element={<Dashboard />} />
         
          
         
          <Route path="/" element={<User />} />
          
          <Route path="/product/:productId" element={<Description />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
