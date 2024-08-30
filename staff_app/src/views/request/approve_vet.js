import React, { useState, useEffect } from 'react';
import {
  Typography,
  TextField,
  Grid,
  Box,
  Paper,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@mui/material';

import { get_vet_by_id, updateVetInfoAndSendEmail, update_Deny_SendEmail } from '../../../src/component/function/auth';

import { useParams, useNavigate } from 'react-router-dom';
import { InputAdornment, SvgIcon } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CloseIcon from '@mui/icons-material/Close';
import { createPortal } from 'react-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ViewVeterinarian = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id: urlId } = useParams();
  const navigate = useNavigate();

  const [viewerFile, setViewerFile] = useState(null);
  const [showViewer, setShowViewer] = useState(false);
  const IMAGE_BASE_URL = process.env.REACT_APP_API_URL_IMG?.replace(/\/$/, '') || 'http://localhost:3301';
  //  const IMAGE_BASE_URL = process.env.REACT_APP_API_URL_IMG || 'http://localhost:3301/';

  const [openDialog, setOpenDialog] = useState(false);

  const id = localStorage.getItem('selectedVetId') || urlId;

  useEffect(() => {
    if (id) {
      fetchVeterinarianData();
    } else {
      setError('No veterinarian ID provided');
      setLoading(false);
    }
  }, [id]);

  const fetchVeterinarianData = async () => {
    try {
      setLoading(true);
      const response = await get_vet_by_id(id);
      setFormData(response.data);

      // console.log('Full response data:', response.data);
      // console.log('Passport filepath:', response.data?.passport?.filepath);
      // console.log('Photo filepath:', response.data?.photo?.filepath);
      // console.log('License filepath:', response.data?.license?.filepath);
    } catch (error) {
      console.error('Error fetching veterinarian data:', error);
      setError('Failed to fetch veterinarian data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-veterinarian/${id}`);
  };

  const handleBack = () => {
    navigate(-1);
    localStorage.removeItem('selectedVetId');
  };

  // const commonTextFieldProps = {
  //   fullWidth: true,
  //   variant: 'outlined',
  //   InputProps: {
  //     readOnly: true
  //   },
  //   sx: {
  //     '& .MuiOutlinedInput-root': {
  //       '& fieldset': {
  //         borderColor: '#B9B7B7'
  //       }
  //     }
  //   }
  // };
  const commonTextFieldProps = {
    fullWidth: true,
    //onChange: handleChange,
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
    console.log('Opening viewer with URL:', fullUrl);
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

  const handleCloseDialog = () => {
    setOpenDialog(false);
    handleBack();
  };
  useEffect(() => {
    if (id) {
      fetchVeterinarianData();
    } else {
      setError('No veterinarian ID provided');
      setLoading(false);
    }
  }, [id, urlId]);

  // const handleApprove = async () => {
  //   try {
  //     const vetId = localStorage.getItem('selectedVetId') || formData._id;
  //     console.log('Approving vet with ID:', vetId);

  //     if (!vetId) {
  //       throw new Error('No veterinarian ID found for update');
  //     }

  //     if (!formData.email || !formData.first_name_en || !formData.last_name_en) {
  //       throw new Error('Missing required veterinarian information');
  //     }

  //     const approvalData = {
  //       id: vetId,
  //       email: formData.email,
  //       username: formData.first_name_en + ' ' + formData.last_name_en,
  //       applicationDate: new Date().toISOString().split('T')[0]
  //     };

  //     const response = await updateVetInfoAndSendEmail(approvalData);
  //     console.log('Veterinarian info updated and email sent:', response);

  //     // แสดงข้อความสำเร็จ
  //     setOpenDialog(true);
  //   } catch (error) {
  //     console.error('Error in approval process:', error);
  //     alert(`An error occurred during the approval process: ${error.message}`);
  //   }
  // };
  const [openDenyDialog, setOpenDenyDialog] = useState(false);
  const [denyReason, setDenyReason] = useState('');
  const handleDeny = () => {
    setOpenDenyDialog(true);
  };

  const handleCloseDenyDialog = () => {
    setOpenDenyDialog(false);
    setDenyReason('');
    setDenyReasonError(false);
  };

  const [denyReasonError, setDenyReasonError] = useState(false);
  const handleSubmitDeny = async () => {
    if (!denyReason.trim()) {
      setDenyReasonError(true);
      return;
    }
    try {
      const denyData = {
        id: formData._id,
        email: formData.email,
        username: `${formData.first_name_en} ${formData.last_name_en}`,
        vet_reason: denyReason
      };

      const response = await update_Deny_SendEmail(denyData);
      console.log('Veterinarian info updated and denial email sent:', response);

      handleCloseDenyDialog();
      handleBack;
    } catch (error) {
      console.error('Error in denial process:', error);
      //alert(`An error occurred during the denial process: ${error.message}`);
    }
  };

  const handleApprove = async () => {
    try {
      const vetId = localStorage.getItem('selectedVetId') || formData._id;
      console.log('กำลังอนุมัติสัตวแพทย์ ID:', vetId);

      if (!vetId) {
        throw new Error('ไม่พบ ID สัตวแพทย์สำหรับการอัปเดต');
      }

      if (!formData.email || !formData.first_name_en || !formData.last_name_en) {
        throw new Error('ข้อมูลสัตวแพทย์ที่จำเป็นไม่ครบถ้วน');
      }

      const approvalData = {
        id: vetId,
        email: formData.email,
        username: formData.first_name_en + ' ' + formData.last_name_en,
        applicationDate: new Date().toISOString().split('T')[0]
      };

      // แสดงไดอะล็อกสำเร็จทันที
      setOpenDialog(true);

      // ทำงานหลังบ้านแบบ asynchronous
      updateVetInfoAndSendEmail(approvalData)
        .then((response) => {
          console.log('อัปเดตข้อมูลสัตวแพทย์และส่งอีเมลสำเร็จ:', response);
          // คุณสามารถเพิ่มตรรกะเพิ่มเติมตรงนี้ถ้าจำเป็น
        })
        .catch((error) => {
          console.error('เกิดข้อผิดพลาดในกระบวนการอนุมัติ:', error);
          // จัดการข้อผิดพลาด อาจแสดงข้อความแจ้งเตือนให้ผู้ใช้
          //alert(`เกิดข้อผิดพลาดระหว่างกระบวนการอนุมัติ: ${error.message}`);
          // อาจต้องปิดไดอะล็อกหรือแสดงข้อความผิดพลาดในไดอะล็อก
          //setOpenDialog(false);
        });
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในกระบวนการอนุมัติ:', error);
      //alert(`เกิดข้อผิดพลาดระหว่างกระบวนการอนุมัติ: ${error.message}`);
    }
  };

  return (
    <Paper elevation={0}>
      <Grid item xs={12} mb={4} sx={{ pl: 3, pt: 4 }}>
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
      <Grid container mt={6} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item xs={10}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography style={{ width: '100%', height: '100%' }}>
                <span style={{ color: 'black', fontSize: 16, fontFamily: 'Sarabun', fontWeight: 700, wordWrap: 'break-word' }}>
                  Personal Information <br />
                  (ข้อมูลส่วนตัว)
                </span>
                <span style={{ color: '#FF0000', fontSize: 16, fontFamily: 'Sarabun', fontWeight: 700, wordWrap: 'break-word' }}>*</span>
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ width: '100%', height: '2px', backgroundColor: '#0E5F9C' }} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                {...commonTextFieldProps}
                disabled
                name="first_name_th"
                value={formData?.first_name_th || ''}
                label="First Name (ชื่อภาษาไทย)"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                {...commonTextFieldProps}
                disabled
                name="last_name_th"
                value={formData.last_name_th || ''}
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
              <TextField {...commonTextFieldProps} disabled name="province" value={formData.province || ''} label="Province (จังหวัด)" />
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

            <Grid item xs={12}>
              <Typography style={{ width: '100%', height: '100%' }}>
                <span style={{ color: 'black', fontSize: 16, fontFamily: 'Sarabun', fontWeight: 700, wordWrap: 'break-word' }}>
                  Education & Licensed Registraion <br /> (ประวัติการศึกษาและใบประกอบวิชาชีพ)
                </span>
                <span style={{ color: '#FF0000', fontSize: 16, fontFamily: 'Sarabun', fontWeight: 700, wordWrap: 'break-word' }}>*</span>
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

            <Grid item xs={12}>
              <Typography style={{ width: '100%', height: '100%' }}>
                <span style={{ color: 'black', fontSize: 16, fontFamily: 'Sarabun', fontWeight: 700, wordWrap: 'break-word' }}>
                  Copy of Identification Card or Passport <br />
                  สำเนาเอกสารแนบบัตรประชาชน/บัตรราชการ/หนังสือเดินทาง
                </span>
                <span style={{ color: '#FF0000', fontSize: 16, fontFamily: 'Sarabun', fontWeight: 700, wordWrap: 'break-word' }}>*</span>
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

            <Grid item xs={12}>
              <Typography style={{ width: '100%', height: '100%' }}>
                <span style={{ color: 'black', fontSize: 16, fontFamily: 'Sarabun', fontWeight: 700, wordWrap: 'break-word' }}>
                  Photo <br />
                  (รูปถ่าย)
                </span>
                <span style={{ color: '#FF0000', fontSize: 16, fontFamily: 'Sarabun', fontWeight: 700, wordWrap: 'break-word' }}>*</span>
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

            <Grid item xs={12}>
              <Typography style={{ width: '100%', height: '100%' }}>
                <span style={{ color: 'black', fontSize: 16, fontFamily: 'Sarabun', fontWeight: 700, wordWrap: 'break-word' }}>
                  Veterinary License <br />
                  ใบอนุญาตเป็นผู้ประกอบวิชาชีพสัตวแพทย์
                </span>
                <span style={{ color: '#FF0000', fontSize: 16, fontFamily: 'Sarabun', fontWeight: 700, wordWrap: 'break-word' }}>*</span>
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
            <Grid item xs={12} sx={{ mt: 5, mb: 5, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="outlined" onClick={handleBack} sx={{ flex: 1, maxWidth: 120, color: '#0E5F9C', borderColor: '#0E5F9C' }}>
                BACK
              </Button>
              <Button variant="outlined" onClick={handleApprove} sx={{ flex: 1, maxWidth: 120, color: '#0E5F9C', borderColor: '#0E5F9C' }}>
                APPROVE
              </Button>
              <Button variant="outlined" onClick={handleDeny} sx={{ flex: 1, maxWidth: 120, color: '#0E5F9C', borderColor: '#0E5F9C' }}>
                DENY
              </Button>
            </Grid>
            {/* <Grid item xs={12} sx={{ mt: 5, mb: 5, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="outlined" onClick={handleBack} sx={{ flex: 1, maxWidth: 120, color: '#1976d2', borderColor: '#1976d2' }}>
                BACK
              </Button>
              <Button variant="outlined" onClick={handleApprove} sx={{ flex: 1, maxWidth: 120, color: '#1976d2', borderColor: '#1976d2' }}>
                APPROVE
              </Button>
              <Button variant="outlined" onClick={handleDeny} sx={{ flex: 1, maxWidth: 120, color: '#1976d2', borderColor: '#1976d2' }}>
                DENY
              </Button>
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>

      {/* <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent sx={{ textAlign: 'center', width: '100%',}}>
          <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'green', mb: 2 }} />
          <Typography id="alert-dialog-title" variant="h6" component="h2" gutterBottom sx={{ fontSize: 16, color: 'green' }}>
            Submission Successfully
          </Typography>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            sx={{
              mt: 2,
              mb: 4,
              backgroundColor: '#1976d2',
              '&:hover': { backgroundColor: '#115293' },
              minWidth: '120px'
            }}
          >
            OK
          </Button>
        </DialogContent>
      </Dialog> */}
      <Dialog
        fullScreen
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none'
          }
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)' // เพิ่มพื้นหลังทึบแสงเล็กน้อย
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '400px', // ปรับขนาดตามต้องการ
              padding: '32px',
              background: 'white',
              borderRadius: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'green', mb: 2 }} />
            <Typography
              id="alert-dialog-title"
              variant="h6"
              component="h2"
              gutterBottom
              sx={{ fontSize: 16, color: 'green', textAlign: 'center' }}
            >
              Submission Successfully
            </Typography>
            <Button
              onClick={handleCloseDialog}
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: '#0E5F9C',
                '&:hover': { backgroundColor: '#115293' },
                minWidth: '120px'
              }}
            >
              OK
            </Button>
          </div>
        </div>
      </Dialog>

      <Dialog
        fullScreen
        open={openDenyDialog}
        onClose={handleCloseDenyDialog}
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none'
          }
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '550px', // เพิ่มความกว้างสูงสุด
              minHeight: '350px', // กำหนดความสูงขั้นต่ำ
              padding: '32px',
              background: 'white',
              borderRadius: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch' // เปลี่ยนเป็น stretch เพื่อให้เนื้อหาขยายเต็มพื้นที่
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: 16,
                color: '#05255B',
                mb: 1,
                fontWeight: 'bold',
                lineHeight: 1.5,
                width: '100%',
                maxWidth: '500px' // ปรับความกว้างให้เหมาะสม
              }}
            >
              Please use the space below to provide additional details or clarification regarding the reason for denial of your application.
            </Typography>
            <TextField
              multiline
              rows={6}
              fullWidth
              variant="outlined"
              value={denyReason}
              onChange={(e) => {
                setDenyReason(e.target.value);
                setDenyReasonError(false); // รีเซ็ตสถานะข้อผิดพลาดเมื่อมีการพิมพ์
              }}
              placeholder="Enter the reason for denial here..."
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: denyReasonError ? 'red' : 'initial'
                  },
                  '&:hover fieldset': {
                    borderColor: denyReasonError ? 'red' : 'initial'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: denyReasonError ? 'red' : 'initial'
                  }
                }
              }}
              error={denyReasonError}
              helperText={denyReasonError ? 'Please provide a valid reason for denial' : ''}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, gap: 1 }}>
              <Button
                onClick={handleCloseDenyDialog}
                variant="outlined"
                sx={{
                  minWidth: '120px',
                  color: '#0E5F9C',
                  borderColor: '#0E5F9C'
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitDeny}
                variant="contained"
                // disabled={!denyReason.trim()}
                sx={{
                  minWidth: '120px',
                  backgroundColor: '#0E5F9C',
                  '&:hover': { backgroundColor: '#0E5F9C' },
                  '&.Mui-disabled': {
                    backgroundColor: '#cccccc',
                    color: '#666666'
                  }
                }}
              >
                OK
              </Button>
            </Box>
          </div>
        </div>
      </Dialog>

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
