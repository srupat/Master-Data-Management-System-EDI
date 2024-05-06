import React from 'react';
import { getAllTemplates } from '../api/TemplateApiServices';

class Operations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            templates: []
        };
    }

    componentDidMount() {
        getAllTemplates()
            .then(response => {
                this.setState({ templates: response.data });
            })
            .catch(error => console.error('Error fetching templates:', error));
    }

    render() {
        return (
            <div className="flex">
                <div className="w-64 h-screen bg-gray-200 flex flex-col">
                    <div className="h-1/3 overflow-y-auto p-4">
                        <h2 className="text-lg font-bold mb-2">Templates</h2>
                        <hr className="border-t-2 border-gray-500 mb-4" />
                        {/* Render template items with checkboxes */}
                        {this.state.templates.map(template => (
                            <div
                                key={template.id}
                                className="flex items-center"
                            >
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    id={template.id}
                                    value={template.id}
                                    onChange={() => console.log(`Checkbox for template ${template.template_name} clicked`)}
                                />
                                <label
                                    htmlFor={template.id}
                                    className="bg-white rounded-lg shadow p-2 mb-2 cursor-pointer transition duration-300 ease-in-out transform hover:bg-gray-700 hover:text-white hover:font-bold hover:shadow-lg"
                                >
                                    {template.template_name}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="h-2/3 bg-gray-300 overflow-y-auto p-4">
                        <h2 className="text-lg font-bold mb-2">Methods</h2>
                        <hr className="border-t-2 border-gray-500 mb-4" />
                        {/* Render method items */}
                        <div className="bg-white rounded-lg shadow p-2 mb-2 cursor-pointer transition duration-300 ease-in-out transform hover:bg-gray-700 hover:text-white hover:font-bold hover:shadow-lg">
                            Create Template
                        </div>
                        <div className="bg-white rounded-lg shadow p-2 mb-2 cursor-pointer transition duration-300 ease-in-out transform hover:bg-gray-700 hover:text-white hover:font-bold hover:shadow-lg">
                            Read Templates
                        </div>
                        <div className="bg-white rounded-lg shadow p-2 mb-2 cursor-pointer transition duration-300 ease-in-out transform hover:bg-gray-700 hover:text-white hover:font-bold hover:shadow-lg">
                            Update Template
                        </div>
                        <div className="bg-white rounded-lg shadow p-2 mb-2 cursor-pointer transition duration-300 ease-in-out transform hover:bg-gray-700 hover:text-white hover:font-bold hover:shadow-lg">
                            Delete Template
                        </div>
                        <div className="bg-white rounded-lg shadow p-2 mb-2 cursor-pointer transition duration-300 ease-in-out transform hover:bg-gray-700 hover:text-white hover:font-bold hover:shadow-lg">
                            Search For Attribute
                        </div>
                        <div className="bg-white rounded-lg shadow p-2 mb-2 cursor-pointer transition duration-300 ease-in-out transform hover:bg-gray-700 hover:text-white hover:font-bold hover:shadow-lg">
                            Sort objects
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Operations;