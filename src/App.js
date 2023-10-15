import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ListPatients from './components/Patient/ListPatients';
import { CreatePatient } from './components/Patient/CreatePatient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EditPatient } from './components/Patient/EditPatient';
import ListPrescriptions from './components/Prescription/ListPrescription';
import { CreatePrescription } from './components/Prescription/CreatePrescription';
import ListBillPayments from './components/BillPayments/ListBillPayments';
import { CreatePayment } from './components/BillPayments/CreatePayment';
import RevenueReport from './components/RevenueReport/RevenueReport';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Listpatients" element={<ListPatients />} />
        <Route path="/create-patient" element={<CreatePatient />} />
        <Route path="/patients/edit/:patientId" element={<EditPatient />} />
        <Route path="/Listprescriptions" element={<ListPrescriptions />} />
        <Route path="/create-prescription" element={<CreatePrescription />} />
        <Route path="/ListBillPayments" element={<ListBillPayments />} />
        <Route path="/create-payment" element={<CreatePayment />} />
        <Route path="/RevenueReport" element={<RevenueReport />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
