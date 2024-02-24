import React, { useState } from 'react';

const Header = () => {
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleMouseEnter = (button) => {
    setHoveredButton(button);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  const getButtonStyle = (button) => {
    if (hoveredButton === button) {
      return 'border-b-2 border-black text-black';
    }
    return 'text-blue-500';
  };

  return (
    <div className="text-center py-5 px-10 shadow-md flex justify-between items-center">
      <div className="flex items-center space-x-4">
        
      </div>
    </div>
  );
};

export default Header;