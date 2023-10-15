import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import WebNavigation from '../Common/Navigation';

export const CreatePrescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [formData, setFormData] = useState({
    patient: '',
    date: '',
    files: [], // Change to an array to store multiple files
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

  const handleImageChange = (e) => {
    const files = e.target.files;
    setFormData({ ...formData, files: [...formData.files, ...files] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('patient', formData.patient);
    data.append('date', formData.date);

    // Append all the selected files to the FormData
    for (let i = 0; i < formData.files.length; i++) {
      data.append('files', formData.files[i]);
    }

    axios.post('http://localhost:8000/prescriptions', data).then((response) => {
      toast.success('New Prescription Created', { autoClose: 3000 });
      navigate('/Listprescriptions');
      setPrescriptions([...prescriptions, response.data.post]);
      setFormData({
        patient: '',
        date: '',
        files: [], // Reset to an empty array
      });
    });
  };

  return (
    <div className="">
      <WebNavigation />
      <div className="md:px-[20%] px-[10px] md:pt-[95px] pt-[95px]">
        <form
          onSubmit={handleSubmit}
          className="mb-4  md:shadow-lg md:px-[20px] px-[5px] md:py-[15px] py-[7px]"
        >
          <h1 className="md:text-xl text-blue-950  font-bold mb-4">
            Add Prescription
          </h1>
          <div className="mb-4 md:text-base text-sm">
            <label
              htmlFor="patient"
              className="block font-medium text-gray-700"
            >
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
          <div className="mb-4 md:text-base text-sm">
            <label htmlFor="files" className="block font-medium text-gray-700">
              Upload Prescription Files
            </label>
            <input
              type="file"
              id="files"
              name="files"
              onChange={handleImageChange}
              className="form-input mt-1 block w-full rounded-md border-gray-300 pt-[5px]"
              accept="files/*"
              multiple // Allow multiple files to be selected
              required
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Create Prescription
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
