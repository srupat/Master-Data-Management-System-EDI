import React, { useState } from 'react';
import { updateTemplateNameApi, updateAttributeForTemplateApi } from '../api/TemplateApiServices';

const UpdateTemplate = ({ templates }) => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [newTemplateName, setNewTemplateName] = useState('');
    const [oldAttributeName, setOldAttributeName] = useState('');
    const [newAttributeName, setNewAttributeName] = useState('');
    const [newAttributeType, setNewAttributeType] = useState('');

    const handleTemplateSelect = (template) => {
        setSelectedTemplate(template);
        setNewTemplateName(template.template_name);
    };

    const handleTemplateNameChange = (e) => {
        setNewTemplateName(e.target.value);
    };

    const handleAttributeChange = (e, field) => {
        if (field === 'oldName') {
            setOldAttributeName(e.target.value);
        } else if (field === 'newName') {
            setNewAttributeName(e.target.value);
        } else if (field === 'type') {
            setNewAttributeType(e.target.value);
        }
    };

    const updateTemplateName = () => {
        if (!selectedTemplate) return;
        updateTemplateNameApi(selectedTemplate.template_name, newTemplateName)
            .then(response => console.log('Template name updated successfully:', response.data))
            .catch(error => console.error('Error updating template name:', error));
    };

    const updateAttributeForTemplate = () => {
        if (!selectedTemplate) return;
        updateAttributeForTemplateApi(selectedTemplate.template_name, oldAttributeName, newAttributeName, newAttributeType)
            .then(response => console.log('Attribute updated successfully:', response.data))
            .catch(error => console.error('Error updating attribute:', error));
    };

    return (
        <div className="flex p-4">
            {/* Left Flexbox: Display Selected Template */}
            <div className="w-1/3 p-4 bg-gray-100 overflow-y-auto">
                <h3 className="text-lg font-bold mb-4">Select Template to Update</h3>
                {templates.map((template) => (
                    <div
                        key={template.id}
                        className={`p-2 mb-2 cursor-pointer transition duration-300 ease-in-out transform ${selectedTemplate && selectedTemplate.id === template.id ? 'bg-gray-700 text-white' : 'bg-white hover:bg-gray-700 hover:text-white'}`}
                        onClick={() => handleTemplateSelect(template)}
                    >
                        {template.template_name}
                    </div>
                ))}
                {selectedTemplate && (
                    <div className="mt-4 p-4 bg-white rounded shadow">
                        <h4 className="text-md font-bold mb-2">Selected Template:</h4>
                        <pre>{JSON.stringify(selectedTemplate, null, 2)}</pre>
                    </div>
                )}
            </div>
            {/* Right Flexboxes */}
            <div className="w-2/3 flex flex-col p-4 space-y-4">
                {/* Top Flexbox: Update Template Name */}
                <div className="flex-1 bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-bold mb-4">Update Template Name</h3>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Old Template Name</label>
                        <input
                            type="text"
                            value={selectedTemplate ? selectedTemplate.template_name : ''}
                            readOnly
                            className="w-full p-2 border rounded bg-gray-200 cursor-not-allowed"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">New Template Name</label>
                        <input
                            type="text"
                            value={newTemplateName}
                            onChange={handleTemplateNameChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <button
                        onClick={updateTemplateName}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Update Template Name
                    </button>
                </div>
                {/* Bottom Flexbox: Update Attribute */}
                <div className="flex-1 bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-bold mb-4">Update Attribute</h3>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Template Name</label>
                        <input
                            type="text"
                            value={selectedTemplate ? selectedTemplate.template_name : ''}
                            readOnly
                            className="w-full p-2 border rounded bg-gray-200 cursor-not-allowed"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Old Attribute Name</label>
                        <input
                            type="text"
                            value={oldAttributeName}
                            onChange={(e) => handleAttributeChange(e, 'oldName')}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">New Attribute Name</label>
                        <input
                            type="text"
                            value={newAttributeName}
                            onChange={(e) => handleAttributeChange(e, 'newName')}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">New Attribute Type</label>
                        <input
                            type="text"
                            value={newAttributeType}
                            onChange={(e) => handleAttributeChange(e, 'type')}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <button
                        onClick={updateAttributeForTemplate}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Update Attribute
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateTemplate;