import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';

const AnalyticsService = () => {


  // State to manage the visibility of each panel's content
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const storedState = sessionStorage.getItem('collapsedPanels');
    return storedState ? JSON.parse(storedState) : {
      templates: false,
      methods: false,
    };
  });

  // Update sessionStorage when state changes
  useEffect(() => {
    sessionStorage.setItem('collapsedPanels', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const toggleCollapse = (panelKey) => {
    setIsCollapsed(prevState => ({
      ...prevState,
      [panelKey]: !prevState[panelKey],
    }));
  };

  const fetchData = async () => {
    // Implement your fetchData logic here
  };

  const submitData = async (data) => {
    // Implement your submitData logic here
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Draggable defaultPosition={{x:   0, y:   0}}>
        <div className={`bg-white p-4 rounded-md shadow-md relative ${isCollapsed.templates ? 'h-16' : 'h-auto'} w-full md:w-1/2 lg:w-2/4`}>
          <h3 className="text-lg font-medium mb-2">Templates</h3>
          {!isCollapsed.templates && (
            <>
              <p>This is the content of Panel  1</p>
              <button onClick={fetchData} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Fetch Data</button>
              <button onClick={() => submitData({ /* Your data here */ })} className="bg-green-500 text-white px-4 py-2 rounded-md mt-4">Submit Data</button>
            </>
          )}
          <button onClick={() => toggleCollapse('templates')} className="bg-gray-200 text-black px-4 py-2 rounded-md mt-4 absolute top-0 right-0 mt-2 mr-2">
            {isCollapsed.templates ? 'Expand' : 'Collapse'}
          </button>
        </div>
      </Draggable>
      <Draggable defaultPosition={{x:   100, y:   100}}>
        <div className={`bg-white p-4 rounded-md shadow-md relative ${isCollapsed.methods ? 'h-16' : 'h-auto'} w-full md:w-1/2 lg:w-2/4`}>
          <h3 className="text-lg font-medium mb-2">Methods</h3>
          {!isCollapsed.methods && (
            <>
              <p>This is the content of Panel  2</p>
              <button onClick={fetchData} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Fetch Data</button>
              <button onClick={() => submitData({ /* Your data here */ })} className="bg-green-500 text-white px-4 py-2 rounded-md mt-4">Submit Data</button>
            </>
          )}
          <button onClick={() => toggleCollapse('methods')} className="bg-gray-200 text-black px-4 py-2 rounded-md mt-4 absolute top-0 right-0 mt-2 mr-2">
            {isCollapsed.methods ? 'Expand' : 'Collapse'}
          </button>
        </div>
      </Draggable>
      {/* Add more draggable panels as needed */}
    </div>
  );
};

export default AnalyticsService;
