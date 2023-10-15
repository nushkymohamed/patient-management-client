import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';
import { Button, InputAdornment, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import WebNavigation from '../Common/Navigation';
function ListPatients() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/patients')
      .then((response) => {
        setPatients(response.data);
        setFilteredPatients(response.data);
      })
      .catch((error) => {
        console.error('Error fetching patients:', error);
      });
  }, []);

  const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    {
      field: 'photo',
      headerName: 'Image',
      width: 200,
      renderCell: (params) => (
        <img
          src={`http://localhost:8000/${params.row.photo}`}
          alt={`Image for patient ${params.row.name}`}
          style={{ width: '70%', height: 'auto' }}
        />
      ),
    },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'birthday', headerName: 'Birthday', width: 120 },
    { field: 'contactNo', headerName: 'Contact No', width: 150 },
    { field: 'nic', headerName: 'NIC', width: 150 },
    { field: 'notes', headerName: 'Notes', width: 150 },
    { field: 'date', headerName: 'Date', width: 150 },

    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div className="flex gap-5">
          <button onClick={() => handleDelete(params.row._id)} className="">
            <RiDeleteBinLine size={25} color="red" />
          </button>
          <button onClick={() => handleEdit(params.row._id)} className="">
            <RiEditLine size={25} color="green" />
          </button>
        </div>
      ),
    },
  ];
  const handleCreate = () => {
    navigate('/create-patient');
  };

  const handleDelete = (patientId) => {
    console.log('Deleting patient with ID:', patientId);
    axios
      .delete(`http://localhost:8000/patients/${patientId}`)
      .then(() => {
        setPatients(patients.filter((patient) => patient.id !== patientId));
        toast.success('patient deleted successfully', { autoClose: 3000 });
        window.location.reload(false);
      })
      .catch((error) => {
        console.error('Error deleting patient:', error);
        toast.error('Error deleting patient. Please try again.', {
          autoClose: 3000,
        });
      });
  };

  const handleEdit = (patientId) => {
    console.log('Editing patient with ID:', patientId);
    navigate(`/patients/edit/${patientId}`);
  };

  const filterPatients = (text) => {
    const lowerCaseText = text.toLowerCase();
    const filtered = patients.filter((patient) => {
      return (
        patient.name.toLowerCase().includes(lowerCaseText) ||
        patient.birthday.toLowerCase().includes(lowerCaseText) ||
        patient.contactNo.toLowerCase().includes(lowerCaseText) ||
        patient.nic.toLowerCase().includes(lowerCaseText) ||
        patient.notes.toLowerCase().includes(lowerCaseText) ||
        patient.date.toLowerCase().includes(lowerCaseText)
      );
    });
    setFilteredPatients(filtered);
  };

  const handleSearch = () => {
    const filtered = patients.filter((patient) => {
      const lowerCaseSearchText = searchText.toLowerCase();
      return (
        patient.name.toLowerCase().includes(lowerCaseSearchText) ||
        patient.birthday.toLowerCase().includes(lowerCaseSearchText) ||
        patient.contactNo.toLowerCase().includes(lowerCaseSearchText) ||
        patient.nic.toLowerCase().includes(lowerCaseSearchText) ||
        patient.notes.toLowerCase().includes(lowerCaseSearchText) ||
        patient.date.toLowerCase().includes(lowerCaseSearchText)
      );
    });
    setFilteredPatients(filtered);
  };
  const handleSearchTextChange = (event) => {
    const text = event.target.value;
    setSearchText(text);
    filterPatients(text);
  };

  const getRowId = (row) => row._id;
  return (
    <div className=" ">
      <WebNavigation />
      <div className="md:pt-[95px] pt-[95px] md:px-[20px] px-[10px]">
        <div className="md:grid grid-cols-3 gap-[20px]  ">
          <div className="col-span-1">
            <span className="md:text-2xl text-base"> Patients List</span>
          </div>
          <div className="col-span-1 pt-[10px] md:pt-[0px] ">
            <TextField
              className="w-full md:text-base text-sm"
              placeholder="Search Patients..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button onClick={handleSearch} variant="contained">
                      Search
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="col-span-1 md:flex flex-row-reverse pt-[10px] md:pt-[0px]">
            <Button
              variant="outlined"
              className="w-[200px] text-sm"
              onClick={() => handleCreate()}
              endIcon={<AddCircleOutlineIcon />}
            >
              Register Patient
            </Button>
          </div>
        </div>

        {/* <div className="col-span-1"></div> */}
        <div className="  pt-[20px]">
          <Box sx={{ width: '100%' }}>
            <DataGrid
              rows={filteredPatients}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
              getRowId={getRowId}
            />
          </Box>
        </div>
      </div>
    </div>
  );
}

export default ListPatients;
