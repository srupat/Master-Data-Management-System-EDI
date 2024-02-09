import React, { useState } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import Papa from 'papaparse';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';
import Banner from '../partials/Banner';

function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [templateJSON, setTemplateJSON] = useState(null);
  const [displayTemplateJSON, setDisplayTemplateJSON] = useState(false); // State to control displaying the template JSON

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const csvData = event.target.result;
      const templateName = file.name.replace(/\.[^/.]+$/, ""); // Extracting title from file name
      setTemplateJSON(convertCSVToTemplate(csvData, templateName));
    };
    reader.readAsText(file);
  };

  const convertCSVToTemplate = (csvData, templateName) => {
    const parsedData = Papa.parse(csvData, { header: true });
    const attributes = Object.keys(parsedData.data[0]).map(attribute => ({
      attribute_type: isNaN(parsedData.data[0][attribute]) ? "string" : Number.isInteger(parseFloat(parsedData.data[0][attribute])) ? "int" : "float",
      attribute_name: attribute
    }));

    return {
      template_name: templateName,
      attributes: attributes
    };
  };

  const handleCreateTemplateJSON = () => {
    // Call convertCSVToTemplate again in case templateJSON is null or not updated
    if (!templateJSON) {
      return;
    }
    setDisplayTemplateJSON(true); // Set to true to display the template JSON
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <WelcomeBanner />
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Button to create a template and parse it to the backend */}
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={handleCreateTemplateJSON}>
                  <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Create Template JSON</span>
                </button>

                {/* Button to parse individual json  */}
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={handleCreateTemplateJSON}>
                  <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Create Objects JSON</span>
                </button>

                {/* File input sushobhikaran */}
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".csv"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="fileInput" // Add an id for the label to reference
                  />
                  <label
                    htmlFor="fileInput"
                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4 fill-current opacity-50 shrink-0 inline-block mr-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="hidden xs:block">Upload CSV</span>
                  </label>
                </div>


              </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
              {/* You can render any other components here */}
            </div>
            {/* Display generated JSON */}
            {displayTemplateJSON && (
              <div className="mt-8 border rounded-md p-4 bg-gray-100">
                <h3 className="text-lg font-semibold mb-2">Generated Template JSON:</h3>
                <pre className="overflow-auto">{JSON.stringify(templateJSON, null, 2)}</pre>
              </div>
            )}
          </div>
        </main>
        <Banner />
      </div>
    </div>
  );
}

export default Dashboard;
