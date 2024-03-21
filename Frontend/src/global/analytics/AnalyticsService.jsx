import React, { useState } from 'react';

const AnalyticsService = () => {
  // State to manage selected template, method, and template methods mapping
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  
  // Template methods mapping
  const templateMethods = {
    'Template 1': ['Method 1', 'Method 2'],
    'Template 2': ['Method 3', 'Method 4']
    // Add more templates and their methods as needed
  };

  // Function to handle template selection
  const handleTemplateChange = (template) => {
    setSelectedTemplate(template);
    // Clear selected method when template changes
    setSelectedMethod('');
  };

  // Function to handle method selection
  const handleMethodChange = (method) => {
    setSelectedMethod(method);
  };

  return (
    <div className="analytics-service flex h-screen">
      <div className="sidebar w-1/4 bg-gray-200 p-4 flex flex-col">
        <div className="templates mb-4">
          <h2 className="text-lg font-semibold mb-2">Templates</h2>
          <ul>
            <li>
              <input
                type="radio"
                id="template1"
                value="Template 1"
                checked={selectedTemplate === 'Template 1'}
                onChange={() => handleTemplateChange('Template 1')}
                className="mr-2"
              />
              <label htmlFor="template1">Template 1</label>
            </li>
            <li>
              <input
                type="radio"
                id="template2"
                value="Template 2"
                checked={selectedTemplate === 'Template 2'}
                onChange={() => handleTemplateChange('Template 2')}
                className="mr-2"
              />
              <label htmlFor="template2">Template 2</label>
            </li>
          </ul>
        </div>
        <div className="methods">
          <h2 className="text-lg font-semibold mb-2">Methods</h2>
          <ul>
            {/* Render methods only if a template is selected */}
            {selectedTemplate &&
              templateMethods[selectedTemplate].map((method) => (
                <li key={method}>
                  <input
                    type="radio"
                    id={method}
                    value={method}
                    checked={selectedMethod === method}
                    onChange={() => handleMethodChange(method)}
                    className="mr-2"
                  />
                  <label htmlFor={method}>{method}</label>
                </li>
              ))}
          </ul>
        </div>
      </div>
      {/* Main content can be added here */}
    </div>
  );
};

export default AnalyticsService;
