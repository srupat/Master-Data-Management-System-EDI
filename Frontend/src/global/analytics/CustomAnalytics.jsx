import React, { useEffect } from 'react';

const CustomAnalytics = ({ data }) => {
  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "400");
    svg.setAttribute("height", "200");

    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("transform", `translate(${margin.left},${margin.top})`);

    const x = i => i * (width / data.length);
    const y = d => height - (d * height) / 50;

    data.forEach((d, i) => {
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", x(i));
      rect.setAttribute("y", y(d));
      rect.setAttribute("width", width / data.length);
      rect.setAttribute("height", (d * height) / 50);
      rect.setAttribute("fill", "#6b7280");
      g.appendChild(rect);
    });

    svg.appendChild(g);
    document.getElementById('chart-container').appendChild(svg);
  }, [data]);

  return (
    <div id="chart-container" className="bg-gray-100 p-4 max-w-md mx-auto">
      {/* Chart will be rendered here */}
    </div>
  );
};

export default CustomAnalytics;
