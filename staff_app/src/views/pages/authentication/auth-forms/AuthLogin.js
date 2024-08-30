import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  useMediaQuery,
  Link,
  Alert
} from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AnimateButton from 'ui-component/extended/AnimateButton';

import { login_officer } from '../../../../component/function/auth';

import { styled } from '@mui/material/styles';
import { useAuth } from '../../../../contexts/AuthContext';

const AuthLogin = ({ ...others }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const { checkAuth } = useAuth();

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
          email: '',
          password: ''
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').required('Email is required'),
          password: Yup.string().required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          setErrorMessage('');
          setAttemptedSubmit(true);
          try {
            const response = await login_officer(values);
            if (response.data && response.data.token) {
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('refreshToken', response.data.refreshToken);
              localStorage.setItem('email', response.data.user.email);
              localStorage.setItem('userId', response.data.user.id);
              localStorage.setItem('username', response.data.user.username);
              localStorage.setItem('name', response.data.user.name);
              localStorage.setItem('userTypeId', response.data.user.type_id);

              console.log('localStorage after setting items:', {
                token: localStorage.getItem('token'),
                refreshToken: localStorage.getItem('refreshToken'),
                email: localStorage.getItem('email'),
                userId: localStorage.getItem('userId'),
                username: localStorage.getItem('username'),
                name: localStorage.getItem('name'),
                userTypeId: localStorage.getItem('userTypeId')
              });

              setStatus({ success: true });
              setSubmitting(false);
              await checkAuth();
              navigate('/request/veterinarian');
            }
          } catch (err) {
            console.error('Login error:', err);
            setStatus({ success: false });
            if (err.response) {
              if (err.response.status === 400) {
                setErrorMessage('Invalid credentials. Please check your email and password.');
              } else if (err.response.status === 403) {
                setErrorMessage('Your account is not active. Please contact support.');
              } else {
                setErrorMessage(err.response.data.message || 'An error occurred during login.');
              }
            } else {
              setErrorMessage('Unable to connect to the server. Please try again later.');
            }
            setSubmitting(false);
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('email');
            localStorage.removeItem('userId');
            localStorage.removeItem('userTypeId');
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <TextField
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  setAttemptedSubmit(false);
                }}
                label={
                  <>
                    E-mail<RedAsterisk>*</RedAsterisk>
                  </>
                }
                placeholder="Email"
                InputProps={{
                  startAdornment: <InputAdornment position="start"></InputAdornment>
                }}
                error={attemptedSubmit && Boolean(errors.email)}
                helperText={attemptedSubmit && errors.email}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: attemptedSubmit && Boolean(errors.email) ? 'red' : 'inherit'
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
              <Link href="/forgot" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
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