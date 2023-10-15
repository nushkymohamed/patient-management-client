import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-8 text-blue-900">
        Patient Management System
      </h1>
      <div className="flex gap-8">
        <Link
          to="/Listpatients"
          className="p-4 bg-white border rounded-lg shadow-md hover:bg-blue-100"
        >
          <div className="text-xl font-semibold text-blue-900">
            Manage Patients
          </div>
        </Link>
        <Link
          to="/Listprescriptions"
          className="p-4 bg-white border rounded-lg shadow-md hover:bg-blue-100"
        >
          <div className="text-xl font-semibold text-blue-900">
            Prescriptions
          </div>
        </Link>
        <Link
          to="/ListBillPayments"
          className="p-4 bg-white border rounded-lg shadow-md hover:bg-blue-100"
        >
          <div className="text-xl font-semibold text-blue-900">
            Bill Payments
          </div>
        </Link>
        <Link
          to="/RevenueReport"
          className="p-4 bg-white border rounded-lg shadow-md hover:bg-blue-100"
        >
          <div className="text-xl font-semibold text-blue-900">
            Revenue Reports
          </div>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
