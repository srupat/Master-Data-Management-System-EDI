// Import React and useState hook
import React, { useState } from 'react';

// Define SpreadsheetView component
const SpreadsheetView = ({ objects }) => {
    // State variables
    const [expandedObjects, setExpandedObjects] = useState({});
    const [sortedObjects, setSortedObjects] = useState(objects);
    const [selectedAttribute, setSelectedAttribute] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [rowCount, setRowCount] = useState(10); // Default number of rows

    // Function to toggle object expansion
    const toggleObject = (index) => {
        setExpandedObjects((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    // Function to handle attribute sort change
    const handleSortChange = (e) => {
        const attribute = e.target.value;
        setSelectedAttribute(attribute);
        sortObjects(attribute, sortOrder);
    };

    // Function to handle sort order change
    const handleOrderChange = (e) => {
        const order = e.target.value;
        setSortOrder(order);
        sortObjects(selectedAttribute, order);
    };

    // Function to handle row count change
    const handleRowCountChange = (e) => {
        const count = parseInt(e.target.value);
        setRowCount(count);
    };

    // Function to sort objects based on attribute and order
    const sortObjects = (attribute, order) => {
        const sorted = [...objects].sort((a, b) => {
            const attrA = a.attributes.find(attr => attr.name === attribute)?.val || '';
            const attrB = b.attributes.find(attr => attr.name === attribute)?.val || '';
            if (attrA < attrB) return order === 'asc' ? -1 : 1;
            if (attrA > attrB) return order === 'asc' ? 1 : -1;
            return 0;
        });
        setSortedObjects(sorted);
    };

    // Unique attribute names
    const attributeNames = Array.from(new Set(objects.flatMap(obj => obj.attributes.map(attr => attr.name))));

    // Render component
    return (
        <div className="p-4">
            <div className="flex mb-4">
                {/* Attribute Sort Dropdown */}
                <div className="mr-4">
                    <label htmlFor="attribute-sort" className="block text-lg font-medium text-gray-700 mb-2">
                        Sort by Attribute:
                    </label>
                    <select
                        id="attribute-sort"
                        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white py-2 px-3 text-gray-700"
                        value={selectedAttribute}
                        onChange={handleSortChange}
                    >
                        <option value="" className="text-gray-500">Select an attribute</option>
                        {attributeNames.map((attrName, index) => (
                            <option key={index} value={attrName} className="text-gray-700">
                                {attrName}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Sort Order Dropdown */}
                <div className="mr-4">
                    <label htmlFor="order-sort" className="block text-lg font-medium text-gray-700 mb-2">
                        Sort Order:
                    </label>
                    <select
                        id="order-sort"
                        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white py-2 px-3 text-gray-700"
                        value={sortOrder}
                        onChange={handleOrderChange}
                    >
                        <option value="asc" className="text-gray-700">Ascending</option>
                        <option value="desc" className="text-gray-700">Descending</option>
                    </select>
                </div>
                {/* Row Count Dropdown */}
                <div>
                    <label htmlFor="row-count" className="block text-lg font-medium text-gray-700 mb-2">
                        Rows to Display:
                    </label>
                    <select
                        id="row-count"
                        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white py-2 px-3 text-gray-700"
                        value={rowCount}
                        onChange={handleRowCountChange}
                    >
                        <option value="all" className="text-gray-700">All</option>
                        {[...Array(5).keys()].map((index) => (
                            <option key={index} value={(index + 1) * 10} className="text-gray-700">
                                {(index + 1) * 10}
                            </option>
                        ))}
                    </select>
                </div>

            </div>

            {/* // Spreadsheet Table */}
            {sortedObjects.length > 0 ? (
                <table className="min-w-full bg-gray-100 border border-gray-400">
                    <thead className="bg-gray-300">
                        <tr>
                            <th className="py-2 border border-gray-400 text-center">Object Name</th>
                            <th className="py-2 border border-gray-400 text-center">Attribute Name</th>
                            <th className="py-2 border border-gray-400 text-center">Attribute Value</th>
                            <th className="py-2 border border-gray-400 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedObjects.slice(0, rowCount === 'all' ? sortedObjects.length : rowCount).map((obj, index) => (
                            <React.Fragment key={index}>
                                {/* Row for Object Name */}
                                <tr className="text-center bg-white">
                                    <td className="py-2 border border-gray-400 text-center">{obj.obj_name}</td>
                                    <td className="py-2 border border-gray-400 text-center" colSpan="2"></td>
                                    <td className="py-2 border border-gray-400 text-center">
                                        <button
                                            className="bg-blue-500 text-white px-2 py-1 rounded"
                                            onClick={() => toggleObject(index)}
                                        >
                                            {expandedObjects[index] ? 'Minimize' : 'Expand'}
                                        </button>
                                    </td>
                                </tr>
                                {/* Rows for Expanded Attributes */}
                                {expandedObjects[index] && obj.attributes.map((attr, attrIndex) => (
                                    <tr key={attrIndex} className="text-center bg-white">
                                        <td className="py-2 border border-gray-400 text-center"></td>
                                        <td className="py-2 border border-gray-400 text-center">{attr.name}</td>
                                        <td className="py-2 border border-gray-400 text-center">{attr.val}</td>
                                        <td className="py-2 border border-gray-400 text-center"></td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>No objects available</div>
            )}

        </div>
    );
};

export default SpreadsheetView;