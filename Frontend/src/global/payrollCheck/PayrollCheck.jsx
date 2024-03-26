import React, { useState, useEffect } from 'react';
import { getAllTemplates } from '../api/TemplateApiServices';
import { payrollCheck } from '../api/PayrollCheck';
import { FaCheck, FaTimes } from 'react-icons/fa'; // Import FontAwesome icons
import './TickMarkAnimation.css';

const PayrollCheck = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedExpression, setSelectedExpression] = useState('');
  const [expressionList, setExpressionList] = useState([]);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

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
    const templateName = event.target.value;
    setSelectedTemplate(templateName);
    
    // Find the selected template
    const selectedTemplate = templates.find(template => template.template_name === templateName);
    
    // Extract expression list from the selected template
    if (selectedTemplate) {
      setExpressionList(selectedTemplate.expressionList);
    } else {
      setExpressionList([]);
    }
    
    setSelectedExpression(''); // Reset selected expression when template changes
  };

  const handleExpressionChange = (event) => {
    setSelectedExpression(event.target.value);
  };

  const handleEvaluateClick = () => {
    // Perform evaluation logic here
    payrollCheck(selectedTemplate, selectedExpression)
    .then(
      (response) => {
        setResult(response.data[0]); // Store the result
        setShowResult(true); // Show the result
        setTimeout(() => {
          setShowResult(false); // Hide the result after a delay
        }, 1000);
      }
    )
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

        {/* Render expression dropdown only if a template is selected */}
        {selectedTemplate && (
          <select
            value={selectedExpression}
            onChange={handleExpressionChange}
            className="p-3 border border-gray-300 rounded-md mb-6 text-lg"
          >
            <option value="">Select an expression...</option>
            {expressionList.map((expression, index) => (
              <option key={index} value={expression.name}>{expression.name}</option>
            ))}
          </select>
        )}

        <button
          type="button"
          onClick={handleEvaluateClick}
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none text-lg"
          disabled={!selectedExpression} // Disable button if no expression is selected
        >
          Evaluate
        </button>

        {/* Conditionally render the result */}
        {showResult && (
          <div className="result">
            {result === 'true' ? <FaCheck className="tick-icon" /> : <FaTimes className="cross-icon" />}
          </div>
        )}
      </form>
    </div>
  );
};

export default PayrollCheck;
