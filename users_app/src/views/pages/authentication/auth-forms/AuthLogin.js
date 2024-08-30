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
            const formData = new FormData();
            formData.append('username', values.username);
            formData.append('password', values.password);
        
            const response = await axios.post('https://student.crru.ac.th/651463014/api/login.php', formData);
            console.log('Login response:', response.data);
        
            // แยกส่วน JSON จากการตอบกลับ
            const jsonStartIndex = response.data.indexOf('{');
            const jsonData = JSON.parse(response.data.slice(jsonStartIndex));
        
            if (jsonData && jsonData.message === "Login successful") {
              setStatus({ success: true });
              // เก็บข้อมูลผู้ใช้ใน localStorage
              localStorage.setItem('user_id', jsonData.user.user_id);
              localStorage.setItem('username', jsonData.user.username);
              // ถ้าคุณใช้ react-router สำหรับการนำทาง คุณสามารถใช้บรรทัดนี้
              navigate('/account');
            } else {
              setStatus({ success: false });
              setErrorMessage(jsonData.message || 'Invalid credentials.');
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