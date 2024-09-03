import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  Link,
  Alert
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const AuthLogin = ({ ...others }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const RedAsterisk = styled('span')({
    color: 'red'
  });

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12} container>
          <Box sx={{ mb: 4 }}>

            <Typography variant="subtitle1">
              {/* <Typography variant="subtitle1">หากคุณยังไม่เป็นสามาชิกสามารถ</Typography> */}
              หากคุณยังไม่เป็นสมาชิกสามารถ
              <Link href="/register/vet/" color="primary">
                สมัครสมาชิก
              </Link>{' '}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {errorMessage && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            backgroundColor: '#FF0000',
            color: '#FFFFFF',
            '& .MuiAlert-icon': {
              color: '#FFFFFF'
            }
          }}
        >
          {errorMessage}
        </Alert>
      )}

      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required('Identification is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          setErrorMessage('');
          setAttemptedSubmit(true);
          try {
            const API_URL = 'https://student.crru.ac.th/651463014/api/login.php';
            const formData = new FormData();
            formData.append('username', values.username);
            formData.append('password', values.password);
        
            // ส่งคำร้องขอ
            const response = await axios.post(API_URL, formData, { timeout: 10000 });
            console.log('Login response:', response.data);
        
            // ตรวจสอบว่า response.data เป็นสตริงที่ขึ้นต้นด้วย 'succeed'
            let jsonData;
            if (typeof response.data === 'string' && response.data.startsWith('succeed')) {
                // ตัด 'succeed' ออกและแปลงเป็น JSON
                const jsonString = response.data.substring(7);
                try {
                    jsonData = JSON.parse(jsonString);
                } catch (parseError) {
                    console.error('JSON parsing error:', parseError);
                    throw new Error('Invalid data format received from server');
                }
            } else {
                throw new Error('Invalid response format');
            }
        
            console.log("jsonData", jsonData);
        
            // ตรวจสอบสถานะการเข้าสู่ระบบ
            if (jsonData?.message === "Login successful") {
                setStatus({ success: true });
        
                // ตรวจสอบว่า jsonData.user มีค่า
                if (jsonData.user) {
                    // เก็บข้อมูลผู้ใช้ใน localStorage
                    localStorage.setItem('user_id', jsonData.user.user_id ?? '');
                    localStorage.setItem('username', jsonData.user.username ?? '');
                    localStorage.setItem('role', jsonData.user.role ?? '');
        
                    // นำทางตามบทบาทของผู้ใช้
                    if (jsonData.user.role === 'admin') {
                        navigate('/account');
                    } else {
                        navigate('/account');
                    }
                } else {
                    setStatus({ success: false });
                    setErrorMessage('User data is missing in the response.');
                }
            } else {
                setStatus({ success: false });
                setErrorMessage(jsonData?.message || 'Invalid credentials.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setStatus({ success: false });
            setErrorMessage('An error occurred during login. Please try again.');
        } finally {
            setSubmitting(false);
        }          
        }}     
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <TextField
                id="outlined-adornment-username-login"
                type="text"
                value={values.username}
                name="username"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  setAttemptedSubmit(false);
                }}
                label={
                  <>
                    username<RedAsterisk>*</RedAsterisk>
                  </>
                }
                placeholder="username *"
                InputProps={{
                  startAdornment: <InputAdornment position="start"></InputAdornment>
                }}
                error={attemptedSubmit && Boolean(errors.username)}
                helperText={attemptedSubmit && errors.username}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: attemptedSubmit && Boolean(errors.username) ? 'red' : 'inherit'
                    }
                  }
                }}
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <TextField
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  setAttemptedSubmit(false);
                }}
                label={
                  <>
                    Password <RedAsterisk>*</RedAsterisk>
                  </>
                }
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
                placeholder="Password *"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                error={attemptedSubmit && Boolean(errors.password)}
                helperText={attemptedSubmit && errors.password}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: attemptedSubmit && Boolean(errors.password) ? 'red' : 'inherit'
                    }
                  }
                }}
              />
            </FormControl>

            <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1}>
              <Link href="/forgot " color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                Forgot Password?
              </Link>
            </Stack>

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  onClick={() => setAttemptedSubmit(true)}
                  sx={{
                    backgroundColor: '#0E2130',
                    '&:hover': {
                      backgroundColor: '#0E2130'
                    }
                  }}
                >
                  SIGN IN
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;