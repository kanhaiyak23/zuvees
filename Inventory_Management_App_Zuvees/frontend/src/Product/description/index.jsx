import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';

const ProductPage = () => {
  const { productId } = useParams();  // Get productId from URL params
  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [categories, setCategories] = useState([]); // State to store categories
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch product details and variants based on productId
  useEffect(() => {
    // Fetch product details
    axios.get(`http://localhost:3001/api/products/${productId}`)
      .then(response => {
        setProduct(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });

    // Fetch variants for the product
    axios.get(`http://localhost:3001/api/variants/${productId}`)
      .then(response => {
        console.log(response.data);
        setVariants(response.data); // Assuming response data contains product variants
      })
      .catch(error => {
        console.error('Error fetching variants:', error);
      });
  }, [productId]);

  // Fetch categories from the API
  useEffect(() => {
    axios.get('http://localhost:3001/api/categories') // Replace with your categories API endpoint
      .then(response => {
        setCategories(response.data); // Assuming response data contains the categories
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const nextSlide = () => {
    const allImages = [product?.mainImage, ...variants.map(variant => variant.image)];
    setCurrentSlide((prev) => (prev + 1) % allImages.length);
  };

  const prevSlide = () => {
    const allImages = [product?.mainImage, ...variants.map(variant => variant.image)];
    setCurrentSlide((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Handle variant image click
  const handleVariantClick = (index) => {
    setCurrentSlide(index);
  };

  if (!product) return <div>Loading...</div>; // Handle loading state

  // Combine main image and variant images into one list for the carousel
  const allImages = [product?.image, ...variants.map(variant => variant.image)];
  console.log(allImages)

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Navigation */}
      <nav className="flex items-center justify-between py-4">
        <div className="text-2xl font-bold">zuvees</div>
        
        {/* Dynamically generate category buttons */}
        <div className="flex space-x-4 bg-gray-100 rounded-full px-6 py-2">
          {categories.map((category) => (
            <button key={category.id} className="px-4 py-1">
              {category.name}
            </button>
          ))}
        </div>

        <User className="w-6 h-6" />
      </nav>

      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
        {/* Image Carousel */}
        <div className="relative">
          <div className="aspect-w-4 aspect-h-3 bg-black rounded-lg overflow-hidden">
            <img
              src={allImages.length ? allImages[currentSlide] : '/api/placeholder/800/600'}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>
          
          {/* Carousel Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {allImages.length && allImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full ${
                  currentSlide === idx ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold">Rs. {product.price}</span>
            <div className="flex items-center">
              <div className="flex text-rose-500">
                {'★'.repeat(4)}{'☆'.repeat(1)} {/* Assuming product rating is 4/5 */}
              </div>
              <span className="text-gray-500 ml-2">({product.reviewsCount} reviews)</span>
            </div>
          </div>

          <p className="text-gray-600">{product.description}</p>

          {/* Variants */}
          <div className="grid grid-cols-4 gap-4">
            {variants.map((variant, idx) => (
              <div key={idx} className="space-y-2">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src={variant.image}
                    alt={variant.name}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => handleVariantClick(idx + 1)} // Click to set currentSlide based on variant
                  />
                </div>
                <p className="text-sm text-center">{variant.name}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-600">{product.longDescription}</p>

          <button className="w-full bg-rose-300 text-white py-4 rounded-full font-semibold hover:bg-rose-400 transition-colors">
            Send Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
