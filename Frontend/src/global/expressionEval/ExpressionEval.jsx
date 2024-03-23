import React, { useState } from 'react';
import JSONTree from 'react-json-view';

const ExpressionEval = () => {

  const jsonData = [
    {
      "template_name": "baradaf",
      "a": [
          "Month",
          "Unitsales",
          "Price"
      ]
    },
    {
      "template_name": "yalamiha",
      "a": [
          "Month",
          "Unitsales",
          "Price"
      ]
    }
  ];


  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [textBoxValue, setTextBoxValue] = useState('');
  const [templateViews, setTemplateViews] = useState({});
  const [selectedJsonData, setSelectedJsonData] = useState(null);

  const handleEdit = (edit) => {
    let attributeName;
    if (selectedJsonData && selectedJsonData.a) {
         if (edit.namespace) {
             // Assuming edit.namespace is an array representing the path to the edited attribute
             // Join the namespace array with '.' to form a path string
             attributeName = edit.namespace.join('.') + '.' + selectedJsonData.a[edit.name];
         } else {
             // If there's no namespace, the attribute is directly under the template
             attributeName = selectedJsonData.a[edit.name];
         }
    } else {
         // Handle the case where selectedJsonData or selectedJsonData.a is undefined
         console.error("JSON data or 'a' property is undefined.");
         return;
    }
   
    // Construct the path based on the template name and the attribute name
    // This assumes that the attribute is directly under the template and not nested further
    const path = `${selectedJsonData.template_name}.${attributeName}`;
    setTextBoxValue(textBoxValue + path);
};


const handleCheckboxChange = (template, index) => {
  let updatedSelectedTemplates;
  if (selectedTemplates.includes(template)) {
    updatedSelectedTemplates = selectedTemplates.filter((t) => t !== template);
  } else {
    updatedSelectedTemplates = [...selectedTemplates, template];
  }
  setSelectedTemplates(updatedSelectedTemplates);

  // Set the selected JSON data for the template
  setSelectedJsonData(jsonData[index]);
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
      <div className="flex-none w-1/6 bg-gray-100 p-4 border-r border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Templates</h2>
        <ul>
          {jsonData.map((data, index) => (
            <li key={index} className="mb-2">
              <label className="flex items-center">
                <input type="checkbox" onChange={() => handleCheckboxChange(data.template_name, index)} className="mr-2" />
                {data.template_name}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-gray-200 p-4 overflow-auto h-3/4">
          <h2 className="text-lg font-semibold mb-4">Template Views</h2>
          <div className="flex flex-wrap gap-4">
            {selectedTemplates.map((template) => (
              <div key={template} className="p-4 bg-white border border-gray-300 rounded">
                <h3 className="text-lg font-semibold mb-2">{template}</h3>
                <div>
                 {/* Use selectedJsonData to render the JSONTree component */}
                 <JSONTree
                    src={selectedJsonData}
                    onEdit={handleEdit}
                    readOnly // Prevents editing of textbox
                 />
                </div>
              </div>
            ))}
          </div>
        </div>

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
          {/* Arithmetic operators */}
            <button onClick={() => appendToTextBox('+')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l">+</button>
            <button onClick={() => appendToTextBox('-')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4">-</button>
            <button onClick={() => appendToTextBox('*')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4">x</button>
            <button onClick={() => appendToTextBox('/')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4">÷</button>
            <button onClick={() => appendToTextBox('%')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4">%</button>

            {/* Logical operators */}
            <button onClick={() => appendToTextBox('&')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4">&</button>
            <button onClick={() => appendToTextBox('|')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4">|</button>

            {/* Comparison operators */}
            <button onClick={() => appendToTextBox('==')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4">==</button>
            <button onClick={() => appendToTextBox('!=')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4">!=</button>
            <button onClick={() => appendToTextBox('<')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4">{'<'}</button>
            <button onClick={() => appendToTextBox('>')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4">{'>'}</button>
            <button onClick={() => appendToTextBox('<=')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4">{'<='}</button>
            <button onClick={() => appendToTextBox('>=')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4">{'>='}</button>

            {/* Brackets */}
            <button onClick={() => appendToTextBox('(')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4"> ( </button>
            <button onClick={() => appendToTextBox(')')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r"> ) </button>
          
          </div>
          <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded">Submit</button>
        </div>
      </div>
    </div>
 );
};

export default ExpressionEval;