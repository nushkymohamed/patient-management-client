import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const EditPatient = () => {
  const { patientId } = useParams();
  const [patientData, setPatientData] = useState({
    name: '',
    birthday: '',
    contactNo: '',
    photo: null,
    nic: '',
    notes: '',
    date: '',
  });
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the post data from the external API when the component mounts
    axios
      .get(`http://localhost:8000/patients/${patientId}`)
      .then((response) => {
        console.log('patientData:', response);
        const { name, birthday, contactNo, photo, nic, notes, date } =
          response.data;

        setPatientData({ name, birthday, contactNo, photo, nic, notes, date });
      })
      .catch((error) => {
        console.error('Error fetching Patient data:', error);
      });
  }, [patientId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', formData.name);
    formData.append('birthday', formData.birthday);
    formData.append('contactNo', formData.contactNo);
    formData.append('photo', formData.photo);
    formData.append('nic', formData.nic);
    formData.append('notes', formData.notes);
    formData.append('date', formData.date);

    // Send the updated data back to the external API
    axios
      .put(`http://localhost:8000/patients/${patientId}`, patientData)
      .then((response) => {
        toast.success('Patient updated successfully:', response.data);
        navigate('/Listpatients');
      })
      .catch((error) => {
        console.error('Error updating patient', error);
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Edit Patient</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-600 font-bold mb-2">
            Patient Name
          </label>
          <input
            type="text"
            name="name"
            value={patientData.name}
            onChange={handleInputChange}
            className="border rounded-lg px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-bold mb-2">
            Patient Birthday
          </label>
          <input
            type="date"
            name="birthday"
            value={patientData.birthday}
            onChange={handleInputChange}
            className="border rounded-lg px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-bold mb-2">
            Patient Contact No
          </label>
          <input
            name="contactNo"
            value={patientData.contactNo}
            onChange={handleInputChange}
            className="border rounded-lg px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4 pt-[20px]">
          <label className="block text-gray-600 font-bold mb-2">Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-bold mb-2">
            Patient NIC
          </label>
          <input
            name="nic"
            value={patientData.nic}
            onChange={handleInputChange}
            className="border rounded-lg px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-bold mb-2">Notes</label>
          <input
            name="notes"
            value={patientData.notes}
            onChange={handleInputChange}
            className="border rounded-lg px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-bold mb-2">Date</label>
          <input
            name="date"
            value={patientData.date}
            onChange={handleInputChange}
            className="border rounded-lg px-3 py-2 w-full"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-950 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
