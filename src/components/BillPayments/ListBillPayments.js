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

function ListBillPayments() {
  const [billPayments, setBillPayments] = useState([]);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [filteredBillPayments, setFilteredBillPayments] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/payments')
      .then((response) => {
        setBillPayments(response.data);
        setFilteredBillPayments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching bill Payments:', error);
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
    { field: 'amount', headerName: 'Amount', width: 250 },

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
    navigate('/create-payment');
  };

  const handleDelete = (paymentId) => {
    console.log('Deleting Payment with ID:', paymentId);
    axios
      .delete(`http://localhost:8000/payments/${paymentId}`)
      .then(() => {
        setBillPayments(
          billPayments.filter(
            (payment) => payment._id !== paymentId // Use _id instead of id
          )
        );
        toast.success('payment deleted successfully', { autoClose: 3000 });
        // Instead of window.location.reload(false), you can remove the deleted item from filteredPrescriptions
        setFilteredBillPayments(
          filteredBillPayments.filter((p) => p._id !== paymentId)
        );
      })
      .catch((error) => {
        console.error('Error deleting payment:', error);
        toast.error('Error deleting payment. Please try again.', {
          autoClose: 3000,
        });
      });
  };

  const handleEdit = (paymentId) => {
    console.log('Editing payment with ID:', paymentId);
    navigate(`/payment/edit/${paymentId}`);
  };

  const filterPayments = (text) => {
    const lowerCaseText = text.toLowerCase();
    const filtered = billPayments.filter((payment) => {
      const isAmountString =
        typeof payment.amount === 'string' ||
        typeof payment.amount === 'number';
      const amountString = isAmountString
        ? payment.amount.toString().toLowerCase()
        : '';
      return (
        payment.patient.name.toLowerCase().includes(lowerCaseText) ||
        payment.date.toLowerCase().includes(lowerCaseText) ||
        (isAmountString && amountString.includes(lowerCaseText))
      );
    });
    setFilteredBillPayments(filtered);
  };

  const handleSearch = () => {
    filterPayments(searchText);
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
          <span className="md:text-2xl text-base">Patients Payment List</span>
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
            className="w-[200px] text-sm"
            onClick={handleCreate}
            endIcon={<AddCircleOutlineIcon />}
          >
            Add Payment
          </Button>
        </div>
      </div>

      <div className="pt-[20px]">
        <Box sx={{ width: '100%' }}>
          <DataGrid
            rows={filteredBillPayments} // Use filteredPrescriptions
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

export default ListBillPayments;
