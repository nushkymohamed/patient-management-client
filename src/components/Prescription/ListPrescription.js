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
function ListPrescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/prescriptions')
      .then((response) => {
        setPrescriptions(response.data);
        setFilteredPrescriptions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching prescriptions:', error);
      });
  }, []);

  const columns = [
    { field: '_id', headerName: 'ID', width: 250 },
    {
      field: 'patient.name',
      headerName: 'Patient Name',
      width: 200,
      renderCell: (params) => <div>{params.row.patient.name}</div>,
    },
    { field: 'date', headerName: 'Date', width: 250 },
    {
      field: 'files',
      headerName: 'Files',
      width: 200,
      renderCell: (params) => {
        let filesWithCommas = [];
        for (let index = 0; index < params.row.files.length; index++) {
          filesWithCommas.push(
            <a
              key={index}
              href={`http://localhost:8000/${params.row.files[index]}`}
              target="_blank"
              rel="noreferrer"
            >
              File {index + 1}
            </a>
          );
          if (index < params.row.files.length - 1) {
            filesWithCommas.push(', ');
          }
        }
        return <div>{filesWithCommas}</div>;
      },
    },

    {
      field: 'actions',
      headerName: 'Delete',
      width: 200,
      renderCell: (params) => (
        <div className="flex gap-5">
          <button onClick={() => handleDelete(params.row._id)} className="">
            <RiDeleteBinLine size={25} color="red" />
          </button>
          {/* <button onClick={() => handleEdit(params.row._id)} className="">
            <RiEditLine size={25} color="green" />
          </button> */}
        </div>
      ),
    },
  ];
  const handleCreate = () => {
    navigate('/create-prescription');
  };

  const handleDelete = (prescriptionId) => {
    console.log('Deleting prescription with ID:', prescriptionId);
    axios
      .delete(`http://localhost:8000/prescriptions/${prescriptionId}`)
      .then(() => {
        setPrescriptions(
          prescriptions.filter(
            (prescription) => prescription._id !== prescriptionId // Use _id instead of id
          )
        );
        toast.success('Prescription deleted successfully', { autoClose: 3000 });
        // Instead of window.location.reload(false), you can remove the deleted item from filteredPrescriptions
        setFilteredPrescriptions(
          filteredPrescriptions.filter((p) => p._id !== prescriptionId)
        );
      })
      .catch((error) => {
        console.error('Error deleting prescription:', error);
        toast.error('Error deleting prescription. Please try again.', {
          autoClose: 3000,
        });
      });
  };

  const handleEdit = (prescriptionId) => {
    console.log('Editing prescription with ID:', prescriptionId);
    navigate(`/prescriptions/edit/${prescriptionId}`);
  };

  const filterPrescriptions = (text) => {
    const lowerCaseText = text.toLowerCase();
    const filtered = prescriptions.filter((prescription) => {
      return (
        prescription.patient.name.toLowerCase().includes(lowerCaseText) || // Access patient's name as patient.name
        prescription.date.toLowerCase().includes(lowerCaseText)
      );
    });
    setFilteredPrescriptions(filtered);
  };

  const handleSearch = () => {
    filterPrescriptions(searchText);
  };
  const handleSearchTextChange = (event) => {
    const text = event.target.value;
    setSearchText(text);
  };

  const getRowId = (row) => row._id;
  return (
    <div className="">
      <WebNavigation />
      <div className="md:pt-[95px] pt-[95px] md:px-[20px] px-[10px]">
        <div className="md:grid grid-cols-3 gap-[20px] ">
          <div className="col-span-1">
            <span className="md:text-2xl text-base">Patients Prescription List</span>
          </div>
          <div className="col-span-1 pt-[10px] md:pt-[0px]">
            <TextField
              className="w-full"
              placeholder="Search Prescription..."
              value={searchText}
              onChange={handleSearchTextChange}
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
              className="md:w-[200px] text-sm"
              onClick={handleCreate}
              endIcon={<AddCircleOutlineIcon />}
            >
              Add Prescription
            </Button>
          </div>
        </div>

        <div className="pt-[20px]">
          <Box sx={{ width: '100%' }}>
            <DataGrid
              rows={filteredPrescriptions} // Use filteredPrescriptions
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

export default ListPrescriptions;
