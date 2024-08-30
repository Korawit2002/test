import { Link } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery, Box, Avatar } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthForgot_reset from '../auth-forms/AuthForgot_reset';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';
import logoImage from 'assets/images/LOGO.jpg';
import logoImageT from 'assets/images/Tlogical_Logo_White.png';
import User1 from 'assets/images/users/user-round.svg';
// assets

// ================================|| AUTH3 - forgot_reset ||================================ //

const forgot_reset = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AuthWrapper1>
      <Grid container sx={{ width: '100vw', height: '100vh', position: 'relative' }}>
        <Grid container spacing={0} justifyContent="center">
          <Grid item xs={12} sm={12} md={7} lg={7} sx={{ background: '#0E5F9C', position: 'relative' }}>
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <Avatar
                alt="Main Logo"
                src={logoImage}
                sx={{
                  width: 322,
                  height: 319,
                  flexShrink: 0
                }}
              />
            </Box>
            {!matchDownSM && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 20,
                  left: 20,
                  display: 'flex',
                  alignItems: 'center',
                  '@media (max-width: 900px)': {
                    display: 'none'
                  }
                }}
              >
                <Typography
                  variant="caption"
                  mr={2}
                  mt={1.6}
                  sx={{
                    color: 'white',
                    fontSize: '16px',
                    opacity: 0.7
                  }}
                >
                  © 2024 Digital Transformation by
                </Typography>
                <a href="https://www.tlogical.com" target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}>
                  <img
                    src={logoImageT}
                    alt="T.LOGICAL Logo"
                    style={{
                      width: 'auto',
                      height: '30px'
                    }}
                  />
                </a>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={5} sx={{ background: '#FFFFFF' }}>
            <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
              <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                <AuthCardWrapper>
                  <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={12}>
                      <Grid container direction={matchDownSM ? 'column-reverse' : 'row'}>
                        <Grid item sx={{ mb: 2 }}>
                          <Stack spacing={1}>{/* <Typography variant="h4">Forgot your password?</Typography> */}</Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <AuthForgot_reset />
                    </Grid>
                  </Grid>
                </AuthCardWrapper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default forgot_reset;
