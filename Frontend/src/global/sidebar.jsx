// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white p-6">
      {/* Sidebar content */}
      <Link to="/data-provision" className="flex items-center mb-4 hover:bg-gray-700 transition-colors duration-200 rounded-lg p-2">
        <p className="font-poppins font-semi-bold">Data Provision</p>
      </Link>
      {/* Add similar Link components for other components */}
    </div>
  );
};

export default Sidebar;
