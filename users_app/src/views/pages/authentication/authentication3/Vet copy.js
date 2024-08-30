import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//api จะอยู่ใน /Users/tlo07/Desktop/TEF/users_app/src/component/function/auth.js
import { getProvince, getAmpur, getTambon, getZipcode } from '../../../../component/function/auth';
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

  const [errors, setErrors] = useState({});

  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // นำทางกลับไปยังหน้าแรก (root path)
  const handleBackToHome = () => {
    navigate('/');
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
  const fileInputRefPhoto = useRef(null);
  const [fileNamePhoto, setFileNamePhoto] = useState('');
  const fileInputRefLicense = useRef(null);

  const handleClickPhoto = () => fileInputRefPhoto.current.click();

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

  let backgroundColorLicense = '#EAF0F6';
  if (isDragActiveLicense) {
    backgroundColorLicense = '#D0E0F0';
  }

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
                    Room reservation registration form
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ color: '#FFFFFF' }}>
                    แบบฟอร์มลงทะเบียนจองห้องพัก
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
                          ข้อมูลส่วนตัว (Personal Information)
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
                        label="ชื่อ(First name)"
                        error={!!errors.first_name_th}
                        helperText={errors.first_name_th}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          const validRegex = /^[ก-ฮะ-์a-zA-Z]+$/;

                          if (value.trim() === '') {
                            setErrors((prev) => ({ ...prev, [name]: 'กรอกข้อมูล' }));
                          } else if (!validRegex.test(value)) {
                            setErrors((prev) => ({ ...prev, [name]: 'ต้องเป็นตัวอักศร ก-ฮ หรือ A-Z' }));
                          } else {
                            setErrors((prev) => ({ ...prev, [name]: '' }));
                          }

                          setFormData((prev) => ({ ...prev, [name]: value }));
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: errors.first_name_th ? 'red' : '#B9B7B7',
                            },
                            '&:hover fieldset': {
                              borderColor: errors.first_name_th ? 'red' : '#B9B7B7',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: errors.first_name_th ? 'red' : '#B9B7B7',
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        {...commonTextFieldProps}
                        name="last_name_th"
                        value={formData.last_name_th}
                        label="นามสกุล(Last name)"
                        error={!!errors.last_name_th}
                        helperText={errors.last_name_th}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          const validRegex = /^[ก-ฮะ-์a-zA-Z]+$/;

                          if (value === '') {
                            setErrors((prev) => ({ ...prev, [name]: 'กรอกข้อมูล' }));
                          } else if (!validRegex.test(value)) {
                            setErrors((prev) => ({ ...prev, [name]: 'ต้องเป็นตัวอักศร ก-ฮ หรือ A-Z' }));
                          } else {
                            setErrors((prev) => ({ ...prev, [name]: '' }));
                          }

                          setFormData((prev) => ({ ...prev, [name]: value }));
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: errors.last_name_th ? 'red' : '#B9B7B7',
                            },
                            '&:hover fieldset': {
                              borderColor: errors.last_name_th ? 'red' : '#B9B7B7',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: errors.last_name_th ? 'red' : '#B9B7B7',
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        {...commonTextFieldProps}
                        name="nick_name_th"
                        value={formData.nick_name_th}
                        label="ชื่อเล่น(Nick Name)"
                        error={!!errors.nick_name_th}
                        helperText={errors.nick_name_th}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          const validRegex = /^[ก-ฮะ-์a-zA-Z]+$/;

                          if (value.trim() === '') {
                            setErrors((prev) => ({ ...prev, [name]: 'กรอกข้อมูล' }));
                          } else if (!validRegex.test(value)) {
                            setErrors((prev) => ({ ...prev, [name]: 'ต้องเป็นตัวอักศร ก-ฮ หรือ A-Z' }));
                          } else {
                            setErrors((prev) => ({ ...prev, [name]: '' }));
                          }

                          setFormData((prev) => ({ ...prev, [name]: value }));
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: errors.nick_name_th ? 'red' : '#B9B7B7',
                            },
                            '&:hover fieldset': {
                              borderColor: errors.nick_name_th ? 'red' : '#B9B7B7',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: errors.nick_name_th ? 'red' : '#B9B7B7',
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        {...commonTextFieldProps}
                        name="username"
                        value={formData.username}
                        label="ชื่อผู้ใช้(Username)"
                        error={!!errors.username}
                        helperText={errors.username}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          // ปรับ regex เพื่อให้รองรับเฉพาะภาษาอังกฤษและตัวเลข
                          const validRegex = /^[a-zA-Z0-9]+$/;

                          if (value.trim() === '') {
                            setErrors((prev) => ({ ...prev, [name]: 'กรอกข้อมูล' }));
                          } else if (!validRegex.test(value)) {
                            setErrors((prev) => ({ ...prev, [name]: 'กรุณากรอกภาษาอังกฤษหรือตัวเลขเท่านั้น' }));
                          } else {
                            setErrors((prev) => ({ ...prev, [name]: '' }));
                          }

                          setFormData((prev) => ({ ...prev, [name]: value }));
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: errors.username ? 'red' : '#B9B7B7',
                            },
                            '&:hover fieldset': {
                              borderColor: errors.username ? 'red' : '#B9B7B7',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: errors.username ? 'red' : '#B9B7B7',
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        {...commonTextFieldProps}
                        name="password"
                        value={formData.password}
                        label="รหัสผ่าน (Password)"
                        type="password" // เพิ่ม type="password" เพื่อแสดงเป็น ***
                        error={!!errors.password}
                        helperText={errors.password}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          const validRegex = /^[a-zA-Z0-9]+$/;

                          if (value.trim() === '') {
                            setErrors((prev) => ({ ...prev, [name]: 'กรอกข้อมูล' }));
                          } else if (!validRegex.test(value)) {
                            setErrors((prev) => ({ ...prev, [name]: 'กรุณากรอกภาษาอังกฤษหรือตัวเลขเท่านั้น' }));
                          } else {
                            setErrors((prev) => ({ ...prev, [name]: '' }));
                          }

                          setFormData((prev) => ({ ...prev, [name]: value }));
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: errors.password ? 'red' : '#B9B7B7',
                            },
                            '&:hover fieldset': {
                              borderColor: errors.password ? 'red' : '#B9B7B7',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: errors.password ? 'red' : '#B9B7B7',
                            },
                          },
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
                          วันเกิด (Date of Birth)
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
                          <span style={{ display: 'flex' }}>เพศ (Gender)</span>
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

                    <Grid item xs={12} sm={4}>
                      <TextField
                        {...commonTextFieldProps}
                        name="phone_number"
                        value={formData.phone_number}
                        label="เบอร์โทรศัพท์ (Phone Number)"
                        error={!!errors.phone_number || !!errors.tooManyDigits}
                        helperText={
                          errors.phone_number ||
                          (errors.tooManyDigits ? 'กรอกตัวเลขเกิน' : '')
                        }
                        inputProps={{
                          maxLength: 12, // รองรับการจัดรูปแบบ XXX-XXX-XXXX หรือ XX-XXX-XXXX
                        }}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          const numericValue = value.replace(/[^0-9]/g, '');

                          let formattedValue = '';
                          if (numericValue.length === 9) {
                            formattedValue = numericValue
                              .match(/(\d{2})(\d{3})(\d{4})/)
                              ?.slice(1)
                              .join('-') || numericValue;
                          } else if (numericValue.length === 10) {
                            formattedValue = numericValue
                              .match(/(\d{3})(\d{3})(\d{4})/)
                              ?.slice(1)
                              .join('-') || numericValue;
                          } else {
                            formattedValue = numericValue;
                          }

                          setFormData((prev) => ({ ...prev, [name]: formattedValue }));

                          setErrors((prev) => ({ ...prev, invalidInput: false, tooManyDigits: false }));

                          if (value !== numericValue) {
                            setErrors((prev) => ({ ...prev, invalidInput: true }));
                          } else if (numericValue.length > 10) {
                            setErrors((prev) => ({ ...prev, tooManyDigits: true }));
                          }
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor:
                                errors.phone_number || errors.tooManyDigits ? 'red' : '#B9B7B7',
                            },
                            '&:hover fieldset': {
                              borderColor:
                                errors.phone_number || errors.tooManyDigits ? 'red' : '#B9B7B7',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor:
                                errors.phone_number || errors.tooManyDigits ? 'red' : '#B9B7B7',
                            },
                          },
                        }}
                      />
                    </Grid>





                    <Grid item xs={12} sm={4}>
                      <TextField
                        {...commonTextFieldProps}
                        name="email"
                        value={formData.email}
                        label=" อีเมล(E-mail)"
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
                        label="ที่อยู่ (Address)"
                        multiline
                        rows={1}
                        error={!!errors.address}
                        helperText={errors.address}
                        onChange={handleChange}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: errors.address ? 'red' : '#B9B7B7'
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
                          <span style={{ display: 'flex' }}>จังหวัด(Province)</span>
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
                      <Box sx={{ width: '100%', height: '2px', backgroundColor: '#0E5F9C' }} />
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
