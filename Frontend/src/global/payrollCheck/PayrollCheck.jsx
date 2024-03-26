import React, { useState, useEffect } from 'react';
import { getAllTemplateForExpressionCreation } from '../api/TemplateApiServices';
import { payrollCheck } from '../api/PayrollCheck';

const PayrollCheck = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  useEffect(() => {
    // Fetch template names from backend
    getAllTemplates()
      .then(response => {
        setTemplates(response.data);
      })
      .catch(error => {
        console.error('Error fetching templates:', error);
      });
  }, []);

  const handleTemplateChange = (event) => {
    setSelectedTemplate(event.target.value);
  };
  
  const handleEvaluateClick = () => {
    // Perform evaluation logic here
    payrollCheck();
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200 bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <form className="flex flex-col items-center p-10 bg-white rounded-lg">
        <select
          value={selectedTemplate}
          onChange={handleTemplateChange}
          className="p-3 border border-gray-300 rounded-md mb-6 text-lg"
        >
          <option value="">Select a template...</option>
          {templates.map(template => (
            <option key={template.id} value={template.template_name}>{template.template_name}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleEvaluateClick}
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none text-lg"
        >
          Evaluate
        </button>
      </form>
    </div>
  );
};

export default PayrollCheck;
