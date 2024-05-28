import React from 'react';

class ReadTemplates extends React.Component {
    render() {
        return (
            <div className="p-4 bg-white rounded-lg shadow-lg m-4 flex-1">
                <h2 className="text-lg font-bold mb-4">Read Templates</h2>
                {this.props.templates.map((template, index) => (
                    <div 
                        key={template.id} 
                        className={`mb-4 p-4 rounded-lg shadow-md ${index % 2 === 0 ? 'bg-blue-50' : 'bg-green-50'}`}
                    >
                        <h3 className="text-md font-bold">{template.template_name}</h3>
                        <p>ID: {template.id}</p>
                        <div className="ml-4 mt-2">
                            <p className="font-semibold">Attributes:</p>
                            <ul className="list-none">
                                {template.attributes.map((attr, attrIndex) => (
                                    <li key={attrIndex} className="flex items-center relative pl-4">
                                        <div className="absolute left-0 top-0 h-full border-l-2 border-gray-400"></div>
                                        <div className="w-1/4 font-medium">{attr.attribute_name}</div>
                                        <div className="w-3/4 text-gray-700">({attr.attribute_type})</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default ReadTemplates;