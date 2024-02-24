// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './global/sidebar';
import Header from './global/Header';
import DataProvision from './global/dataProvision/DataProvision';

const MainPage = () => {
  return (
    <Router>
      <div className="flex"> {/* Wrap Sidebar and Dashboard in a flex container */}
        <Sidebar />
        <div className="flex-grow"> {/* Ensure Dashboard occupies remaining space */}
          <Header />
          <Routes>
            <Route path="/data-provision" element={<DataProvision />} />
            <Route path="/" element={<DataProvision />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default MainPage;
