import React, { useState } from 'react';
import Logo from '../../Assets/avl-logo.png';
import { Link } from 'react-router-dom';

function WebNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <nav className="bg-gray-50 h-[80px] shadow-lg fixed top-0 z-10 w-full">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center">
            <img src={Logo} className="h-12 mr-3" alt=" Logo" />
            <span className="font-semibold text-black text-xl">
              John's Medicals
            </span>
          </a>
          <button
            onClick={toggleMobileMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`w-full md:block md:w-auto ${
              mobileMenuOpen ? 'block' : 'hidden'
            }`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0">
              <li>
                <Link
                  to="/"
                  onClick={toggleMobileMenu}
                  className="block py-2 pl-3 pr-4 text-black rounded hover-bg-gray-100 md-hover-bg-transparent md-border-0 md-hover-text-green-900 md-p-0 dark-text-black md-dark-hover-text-green-900 dark-hover-bg-gray-700 dark-hover-text-white md-dark-hover-bg-transparent"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/Listpatients"
                  onClick={toggleMobileMenu}
                  className="block py-2 pl-3 pr-4 text-black rounded hover-bg-gray-100 md-hover-bg-transparent md-border-0 md-hover-text-green-900 md-p-0 dark-text-black md-dark-hover-text-green-900 dark-hover-bg-gray-700 dark-hover-text-white md-dark-hover-bg-transparent"
                >
                  Patients
                </Link>
              </li>
              <li>
                <Link
                  to="/Listprescriptions"
                  onClick={toggleMobileMenu}
                  className="block py-2 pl-3 pr-4 text-black rounded hover-bg-gray-100 md-hover-bg-transparent md-border-0 md-hover-text-green-900 md-p-0 dark-text-black md-dark-hover-text-green-900 dark-hover-bg-gray-700 dark-hover-text-white md-dark-hover-bg-transparent"
                >
                  Prescriptions
                </Link>
              </li>
              <li>
                <Link
                  to="/ListBillPayments"
                  onClick={toggleMobileMenu}
                  className="block py-2 pl-3 pr-4 text-black rounded hover-bg-gray-100 md-hover-bg-transparent md-border-0 md-hover-text-green-900 md-p-0 dark-text-black md-dark-hover-text-green-900 dark-hover-bg-gray-700 dark-hover-text-white md-dark-hover-bg-transparent"
                >
                  Bill Payments
                </Link>
              </li>
              <li>
                <Link
                  to="/RevenueReport"
                  onClick={toggleMobileMenu}
                  className="block py-2 pl-3 pr-4 text-black rounded hover-bg-gray-100 md-hover-bg-transparent md-border-0 md-hover-text-green-900 md-p-0 dark-text-black md-dark-hover-text-green-900 dark-hover-bg-gray-700 dark-hover-text-white md-dark-hover-bg-transparent"
                >
                  Reports
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default WebNavigation;
