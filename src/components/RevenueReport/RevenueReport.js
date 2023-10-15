import React, { useState } from 'react';
import axios from 'axios';
import WebNavigation from '../Common/Navigation';
const RevenueReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const generateReport = async () => {
    try {
      // Send a GET request to the API to generate the revenue report
      const response = await axios.get(
        `http://localhost:8000/reports/revenue-report?startDate=${startDate}&endDate=${endDate}`,
        {
          responseType: 'blob',
        }
      );

      // Create a URL for the generated PDF
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(blob);

      // Open the PDF in a new tab
      window.open(pdfUrl);
    } catch (error) {
      console.error('Error generating revenue report:', error);
    }
  };

  return (
    <div>
      <WebNavigation />
      <div className="md:pt-[95px] pt-[95px] md:px-[20px] px-[10px]">
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Generate Revenue Report</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Start Date:
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              End Date:
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <button
            onClick={generateReport}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default RevenueReport;
