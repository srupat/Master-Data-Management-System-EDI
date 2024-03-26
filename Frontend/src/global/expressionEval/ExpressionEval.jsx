import React, { useState, useEffect } from 'react';
import JSONTree from 'react-json-view';
import './TemplateView.css'
import { getAllTemplates, submitExpressionForAttributeAttachment, submitExpressionForTemplateAttachment } from '../api/TemplateApiServices';

const ExpressionEval = () => {

  const [DataType, setDataType] = useState('');
  const [dropdownValueForAttachment, setDropdownValueForAttachment] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [attributeName, setAttributeName] = useState('');
  const [expressionName, setExpressionName] = useState('');
  const [expressionType, setExpressionType] = useState('');
  const [jsonData, setJsonData] = useState([]); // State to store the fetched JSON data
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [textBoxValue, setTextBoxValue] = useState('');
  const [selectedJsonData, setSelectedJsonData] = useState(null); // State to store selected JSON data

  useEffect(() => {
    // Function to fetch JSON data from the backend
    getAllTemplates()
      .then(response => {
        setJsonData(response.data)
      })
  }, []);

  const handleEdit = (edit) => {
    let path = edit.existing_src.template_name;

    if (edit.name === "attribute_name") {
      path += ".a";
    }

    else if (edit.name === "expression") {
      path += ".e";
    }
    console.log(edit)

    path += "." + edit.new_value;
    setTextBoxValue(textBoxValue + ' ' + path)
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


  // Function to append operators and brackets to the textbox
  const appendToTextBox = (symbol) => {
    setTextBoxValue(textBoxValue + symbol);
  };

  const handleSubmit = () => {
    console.log('Parsing mathematical expression:', textBoxValue);

    if (dropdownValueForAttachment === 'attributeExpression') {
      submitExpressionForAttributeAttachment(templateName, attributeName, textBoxValue);
    } else if (dropdownValueForAttachment === 'templateExpression') {
      // Define expJson here
      let ExpJson = {
        name: expressionName,
        expressionString: textBoxValue,
        type: expressionType,
        dataType: DataType
      };

      submitExpressionForTemplateAttachment(templateName, ExpJson)
        .then(console.log(ExpJson))
        .catch(error => console.log(error));
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-none w-1/5 bg-gray-100 p-4 border-r border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Templates</h2>
        <div>
        <ul>
        {Array.isArray(jsonData) && jsonData.map((data, index) => (
          <li key={index} className="mb-2">
            <div className="template-item">
              <input type="checkbox" onChange={() => handleCheckboxChange(data.template_name, index)} className="mr-2" />
              {data.template_name}
            </div>
          </li>
        ))}
        </ul>
        </div>

        {/* Horizontal line for segregation */}
        <hr className="my-6 border-gray-300" />
        <div>
          {/* Form with inputs */}
          <form>
            <div className="mb-4">
              <label htmlFor="templateName" className="block text-sm font-medium text-gray-700">Template Name</label>
              <input
                type="text"
                id="templateName"
                name="templateName"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                className="mt-1 p-3 w-full bg-gray-100 border border-gray-300 rounded font-mono text-lg"
                placeholder="Enter template name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="templateDropdown" className="block text-sm font-medium text-gray-700">Select Option</label>
              <select
                id="templateDropdown"
                name="templateDropdown"
                value={dropdownValueForAttachment}
                onChange={(e) => {
                  setDropdownValueForAttachment(e.target.value);
                  // Reset additional form options when dropdown value changes
                }}
                className="mt-1 p-3 w-full bg-gray-100 border border-gray-300 rounded font-mono text-lg"
              >
                <option value="">Select...</option>
                <option value="attributeExpression">Attribute Expression</option>
                <option value="templateExpression">Template Expression</option>
              </select>
            </div>

            {dropdownValueForAttachment === 'attributeExpression' && (
              <div className="mb-4">
                <label htmlFor="attributeName" className="block text-sm font-medium text-gray-700">Enter Attribute Name</label>
                <input
                  type="text"
                  id="attributeName"
                  name="attributeName"
                  value={attributeName}
                  onChange={(e) => setAttributeName(e.target.value)}
                  className="mt-1 p-3 w-full bg-gray-100 border border-gray-300 rounded font-mono text-lg"
                  placeholder="Enter Attribute name"
                />
              </div>
            )}

            {/* Additional form options for Template Expression */}
            {dropdownValueForAttachment === 'templateExpression' && (
              <div>
                <div className="mb-4">
                  <label htmlFor="expressionName" className="block text-sm font-medium text-gray-700">Enter Expression Name</label>
                  <input
                    type="text"
                    id="expressionName"
                    name="expressionName"
                    value={expressionName}
                    onChange={(e) => setExpressionName(e.target.value)}
                    className="mt-1 p-3 w-full bg-gray-100 border border-gray-300 rounded font-mono text-lg"
                    placeholder="Enter expression name"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="expressionType" className="block text-sm font-medium text-gray-700">Select Expression Type</label>
                  <select
                    id="expressionType"
                    name="expressionType"
                    value={expressionType}
                    onChange={(e) => setExpressionType(e.target.value)}
                    className="mt-1 p-3 w-full bg-gray-100 border border-gray-300 rounded font-mono text-lg"
                  >
                    <option value="">Select...</option>
                    <option value="Conditional">Conditional</option>
                    <option value="Arithmetic">Arithmetic</option>
                  </select>
                </div>
                {/* Additional form options for Conditional Expression */}
                {expressionType === 'Conditional' && (
                  <div>
                    <div className="mb-4">
                      <label htmlFor="expressionType" className="block text-sm font-medium text-gray-700">Data Type</label>
                      <input
                        type="text"
                        id="DataType"
                        name="DataType"
                        value={DataType}
                        onChange={(e) => setDataType(e.target.value)}
                        className="mt-1 p-3 w-full bg-gray-100 border border-gray-300 rounded font-mono text-lg"
                        placeholder="Enter data type"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </div>


      <div className="flex-1 flex flex-col">
        <div className="bg-gray-200 p-4 overflow-auto h-3/4">
          <h2 className="text-lg font-semibold mb-4">Template Views</h2>
          <div className="flex flex-wrap gap-4">
            {selectedTemplates.map((template, index) => {
              // Find the corresponding JSON data for the selected template
              const templateData = jsonData.find(data => data.template_name === template);
              return (
                <div key={index} className="p-4 bg-white border border-gray-300 rounded">
                  <h3 className="text-lg font-semibold mb-2">{template}</h3>
                  <div>
                    {/* Render the JSONTree component with the data for the selected template */}
                    <JSONTree
                      src={templateData}
                      onEdit={handleEdit}
                      className="transparent-brackets"
                      shouldExpandNode={() => false}
                      theme={{
                        base00: "white",
                        base01: "#000",
                        base02: "white",
                        base03: "#444",
                        base04: "white",
                        base05: "white",
                        base06: "white",
                        base07: "#444",
                        base08: "#444",
                        base09: "rgba(70, 70, 230, 1)",
                        base0A: "white",
                        base0B: "white",
                        base0C: "white",
                        base0D: "rgba(70, 70, 230, 1)",
                        base0E: "rgba(70, 70, 230, 1)",
                        base0F: "rgba(70, 70, 230, 1)"
                      }}
                      displayDataTypes={false} // Hide data types 
                      hideRoot
                    />

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-4 h-3/5 flex flex-col">
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
            <button onClick={() => appendToTextBox(' +')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l">+</button>
            <button onClick={() => appendToTextBox(' -')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4">-</button>
            <button onClick={() => appendToTextBox(' *')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4">x</button>
            <button onClick={() => appendToTextBox(' /')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4">÷</button>
            <button onClick={() => appendToTextBox(' %')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4">%</button>

            {/* Logical operators */}
            <button onClick={() => appendToTextBox(' &')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4">&</button>
            <button onClick={() => appendToTextBox(' |')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4">|</button>

            {/* Comparison operators */}
            <button onClick={() => appendToTextBox(' ==')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4">==</button>
            <button onClick={() => appendToTextBox(' !=')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4">!=</button>
            <button onClick={() => appendToTextBox(' <')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4">{'<'}</button>
            <button onClick={() => appendToTextBox(' >')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4">{'>'}</button>
            <button onClick={() => appendToTextBox(' <=')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4">{'<='}</button>
            <button onClick={() => appendToTextBox(' >=')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4">{'>='}</button>

            {/* Brackets */}
            <button onClick={() => appendToTextBox(' (')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4"> ( </button>
            <button onClick={() => appendToTextBox(' )')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r"> ) </button>

          </div>
          <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ExpressionEval;