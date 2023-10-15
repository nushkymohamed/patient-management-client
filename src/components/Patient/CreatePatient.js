import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const CreatePatient = () => {
  const [patient, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    birthday: '',
    contactNo: '',
    photo: null,
    birthday: '',
    nic: '',
    notes: '',
    date: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('birthday', formData.birthday);
    data.append('contactNo', formData.contactNo);
    data.append('photo', formData.photo);
    data.append('nic', formData.nic);
    data.append('notes', formData.notes);
    data.append('date', formData.date);

    axios.post('http://localhost:8000/patients', data).then((response) => {
      toast.success('New Patient Created', { autoClose: 3000 });
      navigate('/Listpatients');
      setPatients([...patient, response.data.post]);
      setFormData({
        name: '',
        birthday: '',
        contactNo: '',
        photo: null,
        nic: '',
        notes: '',
        date: '',
      });
    });
  };
  return (
    <div className="md:px-[20%] px-[10px] pt-[20px]">
      <form
        onSubmit={handleSubmit}
        className="mb-4  md:shadow-lg md:px-[20px] px-[5px] md:py-[15px] py-[7px]"
      >
        <h1 className="md:text-xl text-blue-950  font-bold mb-4">
          Register Patient
        </h1>
        <div className="mb-4 md:text-base text-sm">
          <label htmlFor="title" className="block font-medium text-gray-700 ">
            Patient Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-input mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-md h-[40px] text-blue-950 px-[5px]"
            required
          />
        </div>
        <div className="mb-4 md:text-base text-sm">
          <label
            htmlFor="description"
            className="block font-medium text-gray-700"
          >
            Patient Birthday
          </label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={formData.birthday}
            onChange={handleInputChange}
            className="form-input mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-md  text-blue-950 px-[5px] h-[40px]"
            rows="4"
            required
          />
        </div>
        <div className="mb-4 md:text-base text-sm">
          <label
            htmlFor="description"
            className="block font-medium text-gray-700"
          >
            Patient Contact No
          </label>
          <input
            id="contactNo"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleInputChange}
            className="form-textarea mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-md  text-blue-950 px-[5px] h-[40px]"
            rows="4"
            required
          />
        </div>
        <div className="mb-4 md:text-base text-sm">
          <label htmlFor="image" className="block font-medium text-gray-700">
            Patient Photo
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handleImageChange}
            className="form-input mt-1 block w-full rounded-md border-gray-300 pt-[5px]"
            accept="image/*"
            required
          />
        </div>
        <div className="mb-4 md:text-base text-sm">
          <label
            htmlFor="description"
            className="block font-medium text-gray-700"
          >
            Patient NIC
          </label>
          <input
            id="nic"
            name="nic"
            value={formData.nic}
            onChange={handleInputChange}
            className="form-textarea mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-md  text-blue-950 px-[5px] h-[40px]"
            rows="4"
            required
          />
        </div>
        <div className="mb-4 md:text-base text-sm">
          <label
            htmlFor="description"
            className="block font-medium text-gray-700"
          >
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            className="form-textarea mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-md  text-blue-950 px-[5px] h-[60px]"
            rows="4"
            required
          />
        </div>
        <div className="mb-4 md:text-base text-sm">
          <label
            htmlFor="description"
            className="block font-medium text-gray-700"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="form-textarea mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-md  text-blue-950 px-[5px] h-[40px]"
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Create Patient
          </button>
        </div>
      </form>
    </div>
  );
};
