import React, { useState } from 'react';

const ExpressionEval = () => {
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [textBoxValue, setTextBoxValue] = useState('');
  const [templateViews, setTemplateViews] = useState({});

  // Function to handle checkbox change
  const handleCheckboxChange = (template) => {
    let updatedSelectedTemplates;
    if (selectedTemplates.includes(template)) {
      updatedSelectedTemplates = selectedTemplates.filter((t) => t !== template);
    } else {
      updatedSelectedTemplates = [...selectedTemplates, template];
    }
    setSelectedTemplates(updatedSelectedTemplates);

    // Generate random tree elements for the selected template
    if (!updatedSelectedTemplates.includes(template)) return; // If template is unchecked, no need to generate tree elements

    // Generate some random tree elements
    const randomTreeElements = generateRandomTreeElements();

    // Set the random tree elements for the selected template
    setTemplateViews((prevTemplateViews) => ({
      ...prevTemplateViews,
      [template]: randomTreeElements,
    }));
  };

  // Function to generate random tree elements
  const generateRandomTreeElements = () => {
    // Generate random number of tree elements (e.g., between 1 and 5)
    const numElements = Math.floor(Math.random() * 5) + 1;
    const treeElements = [];

    // Generate each tree element
    for (let i = 0; i < numElements; i++) {
      treeElements.push(<div key={i}>Tree Element {i + 1}</div>);
    }

    return treeElements;
  };

  // Function to append operators and brackets to the textbox
  const appendToTextBox = (symbol) => {
    setTextBoxValue(textBoxValue + symbol);
  };

  // Function to handle submission and parse the mathematical expression
  const handleSubmit = () => {
    // Parse the mathematical expression here
    console.log('Parsing mathematical expression:', textBoxValue);
    // You can perform further actions here, such as sending the parsed expression to a backend server
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar with list of templates */}
      <div className="flex-none w-1/6 bg-gray-100 p-4 border-r border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Templates</h2>
        <ul>
          <li className="mb-2">
            <label className="flex items-center">
              <input type="checkbox" onChange={() => handleCheckboxChange('Template 1')} className="mr-2" />
              Template 1
            </label>
          </li>
          <li className="mb-2">
            <label className="flex items-center">
              <input type="checkbox" onChange={() => handleCheckboxChange('Template 2')} className="mr-2" />
              Template 2
            </label>
          </li>
          {/* Add more templates as needed */}
        </ul>
      </div>

      {/* Flex container for generated flexbox and permanent flexbox */}
      <div className="flex-1 flex flex-col">
        {/* Generated flexbox based on selected templates */}
        <div className="bg-gray-200 p-4 overflow-auto h-3/4">
          <h2 className="text-lg font-semibold mb-4">Template Views</h2>
          <div className="flex flex-wrap gap-4">
            {/* Display selected templates with random tree elements */}
            {selectedTemplates.map((template) => (
              <div key={template} className="p-4 bg-white border border-gray-300 rounded">
                <h3 className="text-lg font-semibold mb-2">{template}</h3>
                <div>
                  {/* Display random tree elements */}
                  {templateViews[template] && templateViews[template]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Permanent flexbox */}
        <div className="bg-white p-4 h-2/3 flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Expression Creation</h2>
          <input
            type="text"
            className="p-3 w-full h-16 bg-gray-100 border border-gray-300 rounded mb-2 font-mono text-lg"
            placeholder="Enter mathematical expression here"
            value={textBoxValue}
            onChange={(e) => setTextBoxValue(e.target.value)}
          />

          <div className="flex justify-start">
            {/* Buttons for arithmetic operators */}
            <button onClick={() => appendToTextBox('+')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l">+</button>
            <button onClick={() => appendToTextBox('-')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4">-</button>
            <button onClick={() => appendToTextBox('*')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4">x</button>
            <button onClick={() => appendToTextBox('/')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4">÷</button>
            <button onClick={() => appendToTextBox('%')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4">%</button>
            {/* Buttons for brackets */}
            <button onClick={() => appendToTextBox('(')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4"> ( </button>
            <button onClick={() => appendToTextBox(')')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r"> ) </button>
          </div>

          {/* Submit button */}
          <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ExpressionEval;
