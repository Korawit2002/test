import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, Grid, TextField, Typography, useMediaQuery, Alert } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { styled } from '@mui/material/styles';
import { sendResetPasswordEmail } from 'component/function/auth'; // Import the function

const ForgotExpired = ({ ...others }) => {
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
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography gutterBottom fontWeight="bold" fontSize="16px">
              Your link has expired.
            </Typography>
            <Typography fontSize="16px">
              Please re-enter your email address to confirm your identity once again.
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
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          setErrorMessage('');
          setAttemptedSubmit(true);
          try {
            await sendResetPasswordEmail(values.email);
            setStatus({ success: true });
            setSubmitting(false);
            navigate('/forgot/message');
          } catch (err) {
            console.error('Password reset error:', err);
            setStatus({ success: false });
            setErrorMessage(err.message || 'An error occurred. Please try again.');
            setSubmitting(false);
          }
        }}
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
                onChange={(e) => {
                  handleChange(e);
                  setAttemptedSubmit(false);
                }}
                label={
                  <span>
                    Email Address<RedAsterisk>*</RedAsterisk>
                  </span>
                }
                placeholder="Enter your email"
                error={attemptedSubmit && Boolean(errors.email)}
                helperText={attemptedSubmit && errors.email}
                InputLabelProps={{
                  shrink: true
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: attemptedSubmit && Boolean(errors.email) ? 'red' : 'inherit'
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
                    backgroundColor: '#0E5F9C',
                    '&:hover': {
                      backgroundColor: '#0b4f82'
                    }
                  }}
                  onClick={() => setAttemptedSubmit(true)}
                >
                  OK
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ForgotExpired;