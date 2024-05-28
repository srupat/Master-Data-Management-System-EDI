import React, { useState } from 'react';
import { deleteTemplateApi } from '../api/TemplateApiServices';

const DeleteTemplate = () => {
    const [templateName, setTemplateName] = useState('');
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setTemplateName(e.target.value);
    };

    const handleDelete = async () => {
        if (!templateName) {
            setMessage('Template name is required');
            return;
        }

        try {
            await deleteTemplateApi(templateName);
            // setMessage(Template "${templateName}" deleted successfully.);
            setTemplateName(''); // Clear the input after deletion
        } catch (error) {
            // setMessage(Error: ${error});
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-lg font-bold mb-4">Delete Template</h3>
            <div className="flex items-center">
                <input
                    type="text"
                    value={templateName}
                    onChange={handleInputChange}
                    placeholder="Enter template name"
                    className="border border-gray-300 px-4 py-2 rounded-lg mr-2 focus:outline-none focus:border-blue-500 flex-1"
                />
                <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded-lg focus:outline-none hover:bg-red-600">
                    Delete
                </button>
            </div>
            {message && <p className="text-red-500 mt-2">{message}</p>}
        </div>
    );
};

export default DeleteTemplate;