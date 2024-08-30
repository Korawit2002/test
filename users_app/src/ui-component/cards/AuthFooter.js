// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="center">
   
    <Typography variant="subtitle2" component={Link} href="https://tlogical.com" target="_blank"  underline="hover" >
    &copy; 2024 Thailand Equestrian Federation.  Digitilized by T.logical Resolution.
    </Typography>
  </Stack>
);

export default AuthFooter;
