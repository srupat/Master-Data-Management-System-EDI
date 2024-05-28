import React from 'react';
import { createTemplateApi } from '../api/TemplateApiServices';

class CreateTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            templateName: '',
            attributes: [{ attribute_name: '', attribute_type: '' }],
        };
    }

    handleTemplateNameChange = (e) => {
        this.setState({ templateName: e.target.value });
    };

    handleAttributeChange = (index, field, e) => {
        const newAttributes = this.state.attributes.map((attribute, i) => {
            if (i === index) {
                return { ...attribute, [field]: e.target.value };
            }
            return attribute;
        });
        this.setState({ attributes: newAttributes });
    };

    addAttributeField = () => {
        this.setState(prevState => ({
            attributes: [...prevState.attributes, { attribute_name: '', attribute_type: '' }]
        }));
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { templateName, attributes } = this.state;
        const newTemplate = {
            template_name: templateName,
            attributes: attributes.map(attr => ({
                attribute_name: attr.attribute_name,
                attribute_type: attr.attribute_type
            }))
        };
        // Call the API to create the template
        createTemplateApi(newTemplate)
            .then(response => {
                console.log('Template created successfully:', response.data);
                // Optionally, update the state or UI here
            })
            .catch(error => console.error('Error creating template:', error));
        // Reset form
        this.setState({ templateName: '', attributes: [{ attribute_name: '', attribute_type: '' }] });
    };

    render() {
        return (
            <div className="p-4 bg-white rounded-lg shadow-lg m-4 flex-1">
                <h2 className="text-lg font-bold mb-4">Create Template</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="templateName">
                            Template Name
                        </label>
                        <input
                            type="text"
                            id="templateName"
                            value={this.state.templateName}
                            onChange={this.handleTemplateNameChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    {this.state.attributes.map((attribute, index) => (
                        <div key={index} className="mb-4 flex space-x-4">
                            <div className="flex-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`attributeName${index}`}>
                                    Attribute {index + 1} Name
                                </label>
                                <input
                                    type="text"
                                    id={`attributeName${index}`}
                                    value={attribute.attribute_name}
                                    onChange={(e) => this.handleAttributeChange(index, 'attribute_name', e)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`attributeType${index}`}>
                                    Attribute {index + 1} Type
                                </label>
                                <input
                                    type="text"
                                    id={`attributeType${index}`}
                                    value={attribute.attribute_type}
                                    onChange={(e) => this.handleAttributeChange(index, 'attribute_type', e)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                        </div>
                    ))}
                    <div className="mb-4">
                        <button
                            type="button"
                            onClick={this.addAttributeField}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Add Attribute
                        </button>
                    </div>
                    <div className="mb-4">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Create Template
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateTemplate;
