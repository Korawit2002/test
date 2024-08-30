import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, Grid, TextField, Typography, useMediaQuery, Alert } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { styled } from '@mui/material/styles';

const Forgotmessage = ({ ...others }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  const [errorMessage, setErrorMessage] = useState('');
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const RedAsterisk = styled('span')({
    color: 'red'
  });

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1">Please check your email for a message from us.</Typography>
            <Typography variant="body1">It contains a link to reset your password. Thank you.</Typography>
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
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          setErrorMessage('');
          setAttemptedSubmit(true);
          try {
            // Here you would typically call an API to handle password reset
            console.log('Password reset requested for:', values.email);
            setStatus({ success: true });
            setSubmitting(false);
            // Navigate to a confirmation page or show a success message
          } catch (err) {
            console.error('Password reset error:', err);
            setStatus({ success: false });
            setErrorMessage('An error occurred. Please try again.');
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            {/* Removed email input field */}

            <Box sx={{ mt: 2 }}>
              <Button
                fullWidth
                size="large"
                variant="contained"
                sx={{
                  backgroundColor: '#0E2130',
                  color: '#FFFFFF'
                }}
                onClick={() => navigate('/')}
              >
                BACK
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Forgotmessage;
