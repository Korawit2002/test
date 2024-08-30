import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//api จะอยู่ใน /Users/tlo07/Desktop/TEF/users_app/src/component/function/auth.js
import { getProvince, getAmpur, getTambon, getZipcode, createVeterinarian } from '../../../../component/function/auth';
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
  InputLabel,
  Paper,
  LinearProgress,
  FormHelperText,
  Dialog,
  DialogContent,
  DialogFooter
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../auth-forms/AuthLogin';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// ================================|| TEF - REGISTRATION ||================================ //

const Tef = () => {
  const theme = useTheme();
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
  const [submissionAttempted, setSubmissionAttempted] = useState(false);

  //state สำหรับเก็บข้อมูลจังหวัด อำเภอ และตำบล
  const [provinces, setProvinces] = useState([]);
  const [amphurs, setAmphurs] = useState([]);
  const [tambons, setTambons] = useState([]);

  //state สำหรับการจัดการสถานะการส่งข้อมูล
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [errors, setErrors] = useState({});

  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // นำทางกลับไปยังหน้าแรก (root path)
  const handleBackToHome = () => {
    navigate('/register');
  };
  const handleSuccessDialogClose = () => {
    setIsSuccessDialogOpen(false);
    navigate('/');
  };

  // State for form fields
  const [formData, setFormData] = useState({
    applicationType: '',
    first_name_th: '',
    last_name_th: '',
    first_name_en: '',
    last_name_en: '',
    date_of_birth: null,
    gender: '',

    phone_number: '',
    email: '',
    address: '',
    province: '',
    subdistrict: '',
    district: '',
    postcode: '',
    isThaiNationality: false,
    vet_school: '',
    country: '',
    year_of_graduation: '',
    expiration_passport: null,
    practitioner: '',
    expiration_practitioner: null,
    approve_status: 'New registration',
    vet_status: 'Waiting for approval',
    check_renew: '0'
  });

  //seEffect hooks เพื่อโหลดข้อมูลเมื่อคอมโพเนนต์โหลดและเมื่อมีการเปลี่ยนแปลงการเลือก
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await getProvince();
        setProvinces(response.data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchAmphurs = async () => {
      if (formData.province) {
        try {
          const selectedProvince = provinces.find((p) => p.name_th === formData.province);
          if (selectedProvince) {
            const response = await getAmpur(selectedProvince.id);
            setAmphurs(response.data);
            setFormData((prev) => ({ ...prev, district: '', subdistrict: '', postcode: '' }));
          }
        } catch (error) {
          console.error('Error fetching amphurs:', error);
        }
      }
    };
    fetchAmphurs();
  }, [formData.province, provinces]);

  useEffect(() => {
    const fetchTambons = async () => {
      if (formData.district) {
        try {
          const selectedAmphur = amphurs.find((a) => a.name_th === formData.district);
          if (selectedAmphur) {
            const response = await getTambon(selectedAmphur.id);
            setTambons(response.data);
            setFormData((prev) => ({ ...prev, subdistrict: '', postCode: '' }));
          }
        } catch (error) {
          console.error('Error fetching tambons:', error);
        }
      }
    };
    fetchTambons();
  }, [formData.district, amphurs]);

  useEffect(() => {
    const fetchZipcode = async () => {
      if (formData.subdistrict) {
        try {
          const selectedTambon = tambons.find((t) => t.name_th === formData.subdistrict);
          if (selectedTambon) {
            const response = await getZipcode(selectedTambon.id);
            if (response.data && response.data.length > 0) {
              setFormData((prev) => ({ ...prev, postcode: response.data[0].zip_code }));

              setErrors((prev) => ({ ...prev, postcode: null }));
            }
          }
        } catch (error) {
          console.error('Error fetching zipcode:', error);
        }
      }
    };
    fetchZipcode();
  }, [formData.subdistrict, tambons]);

  const isValidFileSize = (file) => {
    const maxSize = 2.5 * 1024 * 1024; // 5MB
    return file.size <= maxSize;
  };

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData((prevState) => {
      const newState = {
        ...prevState,
        [name]: type === 'checkbox' ? checked : value
      };

      // Reset related fields when province changes
      if (name === 'province') {
        newState.district = '';
        newState.subdistrict = '';
        newState.postcode = '';
      }

      // Reset related fields when district changes
      if (name === 'district') {
        newState.subdistrict = '';
        newState.postcode = '';
      }

      return newState;
    });

    // Clear errors for the changed field and postcode
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (name === 'province' || name === 'district' || name === 'subdistrict') {
      setErrors((prev) => ({ ...prev, postcode: null }));
    }
  };

  // Handle date change
  const handleDateChange = (name, date) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: date
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const commonTextFieldProps = {
    fullWidth: true,
    onChange: handleChange,
    variant: 'outlined',
    InputLabelProps: {
      shrink: true,
      sx: {
        backgroundColor: 'white',
        padding: '0 4px',
        color: '#000000',
        '&.Mui-focused': { color: 'inherit' },
        fontSize: 16
      }
    }
  };

  //เกี่ยวกับไฟล์
  const fileInputRefCard = useRef(null);
  const [fileNameCard, setFileNameCard] = useState('');
  const fileInputRefPhoto = useRef(null);
  const [fileNamePhoto, setFileNamePhoto] = useState('');
  const fileInputRefLicense = useRef(null);
  const [fileNameLicense, setFileNameLicense] = useState('');

  const handleClickCard = () => fileInputRefCard.current.click();
  const handleClickPhoto = () => fileInputRefPhoto.current.click();
  const handleClickLicense = () => fileInputRefLicense.current.click();

  const handleFileChangeCard = (file) => {
    if (file) {
      if (isValidFileSize(file)) {
        setFileNameCard(file.name);
        setDraggedFiles((prev) => ({ ...prev, passport: file }));
        setIsSubmitted(false);
        setErrors((prev) => ({ ...prev, fileCard: null }));
      } else {
        setErrors((prev) => ({ ...prev, fileCard: 'File size exceeds 5 MB limit. (ขนาดไฟล์เกิน 5 MB)' }));
      }
    }
  };

  const resetForm = () => {
    setFormData({
      applicationType: '',
      first_name_th: '',
      last_name_th: '',
      first_name_en: '',
      last_name_en: '',
      date_of_birth: null,
      gender: '',
      phone_number: '',
      email: '',
      address: '',
      province: '',
      subdistrict: '',
      district: '',
      postcode: '',
      isThaiNationality: false,
      vet_school: '',
      country: '',
      year_of_graduation: '',
      expiration_passport: null,
      practitioner: '',
      expiration_practitioner: null
    });

    setFileNameCard('');
    setFileNamePhoto('');
    setFileNameLicense('');

    setDraggedFiles({
      passport: null,
      photo: null,
      license: null
    });

    setErrors({});
    setIsSubmitted(false);
    setSubmissionAttempted(false);
    setAgreed(false);

    // รีเซ็ต state อื่นๆ ที่เกี่ยวข้อง
    setProvinces([]);
    setAmphurs([]);
    setTambons([]);

    setIsSubmitting(false);
    setSubmitError(null);
    setSubmitSuccess(false);
  };
  const [draggedFiles, setDraggedFiles] = useState({
    passport: null,
    photo: null,
    license: null
  });

  const handleFileChangePhoto = (file) => {
    if (file) {
      if (isValidFileSize(file)) {
        setFileNamePhoto(file.name);
        setDraggedFiles((prev) => ({ ...prev, photo: file }));
        setIsSubmitted(false);
        setErrors((prev) => ({ ...prev, filePhoto: null }));
      } else {
        setErrors((prev) => ({ ...prev, filePhoto: 'File size exceeds 5 MB limit. (ขนาดไฟล์เกิน 5 MB)' }));
      }
    }
  };

  const handleFileChangeLicense = (file) => {
    if (file) {
      if (isValidFileSize(file)) {
        setFileNameLicense(file.name);
        setDraggedFiles((prev) => ({ ...prev, license: file }));
        setIsSubmitted(false);
        setErrors((prev) => ({ ...prev, fileLicense: null }));
      } else {
        setErrors((prev) => ({ ...prev, fileLicense: 'File size exceeds 5 MB limit. (ขนาดไฟล์เกิน 5 MB)' }));
      }
    }
  };

  const handleDeleteCard = () => setFileNameCard('');
  const handleDeletePhoto = () => setFileNamePhoto('');
  const handleDeleteLicense = () => setFileNameLicense('');

  const getFileIcon = (fileName) => {
    if (fileName.match(/\.(jpeg|jpg|gif|png)$/i) != null) {
      return <ImageIcon sx={{ color: '#4CAF50' }} />; // สีเขียวสำหรับรูปภาพ
    } else if (fileName.match(/\.(pdf)$/i) != null) {
      return <PictureAsPdfIcon sx={{ color: '#F44336' }} />; // สีแดงสำหรับ PDF
    } else {
      return <InsertDriveFileIcon sx={{ color: '#2196F3' }} />; // สีน้ำเงินสำหรับไฟล์อื่นๆ
    }
  };
  const [isDragActive, setIsDragActive] = useState(false);
  const dropRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChangeCard(file);
    }
  };

  let backgroundColor = '#EAF0F6';
  if (isDragActive) {
    backgroundColor = '#D0E0F0';
  }
  const [isDragActivePhoto, setIsDragActivePhoto] = useState(false);
  const dropRefPhoto = useRef(null);

  const handleDragPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragInPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActivePhoto(true);
  };

  const handleDragOutPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActivePhoto(false);
  };

  const handleDropPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActivePhoto(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      if (isValidFileSize(file)) {
        handleFileChangePhoto(file);
      } else {
        setErrors((prev) => ({ ...prev, filePhoto: 'File size exceeds 5 MB limit. (ขนาดไฟล์เกิน 5 MB)' }));
      }
    }
  };

  let backgroundColorPhoto = '#EAF0F6';
  if (isDragActivePhoto) {
    backgroundColorPhoto = '#D0E0F0';
  }

  const [isDragActiveLicense, setIsDragActiveLicense] = useState(false);
  const dropRefLicense = useRef(null);

  const handleDragLicense = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragInLicense = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActiveLicense(true);
  };

  const handleDragOutLicense = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActiveLicense(false);
  };

  const handleDropLicense = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActiveLicense(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      if (isValidFileSize(file)) {
        handleFileChangeLicense(file);
      } else {
        setErrors((prev) => ({ ...prev, fileLicense: 'File size exceeds 5 MB limit. (ขนาดไฟล์เกิน 5 MB)' }));
      }
    }
  };

  let backgroundColorLicense = '#EAF0F6';
  if (isDragActiveLicense) {
    backgroundColorLicense = '#D0E0F0';
  }

  const handleAgreeChange = (event) => {
    setAgreed(event.target.checked);
    if (errors.agreed) {
      setErrors((prev) => ({ ...prev, agreed: null }));
    }
  };
  // Handle form submission

  const handleSubmit = async (event) => {
    event.preventDefault();
    let newErrors = {};
    let isValid = true;
    setIsSubmitted(true);
    setSubmissionAttempted(true);

    const requiredFields = [
      'first_name_th',
      'last_name_th',
      'first_name_en',
      'last_name_en',
      'date_of_birth',
      'gender',
      'phone_number',
      'email',
      'address',
      'province',
      'district',
      'subdistrict',
      'postcode',
      'vet_school',
      'country',
      'year_of_graduation',
      'expiration_passport',
      'practitioner',
      'expiration_practitioner'
      // 'check_renew',
    ];

    const isValidEmail = (email) => {
      const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return re.test(String(email).toLowerCase());
    };

    const isValidPhoneNumber = (phone) => {
      const re = /^[0-9]{9,10}$/; // สำหรับเบอร์โทรไทย 9 หลัก
      return re.test(phone);
    };

    const isValidDate = (date, shouldBePast = true) => {
      const currentDate = new Date();
      const selectedDate = new Date(date);
      return shouldBePast ? selectedDate <= currentDate : selectedDate >= currentDate;
    };

    const isValidFile = (file) => {
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      return validTypes.includes(file.type) && file.size <= maxSize;
    };

    // เพิ่มฟังก์ชันตรวจสอบใหม่
    const isValidThai = (text) => /^[\u0E00-\u0E7F\s]*$/.test(text);
    const isValidEnglish = (text) => /^[A-Za-z\s]*$/.test(text);
    const isValidYear = (year) => /^\d{4}$/.test(year);

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = ' ';
        isValid = false;
      }
    });

    // ตรวจสอบชื่อภาษาไทย
    if (!isValidThai(formData.first_name_th)) {
      newErrors.first_name_th = ' ';
      isValid = false;
    }
    if (!isValidThai(formData.last_name_th)) {
      newErrors.last_name_th = ' ';
      isValid = false;
    }

    // ตรวจสอบชื่อภาษาอังกฤษ
    if (!isValidEnglish(formData.first_name_en)) {
      newErrors.first_name_en = ' ';
      isValid = false;
    }
    if (!isValidEnglish(formData.last_name_en)) {
      newErrors.last_name_en = ' ';
      isValid = false;
    }

    // ตรวจสอบปีที่จบการศึกษา
    if (!isValidYear(formData.year_of_graduation)) {
      newErrors.year_of_graduation = ' ';
      isValid = false;
    }

    if (!isValidEmail(formData.email)) {
      newErrors.email = ' ';
      isValid = false;
    }

    if (!isValidDate(formData.date_of_birth)) {
      newErrors.date_of_birth = ' ';
      isValid = false;
    }

    if (!isValidDate(formData.expiration_passport, false)) {
      newErrors.expiration_passport = ' ';
      isValid = false;
    }

    // ตรวจสอบไฟล์ที่อัพโหลด
    const fileInputs = [
      { ref: fileInputRefCard, name: 'passport', fieldName: 'fileCard' },
      { ref: fileInputRefPhoto, name: 'photo', fieldName: 'filePhoto' },
      { ref: fileInputRefLicense, name: 'license', fieldName: 'fileLicense' }
    ];

    fileInputs.forEach(({ ref, name, fieldName }) => {
      const file = draggedFiles[name] || (ref.current && ref.current.files[0]);
      if (!file) {
        //newErrors[fieldName] = `${name} is required`;
        isValid = false;
      } else if (!isValidFile(file)) {
        //newErrors[fieldName] = 'Invalid file type or size (max 5MB, jpg/png/pdf only)';
        isValid = false;
      }
    });

    if (!agreed) {
      newErrors.agreed = ' ';
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const formDataToSend = new FormData();

      const dateFields = ['date_of_birth', 'expiration_passport', 'expiration_practitioner'];
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
          if (dateFields.includes(key) && formData[key] instanceof Date) {
            const formattedDate = formData[key].toLocaleDateString('en-GB'); // "DD/MM/YYYY"
            formDataToSend.append(key, formattedDate);
          } else {
            formDataToSend.append(key, formData[key]);
          }
        }
      });

      // เพิ่มไฟล์
      fileInputs.forEach(({ ref, name }) => {
        const file = draggedFiles[name] || (ref.current && ref.current.files[0]);
        if (file) {
          formDataToSend.append(name, file);
        }
      });

      // Log ข้อมูลที่จะส่ง (สำหรับการแก้ไขปัญหา)
      console.log('Form data to be sent:');
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }

      // เรียกใช้ API
      const response = await createVeterinarian(formDataToSend);
      console.log('Veterinarian created:', response);

      setSubmitSuccess(true);
      resetForm(); // เรียกใช้ resetForm ที่นี่
      setIsSuccessDialogOpen(true); // เปิด dialog แสดงความสำเร็จ
    } catch (error) {
      console.error('Error creating veterinarian:', error);
      setSubmitError('เกิดข้อผิดพลาดในการส่งแบบฟอร์ม กรุณาลองอีกครั้ง');
      if (error.response) {
        // Log ข้อมูลการตอบกลับจาก server สำหรับการแก้ไขปัญหา
        console.error('Server responded with:', error.response.data);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  //#0E2130
  return (
    <AuthWrapper1>
      <Grid container sx={{ width: '100vw', height: '100vh' }}>
        <Grid container spacing={0} justifyContent="center">
          <Grid item xs={12} sm={12} md={7} lg={12} sx={{ background: '#FFFFFF' }}>
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static" sx={{ alignItems: 'center', p: 2, background: '#0E2130' }} color="secondary">
                {/* <AppBar position="static" sx={{ alignItems: 'center', p: 2 ,background: '#FFFFFF'}} color="secondary"> */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
                  <Typography variant="h5" component="div" sx={{ color: '#FFFFFF' }}>
                    TEF ID for Veterinarian Registration
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ color: '#FFFFFF' }}>
                    แบบฟอร์มลงทะเบียนสัตวแพทย์ ภายใต้สมาคมกีฬาขี่ม้าแห่งประเทศไทย
                  </Typography>
                </Box>
              </AppBar>
            </Box>

            <Grid container mt={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Grid item xs={10}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography style={{ width: '100%', height: '100%' }}>
                        <span style={{ color: 'black', fontSize: 16, fontWeight: 700, wordWrap: 'break-word' }}>
                          Personal Information <br />
                          (ข้อมูลส่วนตัว)
                        </span>
                        <span style={{ color: '#FF0000', fontSize: 16, fontWeight: 700, wordWrap: 'break-word' }}>*</span>
                      </Typography>
                    </Grid>

                    {/* <div style={{ width: '100%', height: '100%', border: '1px #0E5F9C solid', marginTop: '8px',color:"secondary" }}></div> */}

                    <Grid item xs={12}>
                      <Box sx={{ width: '100%', height: '2px', backgroundColor: '#0E5F9C' }} />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        {...commonTextFieldProps}
                        name="first_name_th"
                        value={formData.first_name_th}
                        label="First Name (ชื่อภาษาไทย)"
                        error={!!errors.first_name_th}
                        helperText={errors.first_name_th}
                        onKeyPress={(event) => {
                          const thaiRegex = /[\u0E00-\u0E7F]/;
                          if (!thaiRegex.test(event.key) || event.key === ' ') {
                            event.preventDefault();
                          }
                        }}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          const thaiRegex = /^[\u0E00-\u0E7F]*$/;

                          if (!thaiRegex.test(value)) {
                            setErrors((prev) => ({ ...prev, [name]: 'กรุณากรอกเฉพาะภาษาไทยเท่านั้น' }));
                          } else {
                            setErrors((prev) => ({ ...prev, [name]: '' }));
                          }

                          setFormData((prev) => ({ ...prev, [name]: value }));
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: errors.first_name_th ? 'red' : '#B9B7B7'
                            },
                            '&:hover fieldset': {
                              borderColor: errors.first_name_th ? 'red' : '#B9B7B7'
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: errors.first_name_th ? 'red' : '#B9B7B7'
                            }
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        {...commonTextFieldProps}
                        name="last_name_th"
                        value={formData.last_name_th}
                        label="Last Name (นามสกุลภาษาไทย)"
                        error={!!errors.last_name_th}
                        helperText={errors.last_name_th}
                        onKeyPress={(event) => {
                          const thaiRegex = /[\u0E00-\u0E7F]/;
                          if (!thaiRegex.test(event.key) || event.key === ' ') {
                            event.preventDefault();
                          }
                        }}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          const thaiRegex = /^[\u0E00-\u0E7F]*$/;

                          if (!thaiRegex.test(value)) {
                            setErrors((prev) => ({ ...prev, [name]: 'กรุณากรอกเฉพาะภาษาไทยเท่านั้น' }));
                          } else {
                            setErrors((prev) => ({ ...prev, [name]: '' }));
                          }

                          setFormData((prev) => ({ ...prev, [name]: value }));
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: errors.last_name_th ? 'red' : '#B9B7B7'
                            },
                            '&:hover fieldset': {
                              borderColor: errors.last_name_th ? 'red' : '#B9B7B7'
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: errors.last_name_th ? 'red' : '#B9B7B7'
                            }
                          }
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        {...commonTextFieldProps}
                        label="VET. ID (เลขประจำตัวสัตวแพทย์)"
                        disabled
                        fullWidth
                        InputProps={{
                          ...commonTextFieldProps.InputProps,
                          startAdornment: (
                            <InputAdornment position="start" style={{ maxWidth: '100%' }}>
                              <div
                                style={{
                                  color: 'rgba(0, 0, 0, 0.38)',
                                  fontSize: '1rem', // ลดขนาดตัวอักษร
                                  lineHeight: '1.2em',
                                  maxHeight: '2.4em',
                                  overflow: 'hidden',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  wordBreak: 'break-word',
                                  width: '100%' // ใช้พื้นที่ทั้งหมดที่มี
                                }}
                              >
                                The ID will be shown after approval.
                              </div>
                            </InputAdornment>
                          ),
                          style: {
                            ...commonTextFieldProps.InputProps?.style,
                            backgroundColor: '#FBFBFB',
                            color: 'rgba(0, 0, 0, 0.38)',
                            display: 'flex',
                            alignItems: 'center'
                          }
                        }}
                        InputLabelProps={{
                          ...commonTextFieldProps.InputLabelProps,
                          shrink: true,
                          style: {
                            ...commonTextFieldProps.InputLabelProps?.style,
                            color: 'rgba(0, 0, 0, 0.6)'
                          }
                        }}
                        sx={{
                          '& .MuiInputBase-root': {
                            display: 'flex',
                            alignItems: 'center'
                          },
                          '& .MuiInputAdornment-root': {
                            maxWidth: 'calc(100% - 32px)', // จำกัดความกว้างของ InputAdornment
                            marginRight: '8px'
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        {...commonTextFieldProps}
                        name="first_name_en"
                        value={formData.first_name_en}
                        label="First Name (ชื่อภาษาอังกฤษ)"
                        error={!!errors.first_name_en}
                        helperText={errors.first_name_en}
                        onKeyPress={(event) => {
                          const englishRegex = /[A-Za-z]/;
                          if (!englishRegex.test(event.key) || event.key === ' ') {
                            event.preventDefault();
                          }
                        }}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          const englishRegex = /^[A-Za-z]*$/;

                          if (!englishRegex.test(value)) {
                            setErrors((prev) => ({ ...prev, [name]: 'Please enter English characters only' }));
                          } else {
                            setErrors((prev) => ({ ...prev, [name]: '' }));
                          }

                          setFormData((prev) => ({ ...prev, [name]: value }));
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: errors.first_name_en ? 'red' : '#B9B7B7'
                            },
                            '&:hover fieldset': {
                              borderColor: errors.first_name_en ? 'red' : '#B9B7B7'
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: errors.first_name_en ? 'red' : '#B9B7B7'
                            }
                          }
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        {...commonTextFieldProps}
                        name="last_name_en"
                        value={formData.last_name_en}
                        label="Last Name (นามสกุลภาษาอังกฤษ)"
                        error={!!errors.last_name_en}
                        helperText={errors.last_name_en}
                        onKeyPress={(event) => {
                          const englishRegex = /[A-Za-z]/;
                          if (!englishRegex.test(event.key) || event.key === ' ') {
                            event.preventDefault();
                          }
                        }}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          const englishRegex = /^[A-Za-z]*$/;

                          if (!englishRegex.test(value)) {
                            setErrors((prev) => ({ ...prev, [name]: 'Please enter English characters only' }));
                          } else {
                            setErrors((prev) => ({ ...prev, [name]: '' }));
                          }

                          setFormData((prev) => ({ ...prev, [name]: value }));
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: errors.last_name_en ? 'red' : '#B9B7B7'
                            },
                            '&:hover fieldset': {
                              borderColor: errors.last_name_en ? 'red' : '#B9B7B7'
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: errors.last_name_en ? 'red' : '#B9B7B7'
                            }
                          }
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth variant="outlined" error={!!errors.date_of_birth}>
                        <InputLabel
                          shrink
                          sx={{
                            backgroundColor: 'white',
                            padding: '0 4px',
                            color: errors.date_of_birth ? 'red' : '#000000',
                            '&.Mui-focused': { color: '#B9B7B7' }
                          }}
                        >
                          Date of Birth (วันเกิด)
                        </InputLabel>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            disableFuture
                            value={formData.date_of_birth}
                            onChange={(newValue) => {
                              handleDateChange('date_of_birth', newValue);
                              if (errors.date_of_birth) {
                                setErrors((prev) => ({ ...prev, date_of_birth: null }));
                              }
                            }}
                            format="dd/MM/yyyy"
                            slotProps={{
                              textField: {
                                fullWidth: true,
                                variant: 'outlined',
                                error: !!errors.date_of_birth,
                                helperText: errors.date_of_birth,
                                InputLabelProps: { shrink: true },
                                inputProps: { readOnly: true },
                                sx: {
                                  '& input::placeholder': {
                                    color: '#737373'
                                  },
                                  '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                      borderColor: submissionAttempted && !formData.date_of_birth ? 'red' : 'rgba(0, 0, 0, 0.23)'
                                    },
                                    '&:hover fieldset': {
                                      borderColor: submissionAttempted && !formData.date_of_birth ? 'red' : 'rgba(0, 0, 0, 0.23)'
                                    },
                                    '&.Mui-focused fieldset': {
                                      borderColor: submissionAttempted && !formData.date_of_birth ? 'red' : '#1976d2'
                                    }
                                  }
                                }
                              }
                            }}
                          />
                        </LocalizationProvider>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth variant="outlined" error={!!errors.gender}>
                        <InputLabel
                          id="gender-label"
                          shrink={true}
                          sx={{
                            color: errors.gender ? 'red' : '#000000',
                            fontSize: 16,
                            '&.Mui-focused': { color: 'inherit' },
                            backgroundColor: 'white',
                            padding: '0 5px',
                            marginLeft: '-5px'
                          }}
                        >
                          <span style={{ display: 'flex' }}>Gender (เพศ)</span>
                        </InputLabel>
                        <Select
                          labelId="gender-label"
                          id="gender"
                          name="gender"
                          value={formData.gender}
                          onChange={(e) => {
                            handleChange(e);
                            // Clear error when user selects an option
                            if (errors.gender) {
                              setErrors((prev) => ({ ...prev, gender: null }));
                            }
                          }}
                          IconComponent={ExpandMoreIcon}
                          label="Gender (เพศ)"
                          sx={{
                            '& .MuiSelect-icon': {
                              color: '#B9B7B7'
                            }
                          }}
                        >
                          <MenuItem value="" disabled>
                            <em>เลือกเพศ</em>
                          </MenuItem>
                          <MenuItem value="male">Male</MenuItem>
                          <MenuItem value="female">Female</MenuItem>
                          <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
                        </Select>
                        {errors.gender && <FormHelperText error>{errors.gender}</FormHelperText>}
                      </FormControl>
                    </Grid>

                    {/* <Grid item xs={12} sm={4}>
                      <TextField
                        {...commonTextFieldProps}
                        name="phone_number"
                        value={formData.phone_number}
                        label="Phone Number (เบอร์โทรศัพท์)"
                        error={!!errors.phone_number}
                        helperText={errors.phone_number}
                        inputProps={{
                          maxLength: 10
                        }}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: errors.phone_number ? 'red' : '#B9B7B7'
                            }
                          }
                        }}
                      />
                    </Grid> */}
                    <Grid item xs={12} sm={4}>
                      <TextField
                        {...commonTextFieldProps}
                        name="phone_number"
                        value={formData.phone_number}
                        label="Phone Number (เบอร์โทรศัพท์)"
                        error={!!errors.phone_number}
                        helperText={errors.phone_number}
                        inputProps={{
                          maxLength: 12 // รองรับการจัดรูปแบบ XXX-XXX-XXXX หรือ XX-XXX-XXXX
                        }}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key) || event.key === ' ') {
                            event.preventDefault();
                          }
                        }}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          const numericValue = value.replace(/[^0-9]/g, '');

                          let formattedValue = '';
                          if (numericValue.length === 9) {
                            formattedValue =
                              numericValue
                                .match(/(\d{2})(\d{3})(\d{4})/)
                                ?.slice(1)
                                .join('-') || numericValue;
                          } else if (numericValue.length === 10) {
                            formattedValue =
                              numericValue
                                .match(/(\d{3})(\d{3})(\d{4})/)
                                ?.slice(1)
                                .join('-') || numericValue;
                          } else {
                            formattedValue = numericValue;
                          }

                          // if (numericValue.length < 9) {
                          //   setErrors((prev) => ({ ...prev, [name]: 'กรุณากรอกเบอร์โทรศัพท์อย่างน้อย 9 หลัก' }));
                          // } else if (numericValue.length > 10) {
                          //   setErrors((prev) => ({ ...prev, [name]: 'กรุณากรอกเบอร์โทรศัพท์ไม่เกิน 10 หลัก' }));
                          // } else {
                          //   setErrors((prev) => ({ ...prev, [name]: '' }));
                          // }

                          setFormData((prev) => ({ ...prev, [name]: formattedValue }));
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: errors.phone_number ? 'red' : '#B9B7B7'
                            },
                            '&:hover fieldset': {
                              borderColor: errors.phone_number ? 'red' : '#B9B7B7'
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: errors.phone_number ? 'red' : '#B9B7B7'
                            }
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        {...commonTextFieldProps}
                        name="email"
                        value={formData.email}
                        label="E-mail (อีเมล)"
                        error={!!errors.email}
                        helperText={errors.email}
                        inputProps={{
                          onKeyDown: (event) => {
                            if (event.key === ' ') {
                              event.preventDefault();
                            }
                          }
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: errors.email ? 'red' : '#B9B7B7'
                            }
                          }
                        }}
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
                        error={!!errors.address || (!formData.address.trim() && formData.address !== '')}
                        helperText={errors.address || (!formData.address.trim() && formData.address !== '' ? '' : '')}
                        onChange={(event) => {
                          const inputValue = event.target.value;
                          if (inputValue.trim() !== '' || inputValue === '') {
                            handleChange(event);
                          }
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: errors.address || (!formData.address.trim() && formData.address !== '') ? 'red' : '#B9B7B7'
                            }
                          }
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth variant="outlined" error={!!errors.province}>
                        <InputLabel
                          id="province-label"
                          shrink={true}
                          sx={{
                            color: errors.province ? 'red' : '#000000',
                            fontSize: 16,
                            '&.Mui-focused': { color: 'B9B7B7' },
                            backgroundColor: 'white',
                            padding: '0 5px',
                            marginLeft: '-5px'
                          }}
                        >
                          <span style={{ display: 'flex' }}>Province (จังหวัด)</span>
                        </InputLabel>
                        <Select
                          labelId="province-label"
                          id="province"
                          name="province"
                          value={formData.province}
                          onChange={(e) => {
                            handleChange(e);
                            if (errors.province) {
                              setErrors((prev) => ({ ...prev, province: null }));
                            }
                          }}
                          IconComponent={ExpandMoreIcon}
                          label="Province (จังหวัด)"
                          sx={{
                            '& .MuiSelect-icon': {
                              color: '#B9B7B7'
                            }
                          }}
                        >
                          <MenuItem value="" disabled>
                            <em>เลือกจังหวัด</em>
                          </MenuItem>
                          {provinces.map((province) => (
                            <MenuItem key={province.id} value={province.name_th}>
                              {province.name_th}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.province && <FormHelperText error>{errors.province}</FormHelperText>}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth variant="outlined" error={!!errors.district}>
                        <InputLabel
                          id="District-label"
                          shrink={true}
                          sx={{
                            color: errors.district ? 'red' : '#000000',
                            fontSize: 16,
                            '&.Mui-focused': { color: 'inherit' },
                            backgroundColor: 'white',
                            padding: '0 5px',
                            marginLeft: '-5px'
                          }}
                        >
                          <span style={{ display: 'flex' }}>District (เขต/อำเภอ)</span>
                        </InputLabel>
                        <Select
                          labelId="district-label"
                          id="district"
                          name="district"
                          value={formData.district}
                          onChange={(e) => {
                            handleChange(e);
                            if (errors.district) {
                              setErrors((prev) => ({ ...prev, district: null }));
                            }
                          }}
                          IconComponent={ExpandMoreIcon}
                          label="District (เขต/อำเภอ)"
                          sx={{
                            '& .MuiSelect-icon': {
                              color: '#B9B7B7'
                            }
                          }}
                        >
                          <MenuItem value="" disabled>
                            <em>เลือกเขต/อำเภอ</em>
                          </MenuItem>
                          {amphurs.map((amphur) => (
                            <MenuItem key={amphur.id} value={amphur.name_th}>
                              {amphur.name_th}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.district && <FormHelperText error>{errors.district}</FormHelperText>}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth variant="outlined" error={!!errors.subdistrict}>
                        <InputLabel
                          id="subdistrict-label"
                          shrink={true}
                          sx={{
                            color: errors.subdistrict ? 'red' : '#000000',
                            fontSize: 16,
                            '&.Mui-focused': { color: 'inherit' },
                            backgroundColor: 'white',
                            padding: '0 5px',
                            marginLeft: '-5px'
                          }}
                        >
                          <span style={{ display: 'flex' }}>Subdistrict (แขวง/ตำบล)</span>
                        </InputLabel>
                        <Select
                          labelId="subdistrict-label"
                          id="subdistrict"
                          name="subdistrict"
                          value={formData.subdistrict}
                          onChange={(e) => {
                            handleChange(e);
                            if (errors.subdistrict) {
                              setErrors((prev) => ({ ...prev, subdistrict: null }));
                            }
                          }}
                          IconComponent={ExpandMoreIcon}
                          label="Subdistrict (แขวง/ตำบล)"
                          sx={{
                            '& .MuiSelect-icon': {
                              color: '#B9B7B7'
                            }
                          }}
                        >
                          <MenuItem value="" disabled>
                            <em>เลือกแขวง/ตำบล</em>
                          </MenuItem>
                          {tambons.map((tambon) => (
                            <MenuItem key={tambon.id} value={tambon.name_th}>
                              {tambon.name_th}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.subdistrict && <FormHelperText error>{errors.subdistrict}</FormHelperText>}
                      </FormControl>
                    </Grid>

                    {/* <Grid item xs={12} sm={4}>
                      <TextField
                        {...commonTextFieldProps}
                        name="postcode"
                        value={formData.postcode}
                        label="Post Code (รหัสไปรษณีย์)"
                        error={!!errors.postcode}
                        helperText={errors.postcode}
                        onChange={handleChange}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: errors.postcode ? 'red' : '#B9B7B7'
                            }
                          }
                        }}
                      />
                    </Grid> */}
                    <Grid item xs={12} sm={4}>
                      <TextField
                        {...commonTextFieldProps}
                        name="postcode"
                        value={formData.postcode}
                        label="Post Code (รหัสไปรษณีย์)"
                        error={!!errors.postcode || (formData.postcode && !/^\d{5}$/.test(formData.postcode))}
                        helperText={errors.postcode || (formData.postcode && !/^\d{5}$/.test(formData.postcode) ? '' : '')}
                        onChange={(event) => {
                          const inputValue = event.target.value;
                          if (/^\d{0,5}$/.test(inputValue)) {
                            handleChange(event);
                          }
                        }}
                        onKeyDown={(event) => {
                          if (event.key === ' ') {
                            event.preventDefault();
                          }
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: errors.postcode || (formData.postcode && !/^\d{5}$/.test(formData.postcode)) ? 'red' : '#B9B7B7'
                            }
                          }
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography style={{ width: '100%', height: '100%' }}>
                        <span style={{ color: 'black', fontSize: 16, fontWeight: 700, wordWrap: 'break-word' }}>
                          Education & Licensed Registraion <br /> (ประวัติการศึกษาและใบประกอบวิชาชีพ)
                        </span>
                        <span style={{ color: '#FF0000', fontSize: 16, fontWeight: 700, wordWrap: 'break-word' }}>*</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ width: '100%', height: '2px', backgroundColor: '#0E5F9C' }} />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        {...commonTextFieldProps}
                        name="vet_school"
                        value={formData.vet_school}
                        label="Veterinary School (สถาบัน)"
                        error={!!errors.vet_school || (formData.vet_school && formData.vet_school.trim() === '')}
                        helperText={errors.vet_school || (formData.vet_school && formData.vet_school.trim() === '' ? '' : '')}
                        onChange={(event) => {
                          const { name, value } = event.target;
                          setFormData((prev) => ({ ...prev, [name]: value }));
                          setErrors((prev) => ({ ...prev, [name]: '' }));
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor:
                                errors.vet_school || (formData.vet_school && formData.vet_school.trim() === '') ? 'red' : '#B9B7B7'
                            }
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        {...commonTextFieldProps}
                        name="country"
                        value={formData.country}
                        label="Country (ประเทศ)"
                        error={!!errors.country || (formData.country && formData.country.trim() === '')}
                        helperText={errors.country || (formData.country && formData.country.trim() === '' ? '' : '')}
                        onChange={(event) => {
                          const { name, value } = event.target;
                          setFormData((prev) => ({ ...prev, [name]: value }));
                          setErrors((prev) => ({ ...prev, [name]: '' }));
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: errors.country || (formData.country && formData.country.trim() === '') ? 'red' : '#B9B7B7'
                            }
                          }
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        {...commonTextFieldProps}
                        name="year_of_graduation"
                        value={formData.year_of_graduation}
                        label="Year of Graduation (ปีที่จบ)"
                        error={!!errors.year_of_graduation}
                        helperText={errors.year_of_graduation}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          const numericValue = value.replace(/[^0-9]/g, '');
                          const yearRegex = /^\d{0,4}$/;

                          if (!yearRegex.test(numericValue)) {
                            setErrors((prev) => ({ ...prev, [name]: 'กรุณากรอกตัวเลข 4 หลักเท่านั้น' }));
                          } else {
                            setErrors((prev) => ({ ...prev, [name]: '' }));
                          }

                          setFormData((prev) => ({ ...prev, [name]: numericValue }));
                        }}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        onKeyDown={(event) => {
                          if (event.key === ' ') {
                            event.preventDefault();
                          }
                        }}
                        inputProps={{
                          maxLength: 4
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: errors.year_of_graduation ? 'red' : '#B9B7B7'
                            }
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography style={{ width: '100%', height: '100%' }}>
                        <span style={{ color: 'black', fontSize: 16, fontWeight: 700, wordWrap: 'break-word' }}>
                          Copy of Identification Card or Passport <br />
                          สำเนาเอกสารแนบบัตรประชาชน/บัตรราชการ/หนังสือเดินทาง
                        </span>
                        <span style={{ color: '#FF0000', fontSize: 16, fontWeight: 700, wordWrap: 'break-word' }}>*</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ width: '100%', height: '2px', backgroundColor: '#0E5F9C' }} />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth variant="outlined" error={!!errors.expiration_passport}>
                        <InputLabel
                          shrink
                          sx={{
                            backgroundColor: 'white',
                            padding: '0 4px',
                            color: errors.expiration_passport ? 'red' : '#000000',
                            '&.Mui-focused': { color: 'inherit' }
                          }}
                        >
                          Expiration (วันหมดอายุ)
                        </InputLabel>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            value={formData.expiration_passport}
                            onChange={(newValue) => {
                              handleDateChange('expiration_passport', newValue);
                              if (errors.expiration_passport) {
                                setErrors((prev) => ({ ...prev, expiration_passport: null }));
                              }
                            }}
                            format="dd/MM/yyyy"
                            minDate={new Date()}
                            slotProps={{
                              textField: {
                                fullWidth: true,
                                variant: 'outlined',
                                error: !!errors.expiration_passport,
                                helperText: errors.expiration_passport,
                                InputLabelProps: { shrink: true },
                                inputProps: { readOnly: true },
                                sx: {
                                  '& input::placeholder': {
                                    color: '#737373'
                                  },
                                  '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                      borderColor: submissionAttempted && !formData.expiration_passport ? 'red' : '#B9B7B7' // ปรับสีกรอบเป็น #B9B7B7
                                    },
                                    '&:hover fieldset': {
                                      borderColor: submissionAttempted && !formData.expiration_passport ? 'red' : '#B9B7B7' // ปรับสีกรอบเป็น #B9B7B7
                                    },
                                    '&.Mui-focused fieldset': {
                                      borderColor: submissionAttempted && !formData.expiration_passport ? 'red' : '#B9B7B7' // ปรับสีกรอบเป็น #B9B7B7
                                    }
                                  }
                                }
                              }
                            }}
                          />
                        </LocalizationProvider>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Box
                        sx={{
                          margin: 'auto',
                          border: (theme) => (isSubmitted && !fileNameCard ? `1px solid ${theme.palette.error.main}` : 'none'),
                          borderRadius: 2
                        }}
                        ref={dropRef}
                        onDragEnter={handleDragIn}
                        onDragLeave={handleDragOut}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                      >
                        <input
                          type="file"
                          ref={fileInputRefCard}
                          onChange={(e) => handleFileChangeCard(e.target.files[0])}
                          style={{ display: 'none' }}
                          accept=".jpg,.png,.pdf"
                        />
                        <Paper
                          elevation={0}
                          onClick={handleClickCard}
                          sx={{
                            backgroundColor: backgroundColor,
                            padding: 1,
                            borderRadius: 2,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            height: '100%'
                          }}
                        >
                          <Box sx={{ textAlign: 'center' }}>
                            <CloudUploadIcon sx={{ fontSize: 38, color: '#05255B', mb: 0.5 }} />
                            <Typography variant="body1" gutterBottom>
                              {isDragActive ? 'Drag file to upload' : 'Drag file here or click to upload'}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              รองรับไฟล์ jpg, png, pdf, ขนาดไม่เกิน 5 mb
                            </Typography>
                          </Box>
                        </Paper>
                        {fileNameCard && (
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              mt: 2,
                              p: 1,
                              backgroundColor: '#F5F5F5',
                              borderRadius: 1
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {getFileIcon(fileNameCard)}
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                {fileNameCard}
                              </Typography>
                            </Box>
                            <DeleteIcon onClick={handleDeleteCard} sx={{ cursor: 'pointer', color: 'gray' }} />
                          </Box>
                        )}
                      </Box>
                      {errors.fileCard && (
                        <Typography color="error" variant="body2" sx={{ textAlign: 'left', mt: 1 }}>
                          {errors.fileCard}
                        </Typography>
                      )}
                    </Grid>

                    <Grid item xs={12}>
                      <Typography style={{ width: '100%', height: '100%' }}>
                        <span style={{ color: 'black', fontSize: 16, fontWeight: 700, wordWrap: 'break-word' }}>
                          Photo <br />
                          (รูปถ่าย)
                        </span>
                        <span style={{ color: '#FF0000', fontSize: 16, fontWeight: 700, wordWrap: 'break-word' }}>*</span>
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Box sx={{ width: '100%', height: '2px', backgroundColor: '#0E5F9C' }} />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <Box
                        sx={{
                          margin: 'auto',
                          border: (theme) => (isSubmitted && !fileNamePhoto ? `1px solid ${theme.palette.error.main}` : 'none'),
                          borderRadius: 2
                        }}
                        ref={dropRefPhoto}
                        onDragEnter={handleDragInPhoto}
                        onDragLeave={handleDragOutPhoto}
                        onDragOver={handleDragPhoto}
                        onDrop={handleDropPhoto}
                      >
                        <input
                          type="file"
                          ref={fileInputRefPhoto}
                          onChange={(e) => handleFileChangePhoto(e.target.files[0])}
                          style={{ display: 'none' }}
                          accept="image/*"
                        />
                        <Paper
                          elevation={0}
                          onClick={handleClickPhoto}
                          sx={{
                            backgroundColor: backgroundColorPhoto,
                            padding: 1,
                            borderRadius: 2,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            height: '100%'
                          }}
                        >
                          <Box sx={{ textAlign: 'center' }}>
                            <CloudUploadIcon sx={{ fontSize: 38, color: '#05255B', mb: 0.5 }} />
                            <Typography variant="body1" gutterBottom>
                              {isDragActivePhoto ? 'Drag file to upload' : 'Drag file here or click to upload'}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              รองรับไฟล์ jpg, png, jpeg ขนาดไม่เกิน 5 mb
                            </Typography>
                          </Box>
                        </Paper>
                        {fileNamePhoto && (
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              mt: 2,
                              p: 1,
                              backgroundColor: '#F5F5F5',
                              borderRadius: 1
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {getFileIcon(fileNamePhoto)}
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                {fileNamePhoto}
                              </Typography>
                            </Box>
                            <DeleteIcon onClick={handleDeletePhoto} sx={{ cursor: 'pointer', color: 'gray' }} />
                          </Box>
                        )}
                      </Box>
                      {errors.filePhoto && (
                        <Typography color="error" variant="body2" sx={{ textAlign: 'left', mt: 1 }}>
                          {errors.filePhoto}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <Typography style={{ width: '100%', height: '100%' }}>
                        <span style={{ color: 'black', fontSize: 16, fontWeight: 700, wordWrap: 'break-word' }}>
                          Veterinary License <br />
                          ใบอนุญาตเป็นผู้ประกอบวิชาชีพสัตวแพทย์
                        </span>
                        <span style={{ color: '#FF0000', fontSize: 16, fontWeight: 700, wordWrap: 'break-word' }}>*</span>
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Box sx={{ width: '100%', height: '2px', backgroundColor: '#0E5F9C' }} />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <TextField
                        {...commonTextFieldProps}
                        name="practitioner"
                        value={formData.practitioner}
                        label="Veterinary Practitioner (เลขที่ใบประกอบวิชาชีพ)"
                        error={!!errors.practitioner || (formData.practitioner && formData.practitioner.trim() === '')}
                        helperText={errors.practitioner || (formData.practitioner && formData.practitioner.trim() === '')}
                        onChange={(event) => {
                          const { name, value } = event.target;
                          setFormData((prev) => ({ ...prev, [name]: value }));
                          setErrors((prev) => ({ ...prev, [name]: '' }));
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor:
                                errors.practitioner || (formData.practitioner && formData.practitioner.trim() === '') ? 'red' : '#B9B7B7'
                            }
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth variant="outlined" error={!!errors.expiration_practitioner}>
                        <InputLabel
                          shrink
                          sx={{
                            backgroundColor: 'white',
                            padding: '0 4px',
                            color: errors.expiration_practitioner ? 'red' : '#000000',
                            '&.Mui-focused': { color: 'inherit' }
                          }}
                        >
                          Expiration (วันหมดอายุ)
                        </InputLabel>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            value={formData.expiration_practitioner}
                            onChange={(newValue) => {
                              handleDateChange('expiration_practitioner', newValue);
                              if (errors.expiration_practitioner) {
                                setErrors((prev) => ({ ...prev, expiration_practitioner: null }));
                              }
                            }}
                            format="dd/MM/yyyy"
                            minDate={new Date()}
                            slotProps={{
                              textField: {
                                fullWidth: true,
                                variant: 'outlined',
                                error: !!errors.expiration_practitioner,
                                helperText: errors.expiration_practitioner,
                                InputLabelProps: { shrink: true },
                                inputProps: { readOnly: true },
                                sx: {
                                  '& input::placeholder': {
                                    color: '#737373'
                                  },
                                  '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                      borderColor: submissionAttempted && !formData.expiration_practitioner ? 'red' : 'rgba(0, 0, 0, 0.23)'
                                    },
                                    '&:hover fieldset': {
                                      borderColor: submissionAttempted && !formData.expiration_practitioner ? 'red' : 'rgba(0, 0, 0, 0.23)'
                                    },
                                    '&.Mui-focused fieldset': {
                                      borderColor: submissionAttempted && !formData.expiration_practitioner ? 'red' : '#1976d2'
                                    }
                                  }
                                }
                              }
                            }}
                          />
                        </LocalizationProvider>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <Box
                        sx={{
                          margin: 'auto',
                          border: (theme) => (isSubmitted && !fileNameLicense ? `1px solid ${theme.palette.error.main}` : 'none'),
                          borderRadius: 2
                        }}
                        ref={dropRefLicense}
                        onDragEnter={handleDragInLicense}
                        onDragLeave={handleDragOutLicense}
                        onDragOver={handleDragLicense}
                        onDrop={handleDropLicense}
                      >
                        <input
                          type="file"
                          ref={fileInputRefLicense}
                          onChange={(e) => handleFileChangeLicense(e.target.files[0])}
                          style={{ display: 'none' }}
                          accept=".jpg,.png,.pdf"
                        />
                        <Paper
                          elevation={0}
                          onClick={handleClickLicense}
                          sx={{
                            backgroundColor: backgroundColorLicense,
                            padding: 1,
                            borderRadius: 2,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            height: '100%'
                          }}
                        >
                          <Box sx={{ textAlign: 'center' }}>
                            <CloudUploadIcon sx={{ fontSize: 38, color: '#05255B', mb: 0.5 }} />
                            <Typography variant="body1" gutterBottom>
                              {isDragActiveLicense ? 'Drag file to upload' : 'Drag file here or click to upload'}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              รองรับไฟล์ jpg, png, pdf, ขนาดไม่เกิน 5 mb
                            </Typography>
                          </Box>
                        </Paper>
                        {fileNameLicense && (
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              mt: 2,
                              p: 1,
                              backgroundColor: '#F5F5F5',
                              borderRadius: 1
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {getFileIcon(fileNameLicense)}
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                {fileNameLicense}
                              </Typography>
                            </Box>
                            <DeleteIcon onClick={handleDeleteLicense} sx={{ cursor: 'pointer', color: 'gray' }} />
                          </Box>
                        )}
                      </Box>
                      {errors.fileLicense && (
                        <Typography color="error" variant="body2" sx={{ textAlign: 'left', mt: 1 }}>
                          {errors.fileLicense}
                        </Typography>
                      )}
                    </Grid>

                    <Grid item xs={12} sm={12} mt={6}>
                      <Box display="flex" alignItems="flex-start">
                        <Checkbox
                          checked={agreed}
                          onChange={handleAgreeChange}
                          sx={{
                            mt: -0.7,
                            '&.Mui-error': {
                              color: 'error.main'
                            },
                            '&.Mui-error .MuiSvgIcon-root': {
                              color: 'error.main'
                            }
                          }}
                          className={isSubmitted && !agreed ? 'Mui-error' : ''}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2">
                            I agree to TEF Membership Terms and Conditions, to view the full terms and conditions{' '}
                            <a href="#" style={{ color: 'blue', textDecoration: 'underline' }}>
                              click here
                            </a>
                            . TEF will do spot checks to verify the details declared are correct.
                            <br />
                            ฉันยอมรับตามข้อกำหนดและเงื่อนไขสมาชิก TEF ดูรายละเอียดเพิ่มเติม
                            <a href="#" style={{ color: 'blue', textDecoration: 'underline' }}>
                              คลิกที่นี่
                            </a>
                            <br />
                            ทางสมาคมกีฬาขี่ม้าแห่งประเทศไทยจะดำเนินการตรวจสอบข้อมูลเพื่อยืนยันความถูกต้องของข้อมูลที่ได้รับ
                          </Typography>
                          {errors.agreed && (
                            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                              {errors.agreed}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                      <Box sx={{ display: 'flex', gap: 2, width: '100%', maxWidth: '300px' }}>
                        <Button
                          variant="outlined"
                          fullWidth
                          onClick={handleBackToHome}
                          // color="secondary"
                          sx={{
                            minWidth: '120px',
                            color: '#0E2130', // Ensure the color is correctly formatted as a string
                            borderColor: '#0E2130',
                            '&:hover': {
                              borderColor: '#0E2130'
                            }
                          }}
                        >
                          BACK
                        </Button>

                        <Button
                          variant="contained"
                          color="secondary"
                          type="submit"
                          fullWidth
                          sx={{ minWidth: '120px', backgroundColor: '#0E2130' }}
                        >
                          SUBMIT
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>

            <Dialog
              open={isSuccessDialogOpen}
              onClose={handleSuccessDialogClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent sx={{ textAlign: 'center', p: 4 }}>
                <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'green', mb: 2 }} />
                <Typography id="alert-dialog-title" variant="h6" component="h2" gutterBottom sx={{ fontSize: 16, color: 'green' }}>
                  Your submission has been successfully delivered to our team.
                </Typography>
                <Typography id="alert-dialog-description" sx={{ fontSize: 16, color: 'green', mb: 2 }}>
                  We will keep you updated via the email provided in your registration form.
                </Typography>
                <Button
                  onClick={handleSuccessDialogClose}
                  variant="contained"
                  sx={{ mt: 2, mb: 4, backgroundColor: '#0E2130', '&:hover': { backgroundColor: '#0E2130' }, minWidth: '120px' }}
                >
                  OK
                </Button>
              </DialogContent>
            </Dialog>

            <Typography variant="body2" sx={{ textAlign: 'center', mt: 12, color: 'text.secondary' }}>
              © 2024 Thailand Equestrian Federation. Digitilized by T.logical Resolution.
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'center', mt: 6, color: 'text.secondary' }}></Typography>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Tef;
