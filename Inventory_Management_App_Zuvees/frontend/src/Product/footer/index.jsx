import React from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Top section with logo and social links */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-6 md:space-y-0">
          <div className="text-3xl font-bold">
            {/* Logo can be added here */}
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition">
              <Twitter size={24} />
            </a>
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 border-t border-b border-gray-200">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">About Us</h3>
            <p className="text-gray-600 text-sm">
              Crafting beautiful moments with handmade bouquets and floral arrangements since 2010. Every flower tells a story.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition">Shop</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition">Wedding Services</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition">Corporate Events</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition">Gift Cards</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition">Delivery Information</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition">Returns & Refunds</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition">Terms & Conditions</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition">Privacy Policy</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center space-x-2 text-gray-600">
                <MapPin size={18} />
                <span>123 Flower Street, Garden City, GC 12345</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-600">
                <Phone size={18} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-600">
                <Mail size={18} />
                <span>hello@zuees.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright section */}
        <div className="pt-8 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} zuees. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
