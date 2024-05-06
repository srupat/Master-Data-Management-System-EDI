import React from 'react';
import { Link } from 'react-router-dom';
import { GoFoldUp } from "react-icons/go";
import { MdOutlineAnalytics } from "react-icons/md";
import { IoMdCheckboxOutline } from "react-icons/io";
import { TbMathFunction } from "react-icons/tb";
import { BiAnalyse } from "react-icons/bi";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-15 bg-slate-800 text-white p-6">
      {/* Sidebar content */}
      <div className="mb-4"> {/* Increased margin-bottom */}
        <Link to="/data-provision" className="flex items-center hover:bg-gray-700 hover:shadow-lg transition-colors duration-200 rounded-lg">
          <GoFoldUp size={35} title="Upload CSVs for data provisioning" /> {/* Increase the size of the icon */}
        </Link>
      </div>
      <div className="mb-4"> {/* Increased margin-bottom */}
        <Link to="/analytics" className="flex items-center hover:bg-gray-700 hover:shadow-lg transition-colors duration-200 rounded-lg">
          <MdOutlineAnalytics size={35} title="Access Analytics Service" /> {/* Increase the size of the icon */}
        </Link>
      </div>
      {/* Add similar Link components for other components */}
      <div className="mb-4"> {/* Increased margin-bottom */}
        <Link to="/expression-eval" className="flex items-center hover:bg-gray-700 hover:shadow-lg transition-colors duration-200 rounded-lg">
          <TbMathFunction size={35} title="Expression creation" /> {/* Increase the size of the icon */}
        </Link>
      </div>
      <div className="mb-4"> {/* Increased margin-bottom */}
        <Link to="/payroll-check" className="flex items-center hover:bg-gray-700 hover:shadow-lg transition-colors duration-200 rounded-lg">
          <IoMdCheckboxOutline size={35} title="Payroll check" /> {/* Increase the size of the icon */}
        </Link>
      </div>
      <div className="mb-4"> {/* Increased margin-bottom */}
        <Link to="/operations" className="flex items-center hover:bg-gray-700 hover:shadow-lg transition-colors duration-200 rounded-lg">
          <BiAnalyse  size={35} title="Operations" /> {/* Increase the size of the icon */}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;