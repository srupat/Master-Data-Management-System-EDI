import React, { useState } from 'react';

const AnalyticsService = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const iframeStyle = {
    background: '#F1F5F4',
    border: 'none',
    borderRadius: '2px',
    boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
    width: '90vw',
    height: '65vh',
  };

  const iframeSources = [
    'https://charts.mongodb.com/charts-project-0-ftwth/embed/dashboards?id=10cdca23-8880-4f97-ac61-0c6b341b710a&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed',
    'https://charts.mongodb.com/charts-project-0-ftwth/embed/dashboards?id=450bb5fa-14b8-4c2d-8b1a-fb5d355a9ec2&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed',
  ];

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === iframeSources.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? iframeSources.length - 1 : prevSlide - 1));
  };

  const handleTemplateChange = (event) => {
    const selectedIndex = event.target.value;
    setCurrentSlide(parseInt(selectedIndex, 10));
  };

  return (
    <div className='text-center'>
      <h1 className="text-3xl font-bold mb-6 mt-5">Visual Analytics</h1>
      <div className="mb-5">
        <select
          className="px-4 py-2 border rounded-lg bg-white shadow-md focus:outline-none text-center"
          onChange={handleTemplateChange}
          value={currentSlide}
        >
          <option value={0}>Induction Motor Template</option>
          <option value={1}>Employee Template</option>
        </select>
      </div>
      <div style={{ position: 'relative', width: '90vw', height: '65vh', margin: '0 auto', overflow: 'hidden', marginTop: '2vh' }}>
        {iframeSources.map((src, index) => (
          <iframe
            key={index}
            style={{
              ...iframeStyle,
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: 'transform ease-out 0.45s',
              position: 'absolute',
              left: `${index * 100}%`,
            }}
            src={src}
          ></iframe>
        ))}
      </div>
      <div className="mt-5 flex justify-center space-x-2">
        <button className="px-2 py-1 bg-gray-500 text-white rounded-lg" onClick={prevSlide}>
          Previous
        </button>
        {iframeSources.map((_, index) => (
          <button
            key={index}
            className={`px-2 py-1 ${index === currentSlide ? 'bg-gray-500 text-white' : 'bg-gray-300 text-black'} rounded-lg`}
            onClick={() => goToSlide(index)}
          >
            {index + 1}
          </button>
        ))}
        <button className="px-2 py-1 bg-gray-500 text-white rounded-lg" onClick={nextSlide}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AnalyticsService;
