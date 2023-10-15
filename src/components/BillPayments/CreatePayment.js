import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const CreatePayment = () => {
  const [formData, setFormData] = useState({
    patient: '', // Patient ID
    amount: '',
    date: '',
  });

  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8000/patients')
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        // Handle error
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8000/payments', formData).then((response) => {
      toast.success('New Payment Created', { autoClose: 3000 });
      navigate('/ListBillPayments');
      setFormData({
        patient: '',
        amount: '',
        date: '',
      });
    });
  };

  return (
    <div className="md:px-[20%] pt-[50px]">
      <form
        onSubmit={handleSubmit}
        className="mb-4  md:shadow-lg md:px-[20px] px-[5px] md:py-[15px] py-[7px]"
      >
        <h1 className="md:text-xl text-blue-950  font-bold mb-4">
          Add Payment
        </h1>
        <div className="mb-4 md:text-base text-sm">
          <label htmlFor="patient" className="block font-medium text-gray-700">
            Patient Name
          </label>
          <select
            id="patient"
            name="patient"
            value={formData.patient}
            onChange={handleInputChange}
            className="form-select mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-md h-[40px] text-blue-950"
            required
          >
            <option value="">Select a patient</option>
            {patients.map((patient) => (
              <option key={patient._id} value={patient._id}>
                {patient.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 md:text-base text-sm">
          <label htmlFor="amount" className="block font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="form-textarea mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-md  text-blue-950 px-[5px]"
            required
          />
        </div>
        <div className="mb-4 md:text-base text-sm">
          <label htmlFor="date" className="block font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="form-textarea mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-md  text-blue-950 px-[5px]"
            required
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-900 hover-bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Create Payment
          </button>
        </div>
      </form>
    </div>
  );
};
