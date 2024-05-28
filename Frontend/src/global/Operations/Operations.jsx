import React from 'react';
import { getAllTemplates } from '../api/TemplateApiServices';
import { getObjectsByTemplateName } from '../api/ObjectApiServices';
import CreateTemplate from './CreateTemplate';
import ReadTemplates from './ReadTemplates';
import UpdateTemplate from './UpdateTemplate';
import DeleteTemplate from './DeleteTemplate';
import SpreadsheetView from './SpreadsheetView';

class Operations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            templates: [],
            currentComponent: null,
            selectedTemplate: null,
            objects: [],
        };
    }

    componentDidMount() {
        getAllTemplates()
            .then(response => {
                this.setState({ templates: response.data }); // Ensure proper state update
            })
            .catch(error => console.error('Error fetching templates:', error));
    }

    switchComponent = (componentName) => {
        this.setState({ currentComponent: componentName });
    };

    handleCheckboxChange = (templateName) => {
        getObjectsByTemplateName(templateName)
            .then(data => {
                this.setState({ 
                    selectedTemplate: templateName, 
                    objects: data,
                    currentComponent: null  // Reset currentComponent to view the spreadsheet
                });
            })
            .catch(error => console.error('Error fetching objects:', error));
    };

    renderCurrentComponent = () => {
        const { currentComponent, templates, objects } = this.state;
        switch (currentComponent) {
            case 'CreateTemplate':
                return <CreateTemplate />;
            case 'ReadTemplates':
                return <ReadTemplates templates={templates} />;
            case 'UpdateTemplate':
                return <UpdateTemplate templates={templates} />;
            case 'DeleteTemplate':
                return <DeleteTemplate templates={templates} />;
            default:
                return (
                    <div>
                        <div>Select an action from the sidebar</div>
                        <SpreadsheetView objects={objects} /> {/* Pass objects to SpreadsheetView */}
                    </div>
                );
        }
    };

    render() {
        const { templates } = this.state;
        return (
            <div className="flex">
                <div className="w-64 h-screen bg-gray-200 flex flex-col">
                    <div className="h-1/3 overflow-y-auto p-4">
                        <h2 className="text-lg font-bold mb-2">Templates</h2>
                        <hr className="border-t-2 border-gray-500 mb-4" />
                        {templates.length > 0 ? (
                            templates.map(template => (
                                <div key={template.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                        id={template.id}
                                        value={template.id}
                                        onChange={() => this.handleCheckboxChange(template.template_name)}
                                    />
                                    <label
                                        htmlFor={template.id}
                                        className="bg-white rounded-lg shadow p-2 mb-2 cursor-pointer transition duration-300 ease-in-out transform hover:bg-gray-700 hover:text-white hover:font-bold hover:shadow-lg"
                                    >
                                        {template.template_name}
                                    </label>
                                </div>
                            ))
                        ) : (
                            <div>No templates available</div>
                        )}
                    </div>
                    <div className="h-2/3 bg-gray-300 overflow-y-auto p-4">
                        <h2 className="text-lg font-bold mb-2">Methods</h2>
                        <hr className="border-t-2 border-gray-500 mb-4" />
                        <div
                            className="bg-white rounded-lg shadow p-2 mb-2 cursor-pointer transition duration-300 ease-in-out transform hover:bg-gray-700 hover:text-white hover:font-bold hover:shadow-lg"
                            onClick={() => this.switchComponent('CreateTemplate')}
                        >
                            Create Template
                        </div>
                        <div
                            className="bg-white rounded-lg shadow p-2 mb-2 cursor-pointer transition duration-300 ease-in-out transform hover:bg-gray-700 hover:text-white hover:font-bold hover:shadow-lg"
                            onClick={() => this.switchComponent('ReadTemplates')}
                        >
                            Read Templates
                        </div>
                        <div
                            className="bg-white rounded-lg shadow p-2 mb-2 cursor-pointer transition duration-300 ease-in-out transform hover:bg-gray-700 hover:text-white hover:font-bold hover:shadow-lg"
                            onClick={() => this.switchComponent('UpdateTemplate')}
                        >
                            Update Template
                        </div>
                        <div
                            className="bg-white rounded-lg shadow p-2 mb-2 cursor-pointer transition duration-300 ease-in-out transform hover:bg-gray-700 hover:text-white hover:font-bold hover:shadow-lg"
                            onClick={() => this.switchComponent('DeleteTemplate')}
                        >
                            Delete Template
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    {this.renderCurrentComponent()}
                </div>
            </div>
        );
    }
}

export default Operations;