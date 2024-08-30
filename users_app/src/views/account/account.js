import React, { useState, useEffect } from 'react';
import {
  Typography,
  TextField,
  Grid,
  Box,
  Paper,
  Button,
  Checkbox,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Avatar,
  Stack,
  CircularProgress
} from '@mui/material';

import { get_vet_by_id, updatePassword } from '../../../src/component/function/auth';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { InputAdornment, SvgIcon } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CloseIcon from '@mui/icons-material/Close';
import { createPortal } from 'react-dom';

const ViewVeterinarian = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id: urlId } = useParams();
  const navigate = useNavigate();

  const [viewerFile, setViewerFile] = useState(null);
  const [showViewer, setShowViewer] = useState(false);
  const IMAGE_BASE_URL = process.env.REACT_APP_API_URL_IMG?.replace(/\/$/, '');

  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  

  const userId = localStorage.getItem('user_id');
  console.log('User ID:', userId);
  
  useEffect(() => {
    if (userId) {
      fetchVeterinarianData(userId);
    } else {
      setError('No veterinarian ID provided');
      setLoading(false);
    }
  }, [userId]);

  const fetchVeterinarianData = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://student.crru.ac.th/651463014/API/user_id.php?user_id=${userId}`);
      console.log('Raw API Response:', response.data);
  
      // แยกส่วน JSON จากการตอบกลับ
      const jsonStartIndex = response.data.indexOf('{');
      const jsonData = JSON.parse(response.data.slice(jsonStartIndex));
  
      console.log('Parsed JSON data:', jsonData);
  
      if (jsonData && jsonData.success) {
        setFormData(jsonData.user);
      } else {
        throw new Error(jsonData.message || 'Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError(error.message || 'Failed to fetch user data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };



  // const getStatusButtonProps = (status) => {
  //   switch (status) {
  //     case 'Active':
  //       return { text: 'Active', color: '#52C41A' };
  //     case 'Expiring Soon':
  //       return { text: 'Expiring Soon', color: '#FFA500' };
  //     case 'Inactive':
  //       return { text: 'Inactive', color: '#FF0000' };
  //     default:
  //       return { text: 'Unknown', color: '#9E9E9E' };
  //   }
  // };

  // console.log(formData.check_renew);

  // const handleStatusButtonClick = () => {
  //   if (formData.status_renew === 'Expiring Soon' || formData.status_renew === 'Inactive') {
  //     navigate('/account/renew');
  //   }
  // };
  const getStatusButtonProps = (status) => {
    switch (status) {
      case 'Active':
        return { text: 'Active', color: '#52C41A' };
      case 'Expiring Soon':
        return { text: 'Expiring Soon', color: '#FFA500' };
      case 'Inactive':
        return { text: 'Inactive', color: '#FF0000' };
      default:
        return { text: 'Unknown', color: '#9E9E9E' };
    }
  };
  
  console.log(formData.check_renew);
  
  const handleStatusButtonClick = () => {
    if ((formData.status_renew === 'Expiring Soon' || formData.status_renew === 'Inactive') && 
        formData.check_renew === '0') {
      navigate('/account/renew');
    } else if ((formData.status_renew === 'Expiring Soon' || formData.status_renew === 'Inactive') && 
               formData.check_renew === '1') {
      console.log('ไม่สามารถดำเนินการได้เนื่องจาก check_renew เป็น 1');
    }
  };


  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleChangePassword = async () => {
    setPasswordErrors({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });

    let hasError = false;

    if (!passwordData.oldPassword) {
      setPasswordErrors((prev) => ({ ...prev, oldPassword: 'Old password is required' }));
      hasError = true;
    }

    if (!passwordData.newPassword) {
      setPasswordErrors((prev) => ({ ...prev, newPassword: 'New password is required' }));
      hasError = true;
    } else if (passwordData.newPassword.length < 8) {
      setPasswordErrors((prev) => ({ ...prev, newPassword: 'Password must be at least 8 characters long' }));
      hasError = true;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordErrors((prev) => ({ ...prev, confirmPassword: "New passwords don't match" }));
      hasError = true;
    }

    if (hasError) return;

    try {
      setChangePasswordLoading(true);
      const vet_id = localStorage.getItem('username');
      await updatePassword(passwordData.oldPassword, passwordData.newPassword, vet_id);
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setOpenSuccessDialog(true);
    } catch (error) {
      setPasswordErrors((prev) => ({ ...prev, oldPassword: 'Failed to change password: ' + error.message }));
    } finally {
      setChangePasswordLoading(false);
    }
  };

  const commonTextFieldProps = {
    fullWidth: true,
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

  const openViewer = (file) => {
    const fullUrl = `${IMAGE_BASE_URL}/${file.filepath}`;
    setViewerFile({
      url: fullUrl,
      type: file.type
    });
    setShowViewer(true);
  };

  const closeViewer = () => {
    setShowViewer(false);
    setViewerFile(null);
  };

  const getFileIcon = (fileName) => {
    if (!fileName || fileName === 'ไม่พบไฟล์') {
      return <InsertDriveFileIcon />;
    }
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf':
        return (
          <SvgIcon sx={{ color: 'red', fontSize: 40 }}>
            <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z" />
          </SvgIcon>
        );
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return (
          <SvgIcon sx={{ color: '#A5CEF9', fontSize: 45 }}>
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
          </SvgIcon>
        );
      case 'doc':
      case 'docx':
        return (
          <SvgIcon sx={{ color: 'blue' }}>
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
          </SvgIcon>
        );
      default:
        return <InsertDriveFileIcon />;
    }
  };

  const ImageViewer = ({ src, alt, onClose }) => {
    return createPortal(
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <img src={src} alt={alt} style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} />
        <IconButton onClick={onClose} style={{ position: 'absolute', top: 10, right: 10, color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </div>,
      document.body
    );
  };

  const PdfViewer = ({ src, onClose }) => {
    return createPortal(
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <embed src={src} type="application/pdf" width="90%" height="90%" />
        <IconButton onClick={onClose} style={{ position: 'absolute', top: 10, right: 10, color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </div>,
      document.body
    );
  };


  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }
  return (
    <Paper elevation={0}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'flex-start',
          px: { xs: 2, sm: 3, md: 4 },
          maxWidth: '100%',
          mx: 'auto'
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            marginRight: { xs: 0, sm: 2, md: 3 },
            px: { xs: 1, sm: 2, md: 3 },
            pt: { xs: 2, sm: 3, md: 4 }
          }}
        >
          <Avatar
            src={`${IMAGE_BASE_URL}/${formData.photo?.filepath}`}
            alt="Profile"
            sx={{
              width: { xs: 150, md: 200 },
              height: { xs: 150, md: 200 },
              mb: { xs: 2, md: 0 }
            }}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            width: '100%',
            mt: { xs: 2, sm: 3, md: 4 },
            mr: { xs: 0, sm: 2, md: 3 }
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: 14, sm: 16 } }}>
                  Personal Information (ข้อมูลส่วนตัว)<span style={{ color: '#FF0000' }}>*</span>
                </Typography>
                {formData.status_renew && (
                  <Button
                  variant="contained"
                  onClick={handleStatusButtonClick}
                  sx={{
                    width: { xs: '100%', sm: 'auto' },
                    minWidth: '150px',
                    height: '40px',
                    fontSize: { xs: '14px', sm: '16px' },
                    padding: '8px 20px',
                    backgroundColor: getStatusButtonProps(formData.status_renew).color,
                    color: 'white',
                    '&:hover': {
                      backgroundColor: getStatusButtonProps(formData.status_renew).color,
                      opacity: 0.9
                    }
                  }}
                >
                  {getStatusButtonProps(formData.status_renew).text}
                </Button>
                )}
              </Stack>
            </Grid>

            {/* ฟอร์มข้อมูลส่วนตัว */}
            <Grid item xs={12} mt={4}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    {...commonTextFieldProps}
                    disabled
                    name="first_name_th"
                    value={formData?.first_name || ''}
                    label="First Name (ชื่อภาษาไทย)"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    {...commonTextFieldProps}
                    disabled
                    name="last_name_th"
                    value={formData.last_name || ''}
                    label="Last Name (นามสกุลภาษาไทย)"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    {...commonTextFieldProps}
                    disabled
                    name="vet_id"
                    value={formData.vet_id || 'The ID will be shown after approval.'}
                    label="VET. ID (เลขประจำตัวสัตวแพทย์)"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    {...commonTextFieldProps}
                    disabled
                    name="first_name_en"
                    value={formData.first_name_en || ''}
                    label="First Name (ชื่อภาษาอังกฤษ)"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    {...commonTextFieldProps}
                    disabled
                    name="last_name_en"
                    value={formData.last_name_en || ''}
                    label="Last Name (นามสกุลภาษาอังกฤษ)"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    {...commonTextFieldProps}
                    name="date_of_birth"
                    disabled
                    value={formData.date_of_birth || ''}
                    label="Date of Birth (วันเกิด)"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField {...commonTextFieldProps} disabled name="gender" value={formData.gender || ''} label="Gender (เพศ)" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    {...commonTextFieldProps}
                    disabled
                    name="phone_number"
                    value={formData.phone_number || ''}
                    label="Phone Number (เบอร์โทรศัพท์)"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField {...commonTextFieldProps} disabled name="email" value={formData.email || ''} label="E-mail (อีเมล)" />
                </Grid>
                <Grid item xs={12}>
                  <TextField {...commonTextFieldProps} disabled name="address" value={formData.address || ''} label="Address (ที่อยู่)" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    {...commonTextFieldProps}
                    disabled
                    name="province"
                    value={formData.province || ''}
                    label="Province (จังหวัด)"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField {...commonTextFieldProps} disabled name="district" value={formData.district || ''} label="District (เขต)" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    {...commonTextFieldProps}
                    disabled
                    name="postcode"
                    value={formData.postcode || ''}
                    label="Post Code (รหัสไปรษณีย์)"
                  />
                </Grid>

                <Grid item xs={12} mt={2}>
                  <Typography style={{ width: '100%', height: '100%' }}>
                    <span style={{ color: 'black', fontSize: 16, fontFamily: 'Sarabun', fontWeight: 700, wordWrap: 'break-word' }}>
                      Education & Licensed Registraion <br /> (ประวัติการศึกษาและใบประกอบวิชาชีพ)
                    </span>
                    <span style={{ color: '#FF0000', fontSize: 16, fontFamily: 'Sarabun', fontWeight: 700, wordWrap: 'break-word' }}>
                      *
                    </span>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ width: '100%', height: '2px', backgroundColor: '#0E5F9C' }} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    {...commonTextFieldProps}
                    disabled
                    name="vet_school"
                    value={formData.vet_school || ''}
                    label="Veterinary School (สถาบัน)"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField {...commonTextFieldProps} disabled name="country" value={formData.country || ''} label="Country (ประเทศ)" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    {...commonTextFieldProps}
                    disabled
                    name="year_of_graduation"
                    value={formData.year_of_graduation || ''}
                    label="Year of Graduation (ปีที่จบ)"
                  />
                </Grid>

                <Grid item xs={12} mt={2}>
                  <Typography style={{ width: '100%', height: '100%' }}>
                    <span style={{ color: 'black', fontSize: 16, fontFamily: 'Sarabun', fontWeight: 700, wordWrap: 'break-word' }}>
                      Copy of Identification Card or Passport <br />
                      สำเนาเอกสารแนบบัตรประชาชน/บัตรราชการ/หนังสือเดินทาง
                    </span>
                    <span style={{ color: '#FF0000', fontSize: 16, fontFamily: 'Sarabun', fontWeight: 700, wordWrap: 'break-word' }}>
                      *
                    </span>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ width: '100%', height: '2px', backgroundColor: '#0E5F9C' }} />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    {...commonTextFieldProps}
                    disabled
                    name="expiration_passport"
                    value={formData.expiration_passport || ''}
                    label="Expiration (วันหมดอายุ)"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)'
                      }
                    }}
                    onClick={() => {
                      if (formData.passport?.filepath) {
                        const fileExtension = formData.passport.filename.split('.').pop().toLowerCase();
                        openViewer({
                          filepath: formData.passport.filepath,
                          type: fileExtension
                        });
                      }
                    }}
                  >
                    <InputAdornment position="start" sx={{ marginRight: '8px' }}>
                      {formData.passport?.filename ? getFileIcon(formData.passport.filename) : <InsertDriveFileIcon />}
                    </InputAdornment>
                    <Typography
                      sx={{
                        fontSize: '16px',
                        flexGrow: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {formData.passport?.filename || 'ไม่พบไฟล์'}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} mt={2}>
                  <Typography style={{ width: '100%', height: '100%' }}>
                    <span style={{ color: 'black', fontSize: 16, fontFamily: 'Sarabun', fontWeight: 700, wordWrap: 'break-word' }}>
                      Photo <br />
                      (รูปถ่าย)
                    </span>
                    <span style={{ color: '#FF0000', fontSize: 16, fontFamily: 'Sarabun', fontWeight: 700, wordWrap: 'break-word' }}>
                      *
                    </span>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ width: '100%', height: '2px', backgroundColor: '#0E5F9C' }} />
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)'
                      }
                    }}
                    onClick={() => {
                      if (formData.photo?.filepath) {
                        const fileExtension = formData.photo.filename.split('.').pop().toLowerCase();
                        openViewer({
                          filepath: formData.photo.filepath,
                          type: fileExtension
                        });
                      }
                    }}
                  >
                    <InputAdornment position="start" sx={{ marginRight: '8px' }}>
                      {formData.photo?.filename ? getFileIcon(formData.photo.filename) : <InsertDriveFileIcon />}
                    </InputAdornment>
                    <Typography
                      sx={{
                        fontSize: '16px',
                        flexGrow: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {formData.photo?.filename || 'ไม่พบไฟล์'}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} mt={2}>
                  <Typography style={{ width: '100%', height: '100%' }}>
                    <span style={{ color: 'black', fontSize: 16, fontFamily: 'Sarabun', fontWeight: 700, wordWrap: 'break-word' }}>
                      Veterinary License <br />
                      ใบอนุญาตเป็นผู้ประกอบวิชาชีพสัตวแพทย์
                    </span>
                    <span style={{ color: '#FF0000', fontSize: 16, fontFamily: 'Sarabun', fontWeight: 700, wordWrap: 'break-word' }}>
                      *
                    </span>
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ width: '100%', height: '2px', backgroundColor: '#0E5F9C' }} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...commonTextFieldProps}
                    disabled
                    name="practitioner"
                    value={formData.practitioner || ''}
                    label="Veterinary Practitioner (เลขที่ใบประกอบวิชาชีพ)"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...commonTextFieldProps}
                    disabled
                    name="expiration_practitioner"
                    value={formData.expiration_practitioner || ''}
                    label="Expiration (วันหมดอายุ)"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)'
                      }
                    }}
                    onClick={() => {
                      if (formData.license?.filepath) {
                        const fileExtension = formData.license.filename.split('.').pop().toLowerCase();
                        openViewer({
                          filepath: formData.license.filepath,
                          type: fileExtension
                        });
                      }
                    }}
                  >
                    <InputAdornment position="start" sx={{ marginRight: '8px' }}>
                      {formData.license?.filename ? getFileIcon(formData.license.filename) : <InsertDriveFileIcon />}
                    </InputAdornment>
                    <Typography
                      sx={{
                        fontSize: '16px',
                        flexGrow: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {formData.license?.filename || 'ไม่พบไฟล์'}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" alignItems="flex-start">
                    <Checkbox checked={true} disabled sx={{ mt: -0.7 }} />
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
                  </Box>
                </Grid>

                <Grid item xs={12} mt={2}>
                  <Typography sx={{ fontSize: 14 }}>
                    Change email address เปลี่ยนรหัสผ่าน <span style={{ color: '#FF0000' }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ width: '100%', height: '2px', backgroundColor: '#0E5F9C' }} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} mt={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', maxWidth: 600, width: '80%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 600, width: '100%' }}>
                  <Box>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      Old Password
                    </Typography>
                    <TextField
                      fullWidth
                      // type="password"
                      type="text"
                      variant="outlined"
                      name="oldPassword"
                      value={passwordData.oldPassword}
                      onChange={handlePasswordChange}
                      error={!!passwordErrors.oldPassword}
                      helperText={passwordErrors.oldPassword}
                    />
                  </Box>
                  <Box>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      New Password
                    </Typography>
                    <TextField
                      fullWidth
                      // type="password"
                      type="text"
                      variant="outlined"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      error={!!passwordErrors.newPassword}
                      helperText={passwordErrors.newPassword}
                    />
                  </Box>
                  <Box>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      Re-enter Password
                    </Typography>
                    <TextField
                      fullWidth
                      // type="password"
                      type="text"
                      variant="outlined"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      error={!!passwordErrors.confirmPassword}
                      helperText={passwordErrors.confirmPassword}
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sx={{ mt: 5, mb: 5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  onClick={handleChangePassword}
                  disabled={changePasswordLoading}
                  sx={{
                    width: '180px',
                    height: '40px',
                    color: '#FFFFFF',
                    backgroundColor: '#0E5F9C',
                    '&:hover': {
                      backgroundColor: '#0E5F9C'
                    },
                    textTransform: 'none',
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {changePasswordLoading ? <CircularProgress size={24} color="inherit" /> : 'Change Password'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Dialog
        open={openSuccessDialog}
        onClose={() => setOpenSuccessDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            borderRadius: '10px',
            padding: '20px',
            width: '600px'
          }
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            fontSize: '16px',
            color: '#003366',
            fontWeight: 'bold',
            paddingBottom: 0
          }}
        >
          <Grid container>
            <Grid item xs={12} textAlign="left">
              Password Changed Successfully
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ width: '100%', height: '2px', backgroundColor: '#0E5F9C', marginTop: '10px' }} />
            </Grid>
          </Grid>
        </DialogTitle>

        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              color: '#003366',
              marginTop: '22px',
              marginBottom: '24px',
              textAlign: 'center',
              fontSize: '16px'
            }}
          >
            Your password has been successfully updated.
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', paddingBottom: '20px' }}>
          <Button
            onClick={() => setOpenSuccessDialog(false)}
            variant="contained"
            sx={{
              backgroundColor: '#003366',
              color: 'white',
              padding: '10px 30px',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#002244'
              }
            }}
          >
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
      {/* Viewer component */}
      {showViewer &&
        (viewerFile.type === 'pdf' ? (
          <PdfViewer src={viewerFile.url} onClose={closeViewer} />
        ) : (
          <ImageViewer src={viewerFile.url} alt="File Preview" onClose={closeViewer} />
        ))}
    </Paper>
  );
};

export default ViewVeterinarian;
