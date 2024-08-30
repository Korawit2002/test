import React, { useState, useEffect } from 'react';
import {
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Grid,
  Box,
  Button
} from '@mui/material';
import { MoreVert as MoreVertIcon, CalendarToday, FirstPage, NavigateBefore, NavigateNext, LastPage } from '@mui/icons-material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { get_all_vet} from '../../../src/component/function/auth';
import { useNavigate } from 'react-router-dom';

const Veterinarian = () => {
  const [veterinarianData, setVeterinarianData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedVet, setSelectedVet] = useState(null);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const fetchVeterinarianData = async (search = '', startDate = null, endDate = null) => {
    try {
      const params = {};
      if (search) params.search = search;
      if (startDate) params.startDate = startDate.toISOString();
      if (endDate) params.endDate = endDate.toISOString();

      const response = await get_all_vet(params);
      setVeterinarianData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching veterinarian data:', error);
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    fetchVeterinarianData(term, startDate, endDate);
  };

  const handleDateFilter = () => {
    if (startDate && endDate) {
      fetchVeterinarianData(searchTerm, startDate, endDate);
    }
  };
  useEffect(() => {
    fetchVeterinarianData();
  }, []);

  // const handleClearDates = () => {
  //   setStartDate(null);
  //   setEndDate(null);
  //   fetchVeterinarianData(searchTerm);
  // };
    const handleClearDates = () => {
      setStartDate(null);
      setEndDate(null);
      setSearchTerm('');
      fetchVeterinarianData();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSkipToFirstPage = () => {
    setPage(0);
  };

  const handleSkipToLastPage = () => {
    setPage(Math.max(0, Math.ceil(veterinarianData.length / rowsPerPage) - 1));
  };

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours.toString().padStart(2, '0');

    return `${day}.${month}.${year} : ${hours}.${minutes} ${ampm}`;
  };

  const handleClick = (event, vet) => {
    setAnchorEl(event.currentTarget);
    setSelectedVet(vet);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // const handleMenuClick = (menuOption) => {
  //   switch (menuOption) {
  //     case 'More':
  //       setSelectedVet(selectedVet);
  //       localStorage.setItem('selectedVetId', selectedVet._id);
  //       navigate(`/request/veterinarian/approve/${selectedVet._id}`);
  //       break;
  //     case 'View':
  //       setSelectedVet(selectedVet);
  //       navigate(`/request/veterinarian/view/${selectedVet._id}`);
  //       break;
  //   }
  //   handleClose();
  // };
  //
  const handleMenuClick = (menuOption) => {
    switch (menuOption) {
      case 'More':
        setSelectedVet(selectedVet);
        localStorage.setItem('selectedVetId', selectedVet._id);
        if (selectedVet.vet_status === 'Waiting for approval' && selectedVet.check_renew === '1') {
          navigate(`/request/veterinarian/approve_renew/${selectedVet._id}`);
        } else {
          navigate(`/request/veterinarian/approve/${selectedVet._id}`);
        }
        break;
      case 'View':
        setSelectedVet(selectedVet);
        navigate(`/request/veterinarian/view/${selectedVet._id}`);
        break;
    }
    handleClose();
  };
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <Paper elevation={0}>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Paper>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                sx={{ mb: 2, color: '#114A8D', fontSize: 24, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}
              >
                Veterinarian
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ width: '100%', height: '2px', backgroundColor: '#0E5F9C' }} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField fullWidth placeholder="Search..." variant="outlined" size="big" value={searchTerm} onChange={handleSearch} />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    format="dd/MM/yyyy"
                    onChange={(newValue) => {
                      setStartDate(newValue);
                      if (newValue && endDate) {
                        fetchVeterinarianData(searchTerm, newValue, endDate);
                      }
                    }}
                    renderInput={(params) => <TextField {...params} variant="outlined" size="small" sx={{ mr: 1 }} />}
                  />
                  <Typography variant="body1" sx={{ mx: 1, fontSize: 18 }}>
                    To
                  </Typography>
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    format="dd/MM/yyyy"
                    onChange={(newValue) => {
                      setEndDate(newValue);
                      if (startDate && newValue) {
                        fetchVeterinarianData(searchTerm, startDate, newValue);
                      }
                    }}
                    renderInput={(params) => <TextField {...params} variant="outlined" size="small" sx={{ mr: 1 }} />}
                  />
                </LocalizationProvider>
                <Button
                  variant="outlined"
                  onClick={handleClearDates}
                  
                  sx={{
                    ml: 1,
                    minWidth: '64px',
                    borderColor: '#B0B0B0',
                    color: '#B0B0B0',
                    '&:hover': {
                      borderColor: '#B0B0B0',
                      backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                  // disabled={!startDate && !endDate}
                >
                  Clear
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <TableContainer
                component={Paper}
                sx={{ boxShadow: 'none', borderTop: '1px solid #e0e0e0', borderBottom: '1px solid #e0e0e0' }}
              >
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell
                        align="center"
                        sx={{ fontWeight: 'bold', color: '#114A8D', fontSize: 16, borderLeft: 'none', borderRight: 'none' }}
                      >
                        No
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontWeight: 'bold', color: '#114A8D', fontSize: 16, borderLeft: 'none', borderRight: 'none' }}
                      >
                        ID Number
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontWeight: 'bold', color: '#114A8D', fontSize: 16, borderLeft: 'none', borderRight: 'none' }}
                      >
                        Vet Name
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontWeight: 'bold', color: '#114A8D', fontSize: 16, borderLeft: 'none', borderRight: 'none' }}
                      >
                        date
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontWeight: 'bold', color: '#114A8D', fontSize: 16, borderLeft: 'none', borderRight: 'none' }}
                      >
                        Request
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontWeight: 'bold', color: '#114A8D', fontSize: 16, borderLeft: 'none', borderRight: 'none' }}
                      >
                        Status
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontWeight: 'bold', color: '#114A8D', fontSize: 16, borderLeft: 'none', borderRight: 'none' }}
                      >
                        Manage
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                      <TableRow key={row.vet_id}>
                        <TableCell align="center" sx={{ fontSize: 16, borderLeft: 'none', borderRight: 'none' }}>
                          {page * rowsPerPage + index + 1}
                        </TableCell>
                        <TableCell align="center" sx={{ fontSize: 16, borderLeft: 'none', borderRight: 'none' }}>
                          {row.vet_id || '-'}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontSize: 16, borderLeft: 'none', borderRight: 'none' }}
                        >{`${row.first_name_th} ${row.last_name_th}`}</TableCell>
                        <TableCell align="center" sx={{ fontSize: 16, borderLeft: 'none', borderRight: 'none' }}>
                          {formatDateTime(row.created_at)}
                        </TableCell>
                        <TableCell align="center" sx={{ fontSize: 16, borderLeft: 'none', borderRight: 'none' }}>
                          {row.approve_status || '-'}
                        </TableCell>
                        <TableCell align="center" sx={{ fontSize: 16, borderLeft: 'none', borderRight: 'none' }}>
                          {row.vet_status || '-'}
                        </TableCell>
                        <TableCell align="center" sx={{ borderLeft: 'none', borderRight: 'none' }}>
                          <IconButton onClick={(event) => handleClick(event, row)}>
                            <MoreVertIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={12}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={() => (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={handleSkipToFirstPage} disabled={page === 0}>
                      <FirstPage />
                    </IconButton>
                    <IconButton onClick={() => handleChangePage(null, page - 1)} disabled={page === 0}>
                      <NavigateBefore />
                    </IconButton>
                    <IconButton
                      onClick={() => handleChangePage(null, page + 1)}
                      disabled={page >= Math.ceil(filteredData.length / rowsPerPage) - 1}
                    >
                      <NavigateNext />
                    </IconButton>
                    <IconButton onClick={handleSkipToLastPage} disabled={page >= Math.ceil(filteredData.length / rowsPerPage) - 1}>
                      <LastPage />
                    </IconButton>
                  </Box>
                )}
              />
            </Grid>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              sx={{
                '& .MuiMenu-paper': {
                  borderRadius: 4,
                  boxShadow: '-1px 1px 7px 0px rgba(90, 114, 123, 0.05) !important',
                  minWidth: '100px', // เพิ่มความกว้างขั้นต่ำของเมนู
                  '& .MuiMenuItem-root': {
                    fontSize: '18px', // เพิ่มขนาดตัวอักษร
                    padding: '8px 10px', // เพิ่มระยะห่างภายใน MenuItem'
                    justifyContent: 'center', // จัดข้อความให้อยู่กึ่งกลางแนวนอน
                    textAlign: 'center' // จัดข้อความให้อยู่กึ่งกลาง (สำหรับข้อความหลายบรรทัด)
                  }
                }
              }}
            >
              {selectedVet && (
                <>
                  {selectedVet.vet_status === 'Waiting for approval' && (
                    <>
                      {['More'].map((option) => (
                        <MenuItem key={option} onClick={() => handleMenuClick(option)}>
                          {option}
                        </MenuItem>
                      ))}
                    </>
                  )}
                  {(selectedVet.vet_status === 'Account activate' || selectedVet.vet_status === 'Deny') && (
                    <>
                      {['View'].map((option) => (
                        <MenuItem key={option} onClick={() => handleMenuClick(option)}>
                          {option}
                        </MenuItem>
                      ))}
                    </>
                  )}
                </>
              )}
            </Menu>
          </Grid>
        </Paper>
      </Box>
    </Paper>
  );
};

export default Veterinarian;
