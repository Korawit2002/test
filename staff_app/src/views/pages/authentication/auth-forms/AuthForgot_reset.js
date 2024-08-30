import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, Grid, TextField, Typography, useMediaQuery } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { validateResetToken, resetPassword } from 'component/function/auth';

const Reset = ({ ...others }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  const [isTokenValid, setIsTokenValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const checkToken = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      const expiry = params.get('expiry');

      if (!token || !expiry) {
        navigate('/forgot/expired');
        return;
      }

      try {
        const response = await validateResetToken(token, expiry);
        if (response.isValid) {
          setIsTokenValid(true);
        } else {
          navigate('/forgot/expired');
        }
      } catch (error) {
        console.error('Error validating token:', error);
        navigate('/forgot/expired');
      }
    };

    checkToken();
  }, [navigate, location]);

  if (!isTokenValid) {
    return <Typography>Validating reset token...</Typography>;
  }

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Reset Password
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          newPassword: '',
          confirmPassword: ''
        }}
        validationSchema={Yup.object().shape({
          newPassword: Yup.string().max(255).required('New password is required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Confirm password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const params = new URLSearchParams(location.search);
            const token = params.get('token');
            await resetPassword(token, values.newPassword);
            setStatus({ success: true });
            setSubmitting(false);
            navigate('/', { state: { message: 'Password reset successful. Please login with your new password.' } });
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
            {errorMessage && (
              <Typography color="error" sx={{ mb: 2 }}>
                {errorMessage}
              </Typography>
            )}

            <FormControl fullWidth sx={{ mb: 3 }}>
              <TextField
                id="new-password-reset"
                type="password"
                value={values.newPassword}
                name="newPassword"
                onBlur={handleBlur}
                onChange={handleChange}
                label="New Password"
                placeholder="Enter new password"
                error={Boolean(touched.newPassword && errors.newPassword)}
                helperText={touched.newPassword && errors.newPassword}
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <TextField
                id="confirm-password-reset"
                type="password"
                value={values.confirmPassword}
                name="confirmPassword"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Confirm Password"
                placeholder="Confirm new password"
                error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
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
                  color="primary"
                >
                  Reset Password
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Reset;