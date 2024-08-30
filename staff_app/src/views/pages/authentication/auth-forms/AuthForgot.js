import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, Grid, TextField, Typography, useMediaQuery, Alert } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { styled } from '@mui/material/styles';

import { sendResetPasswordEmail } from 'component/function/auth';

const ForgotPassword = ({ ...others }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  const [errorMessage, setErrorMessage] = useState('');

  const RedAsterisk = styled('span')({
    color: 'red'
  });

  const handleSubmit = async (values) => {
    try {
      await sendResetPasswordEmail(values.email);
      navigate('/forgot/message');
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1">
              Please enter the email address associated with your account and We will email you a link to reset your password.
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
          email: ''
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <TextField
                id="outlined-adornment-email-forgot"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label={
                  <span>
                    Email Address<RedAsterisk>*</RedAsterisk>
                  </span>
                }
                placeholder="Enter your email"
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                InputLabelProps={{
                  shrink: true
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: touched.email && errors.email ? 'red' : 'inherit'
                    }
                  },
                  '& .MuiInputLabel-shrink': {
                    transform: 'translate(14px, -6px) scale(0.75)',
                    backgroundColor: 'white',
                    padding: '0 4px'
                  }
                }}
              />
            </FormControl>

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: '#0E2130',
                    '&:hover': {
                      backgroundColor: '#0E2130'
                    }
                  }}
                >
                  FORGOT PASSWORD
                </Button>
              </AnimateButton>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Button
                fullWidth
                size="large"
                variant="outlined"
                sx={{
                  backgroundColor: '#FFFFFF',
                  color: '#0E2130',
                  borderColor: '#0E2130',
                  '&:hover': {
                    backgroundColor: '#FFFFFF',
                    color: '#0E5F9C',
                    borderColor: '#0E5F9C'
                  }
                }}
                onClick={() => navigate('/')}
              >
                BACK TO LOGIN
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ForgotPassword;