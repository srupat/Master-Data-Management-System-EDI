import React, { useState, useEffect } from 'react';
import { getAllTemplates } from '../api/TemplateApiServices';
import { payrollCheck } from '../api/PayrollCheck';

const MotorAnalysisComponent = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedExpression, setSelectedExpression] = useState('');
  const [expressionList, setExpressionList] = useState([]);
  const [result, setResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
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

    const selectedTemplate = templates.find(template => template.template_name === templateName);

    if (selectedTemplate) {
      setExpressionList(selectedTemplate.expressionList);
    } else {
      setExpressionList([]);
    }

    setSelectedExpression('');
  };

  const handleExpressionChange = (event) => {
    setSelectedExpression(event.target.value);
  };

  const handleEvaluateClick = () => {
    payrollCheck(selectedTemplate, selectedExpression)
      .then(response => {
        const resultArray = response.data.map(item => item.split('|'));
        setResult(resultArray);
        setShowResult(true);
      })
      .catch(error => {
        console.error('Error evaluating expression:', error);
      });
  };

  const handleCloseResult = () => {
    setShowResult(false);
  };

  const handleScroll = () => {
    setIsScrolling(true);
    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(() => {
      setIsScrolling(false);
    }, 100);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200 bg-opacity-50 backdrop-filter backdrop-blur-lg" onScroll={handleScroll}>
      <div className="flex flex-col items-center p-10 bg-white rounded-lg shadow-lg w-1/2">
        <h2 className="text-3xl font-bold mb-6">Motor Analysis</h2>
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
          disabled={!selectedExpression}
        >
          Evaluate
        </button>

        {showResult && (
          <div className={`overflow-auto mt-8 ${isScrolling ? 'scrolling' : ''}`} style={{ maxHeight: '300px', overflowY: 'auto' }}>
            <table className="table-auto border-collapse border border-gray-400 w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Expression Name</th>
                  <th className="px-4 py-2">Timestamp</th>
                  <th className="px-4 py-2">Evaluation Result</th>
                </tr>
              </thead>
              <tbody>
                {result.map((itemArray, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                    <td className="px-4 py-2 border border-gray-400">{itemArray[0]}</td>
                    <td className="px-4 py-2 border border-gray-400">{itemArray[1]}</td>
                    <td className={`px-4 py-2 border border-gray-400 ${itemArray[2] === 'true' ? 'font-bold text-green-500' : 'text-red-500'}`}>{itemArray[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={handleCloseResult} className="block mx-auto mt-4 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none text-lg">Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MotorAnalysisComponent;
