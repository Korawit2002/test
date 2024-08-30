
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  AppBar,
  Box,
  Toolbar,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
  Select,
  MenuItem,
  InputAdornment,
  Button,
  InputLabel,Paper
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../auth-forms/AuthLogin';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';

// ================================|| TEF - REGISTRATION ||================================ //

const Tef = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [dragActive, setDragActive] = useState(false);
  const [agreed, setAgreed] = useState(false);
  

  // State for form fields
  const [formData, setFormData] = useState({
    applicationType: '',
    firstNameThai: '',
    lastNameThai: '',
    firstNameEng: '',
    lastNameEng: '',
    dateOfBirth: null,
    gender: '',
    phoneNumber: '',
    email: '',
    address: '',
    province: '',
    subdistrict: '',
    district: '',
    postCode: '',
    isThaiNationality: false,
  });

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'isThaiNationality' ? checked : value
    }));
  };

  // Handle date change
  const handleDateChange = (date) => {
    setFormData(prevState => ({
      ...prevState,
      dateOfBirth: date
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // Add your form submission logic here
  };
  const commonTextFieldProps = {
    fullWidth: true,
    onChange: handleChange,
    variant: "outlined",
    InputLabelProps: {
      shrink: true,
      sx: {
        backgroundColor: 'white',
        padding: '0 4px',
        color: '#000000',
        '&.Mui-focused': { color: 'inherit' },
        fontSize: 16,
      }
    }
  };
  //เกี่ยวกับไฟล์
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState('');
  const fileInputRefCard = useRef(null);
  const [fileNameCard, setFileNameCard] = useState('');

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleClickCard = () => {
    fileInputRefCard.current.click();
  };
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      // Handle file upload logic here
      console.log("Selected file:", file);
    }
  };

  const handleFileChangeCard = (event) => {
    const fileCard = event.target.files[0];
    if (fileCard) {
      setFileNameCard(fileCard.name);
      // Handle file upload logic here
      console.log("Selected file:", fileCard);
    }
  };

  const handleAgreeChange = (event) => {
    setAgreed(event.target.checked);
  };




  const renderTextField = (name, label, value, multiline = false, rows = 1) => (
    <TextField
      {...commonTextFieldProps}
      name={name}
      value={value}
      multiline={multiline}
      rows={rows}
      InputLabelProps={{
        ...commonTextFieldProps.InputLabelProps,
        sx: {
          backgroundColor: 'white',
          padding: '0 4px',
          color: '#000000',
          '&.Mui-focused': { color: 'inherit' },
        }
      }}
      label={label}
    />
  );
  

  
  return (
    <AuthWrapper1>
      <Grid container sx={{ width: "100vw", height: "100vh" }}>
          <Grid container spacing={0} justifyContent="center" >
            <Grid item xs={12} sm={12} md={7} lg={12} sx={{background:'#FFFFFF'}}>
            <Box sx={{ flexGrow: 1 }}>
                  <AppBar position="static" sx={{ alignItems: 'center',p:2 }} color="secondary">
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
                      <Typography variant="h6" component="div" sx={{color:'#FFFFFF'}}>
                        TEF Athlete Registration 2024
                      </Typography>
                      <Typography variant="h6" component="div" sx={{color:'#FFFFFF'}}>
                        แบบฟอร์มลงทะเบียนนักกีฬา ภายใต้สมาคมคนกีฬาขี่ม้าแห่งประเทศไทย
                      </Typography>
                    </Box>
                  </AppBar>
            </Box>

            <Grid container mt={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid item xs={10}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
              <Grid item xs={12} mt={1}>
                  <FormControl component="fieldset" sx={{mt: 2}}>
                  <FormLabel 
                      component="legend" 
                      sx={{
                        color:'#000000', 
                        '&.Mui-focused': { color: 'inherit' } // กำหนดให้สีไม่เปลี่ยนแม้เมื่อ focus
                      }}
                    >
                      Who are you completing this registration for? คุณกำลังทำการลงทะเบียนนี้เพื่อใคร?
                    </FormLabel>
                    <RadioGroup 
                      row 
                      name="applicationType" 
                      value={formData.applicationType} 
                      onChange={handleChange}
                      sx={{mt: 2}}
                    >
                      <FormControlLabel
                        value="adult"
                        control={<Radio />}
                        label={
                          <>
                            Applying for Adult - Over 18 
                            <br />
                            นักกีฬาอายุมากกว่า 18
                          </>
                        }
                      />
                      <FormControlLabel
                        value="child"
                        control={<Radio />}
                        label={
                          <>
                            Applying for Child - Under 18
                            <br />
                            นักกีฬาอายุน้อยกว่า 18 
                          </>
                        }

                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                <Typography style={{ width: '100%', height: '100%' }}>
                  <span style={{ color: 'black', fontSize: 16, fontFamily: 'Sarabun', fontWeight: 700, wordWrap: 'break-word' }}>
                    Personal Information <br/>(ข้อมูลส่วนตัว)
                  </span>
                  <span style={{ color: '#FF0000', fontSize: 16, fontFamily: 'Sarabun', fontWeight: 700, wordWrap: 'break-word' }}>
                    *
                  </span>
                </Typography>                
                </Grid>

                  <div style={{ width: '100%', height: '100%', border: '1px #0E5F9C solid', marginTop: '8px',color:"secondary" }}></div>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      {...commonTextFieldProps}
                      name="firstNameThai"
                      value={formData.firstNameThai}
                      label="First Name (ชื่อภาษาไทย)"
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      {...commonTextFieldProps}
                      name="lastNameThai"
                      value={formData.lastNameThai}
                      label="Last Name (นามสกุลภาษาไทย)"
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      {...commonTextFieldProps}
                      label={
                        <span style={{ color: '#000000', fontSize: 16, }}>
                          TEF ID
                        </span>
                      }
                      disabled
                      helperText="The ID will be shown after approval."
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      {...commonTextFieldProps}
                      name="firstNameEng"
                      value={formData.firstNameEng}
                      label="First Name (ชื่อภาษาอังกฤษ)"
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      {...commonTextFieldProps}
                      name="lastNameEng"
                      value={formData.lastNameEng}
                      label="Last Name (นามสกุลภาษาอังกฤษ)"
                    />
                  </Grid>
                

                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel 
                        shrink 
                        sx={{
                          backgroundColor: 'white',
                          padding: '0 4px',
                          color: '#000000',
                          '&.Mui-focused': { color: 'inherit' },
                        }}
                      >
                        Date of Birth (วันเกิด)
                      </InputLabel>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          disableFuture
                          value={formData.dateBirth}
                          onChange={(newValue) => {
                            if (newValue) {
                              handleChange({
                                target: {
                                  name: 'dateOfBirth',
                                  value: newValue
                                }
                              });
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              variant="outlined"
                              inputProps={{
                                ...params.inputProps,
                                'aria-label': 'Date of Birth'
                              }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>

                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel 
                          id=""
                          shrink={true}
                          sx={{ 
                            color: '#000000', 
                            fontSize: 16, 
                            '&.Mui-focused': { color: 'inherit' },
                            backgroundColor: 'white',
                            padding: '0 5px',
                            marginLeft: '-5px',
                          }}
                        >
                          <span style={{ display: 'flex' }}>
                          Gender (เพศ)
                          </span>
                        </InputLabel>
                        <Select
                          labelId=""
                          id=""
                          name=""
                          value={formData.gender}
                          onChange={handleChange}
                          label="Gender (เพศ)"
                        >
                          <MenuItem value="" disabled>
                            <em>เลือกเพศ</em>
                          </MenuItem>
                          <MenuItem value="male">male</MenuItem>
                          <MenuItem value="female">Female</MenuItem>
                          <MenuItem value="other">Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>


                    <Grid item xs={12} sm={4}>
                      <TextField
                        {...commonTextFieldProps}
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        label="Phone Number (เบอร์โทรศัพท์)"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        {...commonTextFieldProps}
                        name="email"
                        value={formData.email}
                        label="E-mail (อีเมล)"
                      />
                    </Grid>

                    <Grid item xs={12} sm={8}>
                      <TextField
                        {...commonTextFieldProps}
                        name="address"
                        value={formData.address}
                        label="Address (ที่อยู่)"
                        multiline
                        rows={1}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel 
                          id="province-label"
                          shrink={true}
                          sx={{ 
                            color: '#000000', 
                            fontSize: 16, 
                            '&.Mui-focused': { color: 'inherit' },
                            backgroundColor: 'white',
                            padding: '0 5px',
                            marginLeft: '-5px',
                          }}
                        >
                          <span style={{ display: 'flex' }}>
                            Province (จังหวัด)
                          </span>
                        </InputLabel>
                        <Select
                          labelId="province-label"
                          id="province"
                          name="province"
                          value={formData.province}
                          onChange={handleChange}
                          label="Province (จังหวัด)"
                        >
                          <MenuItem value="" disabled>
                            <em>เลือกจังหวัด</em>
                          </MenuItem>
                          <MenuItem value="bangkok">กรุงเทพมหานคร</MenuItem>
                          <MenuItem value="nonthaburi">นนทบุรี</MenuItem>
                          <MenuItem value="pathumthani">ปทุมธานี</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel 
                          id="province-label"
                          shrink={true}
                          sx={{ 
                            color: '#000000', 
                            fontSize: 16, 
                            '&.Mui-focused': { color: 'inherit' },
                            backgroundColor: 'white',
                            padding: '0 5px',
                            marginLeft: '-5px',
                          }}
                        >
                          <span style={{ display: 'flex' }}>
                            Subdistrict (แขวง)
                          </span>
                        </InputLabel>
                        <Select
                          labelId="province-label"
                          id="province"
                          name="province"
                          value={formData.subdistrict}
                          onChange={handleChange}
                          label="Subdistrict (แขวง)"
                        >
                          <MenuItem value="" disabled>
                            <em>เลือกแขวง</em>
                          </MenuItem>
                          <MenuItem value="1">1</MenuItem>
                          <MenuItem value="2">2</MenuItem>
                          <MenuItem value="2">3</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel 
                          id="province-label"
                          shrink={true}
                          sx={{ 
                            color: '#000000', 
                            fontSize: 16, 
                            '&.Mui-focused': { color: 'inherit' },
                            backgroundColor: 'white',
                            padding: '0 5px',
                            marginLeft: '-5px',
                          }}
                        >
                          <span style={{ display: 'flex' }}>
                            District (เขต)
                          </span>
                        </InputLabel>
                        <Select
                          labelId="province-label"
                          id="district"
                          name="province"
                          value={formData.district}
                          onChange={handleChange}
                          label="District (เขต)"
                        >
                          <MenuItem value="" disabled>
                            <em>เลือกเขต</em>
                          </MenuItem>
                          <MenuItem value="1">1</MenuItem>
                          <MenuItem value="2">2</MenuItem>
                          <MenuItem value="2">3</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                    <TextField
                      {...commonTextFieldProps}
                      name=""
                      value={formData.postCode}
                      label="Post Code (รหัสไปรษณีย์)"
                    />
                    </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        name="isThaiNationality" 
                        checked={formData.isThaiNationality} 
                        onChange={handleChange} 
                      />
                    }
                    label={
                      <span style={{color: 'black'}}>
                        I confirm the Nationality of the Athlete being registered is Thai. <br/>ข้าพเจ้ายืนยันว่านักกีฬาในการลงทะเบียนถือสัญชาติไทยถูกต้องตามกฎหมาย
                        <span style={{ color: '#FF0000', fontSize: 16, fontFamily: 'Sarabun', fontWeight: 700, wordWrap: 'break-word', marginLeft: '4px' }}>
                          *
                        </span>
                      </span>
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                <Typography style={{ width: '100%', height: '100%' }}>
                  <span style={{ color: 'black', fontSize: 16, fontFamily: 'Sarabun', fontWeight: 700, wordWrap: 'break-word' }}>
                  Discipline <br/>(ประเภท)
                  </span>
                  <span style={{ color: '#FF0000', fontSize: 16, fontFamily: 'Sarabun', fontWeight: 700, wordWrap: 'break-word' }}>
                    *
                  </span>
                </Typography>                
                </Grid>
                <div style={{ width: '100%', height: '100%', border: '1px #0E5F9C solid', marginTop: '8px',color:"secondary" }}></div>


                <Grid item xs={12}>
                  <Typography variant="body2" gutterBottom>
                    NOTE: The registration fee for each discipline is 200 THB. / อัตราค่าลงทะเบียนประเภทละ 200 บาท
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel control={<Checkbox name="jumping" checked={formData.jumping} onChange={handleChange} />} label="Jumping (กระโดดข้ามเครื่องกีดขวาง)" />
                  <FormControlLabel control={<Checkbox name="dressage" checked={formData.dressage} onChange={handleChange} />} label="Dressage (ศิลปะการบังคับม้า)" />
                  <FormControlLabel control={<Checkbox name="eventing" checked={formData.eventing} onChange={handleChange} />} label="Eventing (อีเว้นติ้ง)" />
                  <FormControlLabel control={<Checkbox name="endurance" checked={formData.endurance} onChange={handleChange} />} label="Endurance (การขี่ม้าระยะทาง)" />
                </Grid>

                <Grid item xs={12}>
                <Typography style={{ width: '100%', height: '100%' }}>
                  <span style={{ color: 'black', fontSize: 16, fontFamily: 'Sarabun', fontWeight: 700, wordWrap: 'break-word' }}>
                  Parent/Guardian Information  <br/>(ข้อมูลผู้ปกครอง)
                  </span>
                  <span style={{ color: '#FF0000', fontSize: 16, fontFamily: 'Sarabun', fontWeight: 700, wordWrap: 'break-word' }}>
                    *
                  </span>
                </Typography>                
                </Grid>
                <div style={{ width: '100%', height: '100%', border: '1px #0E5F9C solid', marginTop: '8px',color:"secondary" }}></div>
                
                <Grid item xs={12} sm={4}>
                  <TextField
                    {...commonTextFieldProps}
                    name="ParentfirstNameThai"
                    value={formData.ParentfirstNameThai}
                    label="First Name (ชื่อภาษาไทย)"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    {...commonTextFieldProps}
                    name="ParentlastNameThai"
                    value={formData.ParentlastNameThai}
                    label="Last Name (นามสกุลภาษาไทย)"
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel 
                      shrink 
                      sx={{
                        backgroundColor: 'white',
                        padding: '0 4px',
                        color: '#000000',
                        '&.Mui-focused': { color: 'inherit' },
                      }}
                    >
                      Date of Birth (วันเกิด)
                    </InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        disableFuture
                        value={formData.ParentfirstdateBirth}
                        onChange={(newValue) => {
                          if (newValue) {
                            handleChange({
                              target: {
                                name: 'dateOfBirth',
                                value: newValue
                              }
                            });
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                            inputProps={{
                              ...params.inputProps,
                              'aria-label': 'Date of Birth'
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    {...commonTextFieldProps}
                    name="ParentfirstNameEng"
                    value={formData.ParentfirstNameEng}
                    label="First Name (ชื่อภาษาอังกฤษ)"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    {...commonTextFieldProps}
                    name="arentlastNameEng"
                    value={formData.ParentlastNameEng}
                    label="Last Name (นามสกุลภาษาอังกฤษ)"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel 
                          id="parent-gender-label"
                          shrink={true}
                          sx={{ 
                            color: '#000000', 
                            fontSize: 16, 
                            '&.Mui-focused': { color: 'inherit' },
                            backgroundColor: 'white',
                            padding: '0 5px',
                            marginLeft: '-5px',
                          }}
                        >
                          <span style={{ display: 'flex' }}>
                          Gender (เพศ)
                          </span>
                        </InputLabel>
                        <Select
                          labelId=""
                          id=""
                          name=""
                          value={formData.gender}
                          onChange={handleChange}
                          label="Gender (เพศ)"
                        >
                          <MenuItem value="" disabled>
                            <em>เลือกเพศ</em>
                          </MenuItem>
                          <MenuItem value="male">male</MenuItem>
                          <MenuItem value="female">Female</MenuItem>
                          <MenuItem value="other">Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    {...commonTextFieldProps}
                    name="ParentphoneNumber"
                    value={ormData.ParentphoneNumber}
                    label="Phone Number (เบอร์โทรศัพท์)"
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    {...commonTextFieldProps}
                    name="Parentemail"
                    value={formData.Parentemail}
                    label="E-mail (อีเมล)"
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    {...commonTextFieldProps}
                    name="Parentlastaddress"
                    value={formData.Parentlastaddress}
                    label="Address (ที่อยู่)"
                    multiline
                    rows={1}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel 
                      id="province-label"
                      shrink={true}
                      sx={{ 
                        color: '#000000', 
                        fontSize: 16, 
                        '&.Mui-focused': { color: 'inherit' },
                        backgroundColor: 'white',
                        padding: '0 5px',
                        marginLeft: '-5px',
                      }}
                    >
                      <span style={{ display: 'flex' }}>
                        Province (จังหวัด)
                      </span>
                    </InputLabel>
                    <Select
                      labelId="province-label"
                      id="province"
                      name="province"
                      value={formData.Parentlastprovince}
                      onChange={handleChange}
                      label="Province (จังหวัด)"
                    >
                      <MenuItem value="" disabled>
                        <em>เลือกจังหวัด</em>
                      </MenuItem>
                      <MenuItem value="bangkok">กรุงเทพมหานคร</MenuItem>
                      <MenuItem value="nonthaburi">นนทบุรี</MenuItem>
                      <MenuItem value="pathumthani">ปทุมธานี</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel 
                          id="province-label"
                          shrink={true}
                          sx={{ 
                            color: '#000000', 
                            fontSize: 16, 
                            '&.Mui-focused': { color: 'inherit' },
                            backgroundColor: 'white',
                            padding: '0 5px',
                            marginLeft: '-5px',
                          }}
                        >
                          <span style={{ display: 'flex' }}>
                            Subdistrict (แขวง)
                          </span>
                        </InputLabel>
                        <Select
                          labelId="province-label"
                          id="province"
                          name="province"
                          value={formData.subdistrict}
                          onChange={handleChange}
                          label="Subdistrict (แขวง)"
                        >
                          <MenuItem value="" disabled>
                            <em>เลือกแขวง</em>
                          </MenuItem>
                          <MenuItem value="1">1</MenuItem>
                          <MenuItem value="2">2</MenuItem>
                          <MenuItem value="2">3</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel 
                          id="province-label"
                          shrink={true}
                          sx={{ 
                            color: '#000000', 
                            fontSize: 16, 
                            '&.Mui-focused': { color: 'inherit' },
                            backgroundColor: 'white',
                            padding: '0 5px',
                            marginLeft: '-5px',
                          }}
                        >
                          <span style={{ display: 'flex' }}>
                            District (เขต)
                          </span>
                        </InputLabel>
                        <Select
                          labelId="province-label"
                          id="district"
                          name="province"
                          value={formData.district}
                          onChange={handleChange}
                          label="District (เขต)"
                        >
                          <MenuItem value="" disabled>
                            <em>เลือกเขต</em>
                          </MenuItem>
                          <MenuItem value="1">1</MenuItem>
                          <MenuItem value="2">2</MenuItem>
                          <MenuItem value="2">3</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <TextField
                      {...commonTextFieldProps}
                      name=""
                      value={formData.postCode}
                      label="Post Code (รหัสไปรษณีย์)"
                    />
                    </Grid>


                <Grid item xs={12}>
                <Typography style={{ width: '100%', height: '100%' }}>
                  <span style={{ color: 'black', fontSize: 16, fontFamily: 'Sarabun', fontWeight: 700, wordWrap: 'break-word' }}>
                  Club Information  <br/>(ข้อมูลสโมสร)
                  </span>
                  <span style={{ color: '#FF0000', fontSize: 16, fontFamily: 'Sarabun', fontWeight: 700, wordWrap: 'break-word' }}>
                    *
                  </span>
                </Typography>                
                </Grid>
                <div style={{ width: '100%', height: '100%', border: '1px #0E5F9C solid', marginTop: '8px',color:"secondary" }}></div>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel 
                      id="province-label"
                      shrink={true}
                      sx={{ 
                        color: '#000000', 
                        fontSize: 16, 
                        '&.Mui-focused': { color: 'inherit' },
                        backgroundColor: 'white',
                        padding: '0 5px',
                        marginLeft: '-5px',
                      }}
                    >
                      <span style={{ display: 'flex' }}>
                      Club name (ชื่อสโมสร)
                      </span>
                    </InputLabel>
                    <Select
                      labelId="province-label"
                      id="province"
                      name="province"
                      value={formData.Club}
                      onChange={handleChange}
                      label="Club name (ชื่อสโมสร)"
                    >
                      <MenuItem value="" disabled>
                        <em>เลือกสโมสร</em>
                      </MenuItem>
                      <MenuItem value="bangkok">สโมสร</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                <Typography style={{ width: '100%', height: '100%' }}>
                  <span style={{ color: 'black', fontSize: 16, fontFamily: 'Sarabun', fontWeight: 700, wordWrap: 'break-word' }}>
                  Portrait Photo  <br/>(รูปถ่ายนักกีฬา)
                  </span>
                  <span style={{ color: '#FF0000', fontSize: 16, fontFamily: 'Sarabun', fontWeight: 700, wordWrap: 'break-word' }}>
                    *
                  </span>
                </Typography>                
                </Grid>
                <div style={{ width: '100%', height: '100%', border: '1px #0E5F9C solid', marginTop: '8px',color:"secondary" }}></div>

                <Grid item xs={12}>
                  <Typography variant="body2" gutterBottom>
                  NOTE: Athlete's portrait photo will gradually become compulsory for all TEF & FEI events. We therefore request a portrait photo of good quality from <br/>
                  every rider without helmet, hat or sunglasses against a neutral background that is applying for an FEI license in 2024.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" gutterBottom>
                  รูปถ่ายของนักกีฬจะกลายเป็นภาพแสดงบนข้อมูล TEF และ FEI events ดังนั้นจึงขอแนะนำรูปถ่ายที่มีคุณภาพจากนักกีฬทุกคน โดยไม่สวมหมวกนิรภัยหรือแว่นตากันแดด <br/>
                  ในพื้นหลังที่เป็นสีพื้นสำหรับการยื่นขอใบอนุญาต FEI ปี 2024
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Box sx={{ margin: 'auto', textAlign: 'center'}}>                  
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                      accept=".jpg,.png,.pdf"
                    />
                    <Paper
                      elevation={0}
                      onClick={handleClick}
                      sx={{
                        backgroundColor: '#EAF0F6',
                        padding: 1,
                        
                        borderRadius: 2,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        height: '100%',
                        '&:hover': {
                          backgroundColor: '#EAF0F6',
                        },
                      }}
                    >
                      <CloudUploadIcon sx={{ fontSize: 38, color: '#05255B', mb: 0.5 }} />
                      <Typography variant="body1" gutterBottom>
                        {fileName ? fileName : 'Drag file to upload'}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        รองรับไฟล์ jpg, png, pdf, ขนาดไม่เกิน 5 mb
                      </Typography>
                    </Paper>
                  </Box>
                </Grid>


                {/* การแสดงผลของไฟล์ เมื่อเลือกแล้ว */}

                <Grid item xs={12}>
                <Typography style={{ width: '100%', height: '100%' }}>
                  <span style={{ color: 'black', fontSize: 16, fontFamily: 'Sarabun', fontWeight: 700, wordWrap: 'break-word' }}>
                  Copy of Identification Card or Passport  <br/>สำเนาเอกสารแนบบัตรประชาชน/บัตรราชการ/หนังสือเดินทาง
                  </span>
                  <span style={{ color: '#FF0000', fontSize: 16, fontFamily: 'Sarabun', fontWeight: 700, wordWrap: 'break-word' }}>
                    *
                  </span>
                </Typography>                
                </Grid>
                <div style={{ width: '100%', height: '100%', border: '1px #0E5F9C solid', marginTop: '8px',color:"secondary" }}></div>

                <Grid item xs={12} sm={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel 
                    shrink 
                    sx={{
                      backgroundColor: 'white',
                      padding: '0 4px',
                      color: '#000000',
                      '&.Mui-focused': { color: 'inherit' },
                    }}
                  >
                    Expiration (วันหมดอายุ)
                  </InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      //disableFuture
                      // value={formData.}
                      onChange={(newValue) => {
                        if (newValue) {
                          handleChange({
                            target: {
                              name: '',
                              value: newValue
                            }
                          });
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          variant="outlined"
                        />
                      )}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                  <Box sx={{ margin: 'auto', textAlign: 'center'}}>                  
                    <input
                      type="file"
                      ref={fileInputRefCard }
                      onChange={handleFileChangeCard }
                      style={{ display: 'none' }}
                      accept=".jpg,.png,.pdf"
                    />
                    <Paper
                      elevation={0}
                      onClick={handleClickCard }
                      sx={{
                        backgroundColor: '#EAF0F6',
                        padding: 1,
                        
                        borderRadius: 2,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        height: '100%',
                        '&:hover': {
                          backgroundColor: '#EAF0F6',
                        },
                      }}
                    >
                      <CloudUploadIcon sx={{ fontSize: 38, color: '#05255B', mb: 0.5 }} />
                      <Typography variant="body1" gutterBottom>
                        {fileNameCard  ? fileNameCard  : 'Drag file to upload'}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        รองรับไฟล์ jpg, png, pdf, ขนาดไม่เกิน 5 mb
                      </Typography>
                    </Paper>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={12} mt={6}>
                  <FormControlLabel
                  control={
                    <Checkbox
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                    />
                  }
                  label={
                    <Typography variant="body2">
                      I agree to TEF Membership Terms and Conditions, to view the full terms and conditions{' '}
                      <span color="primary">click here</span>. TEF will do spot checks to verify the details declared are correct.
                      <br />
                      ฉันยอมรับตามข้อกำหนดและเงื่อนไขสมาชิก TEF ดูรายละเอียดเพิ่มเติม<span color="primary">คลิกที่นี่</span>
                      <br />
                      ทางสมาคมกีฬาขี่ม้าแห่งประเทศไทยจะดำเนินการตรวจสอบข้อมูลเพื่อยืนยันความถูกต้องของข้อมูลที่ได้รับ
                    </Typography>
                  }
                />
                </Grid>
                

                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                    <Button variant="outlined" sx={{ mr: 2 }}>
                            <span color="secondary">BACK</span>
                    </Button>
                    <Button variant="contained" color="secondary">
                            SUBMIT
                    </Button>
                  </Grid>

                      


              </Grid>
            </form>
            </Grid>
          </Grid>

            
          <Typography variant="body2" sx={{ textAlign: 'center', mt: 12, color: 'text.secondary' }}>
                © 2024 Thailand Equestrian Federation digitilized by T.LOGICAL (LOGO)
          </Typography>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Tef;