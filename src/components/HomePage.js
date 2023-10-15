import React from 'react';
import { Link } from 'react-router-dom';
import Person2Icon from '@mui/icons-material/Person2';
import MedicationIcon from '@mui/icons-material/Medication';
import PaymentIcon from '@mui/icons-material/Payment';
import AssessmentIcon from '@mui/icons-material/Assessment';
function HomePage() {
  return (
    <div className=" min-h-screen md:flex md:flex-col flex-row  md:items-center md:justify-center md:px-[0%] px-[20%] ">
      <div className='pt-[30px]'>
      <h1 className="md:text-3xl font-bold mb-8 text-gray-700">
        Patient Management System
      </h1>
      </div>
     
      <div className="md:flex gap-[20px] pt-[20px]">
        <Link to="/Listpatients">
          <div className="text-lg text-white h-[125px] w-[250px] text-center bg-yellow-400 border rounded-lg shadow-md hover:bg-yellow-300">
            <div className="pt-[25px]"> Manage Patients</div>
            <div className='pt-[10px]'>
            <Person2Icon fontSize='large'/>
            </div>
          
          </div>
        </Link>
        <Link to="/Listprescriptions">
          <div className="text-lg  text-white h-[125px] w-[250px] text-center bg-red-700 border rounded-lg shadow-md hover:bg-red-600">
            <div className="pt-[25px]"> Prescriptions</div>
            <div className='pt-[10px]'>
            <MedicationIcon fontSize='large'/>
            </div>
          </div>
        </Link>
        <Link to="/ListBillPayments">
          <div className="text-lg  text-white h-[125px] w-[250px] text-center bg-green-600 border rounded-lg shadow-md hover:bg-green-500">
            <div className="pt-[25px]"> Bill Payments </div>
            <div className='pt-[10px]'>
            <PaymentIcon fontSize='large'/>
            </div>
          </div>
        </Link>
        <Link to="/RevenueReport">
          <div className="text-lg  text-white h-[125px] w-[250px] text-center bg-blue-400 border rounded-lg shadow-md hover:bg-blue-300">
            <div className="pt-[25px]"> Revenue Reports </div>
            <div className='pt-[10px]'>
            <AssessmentIcon fontSize='large'/>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
