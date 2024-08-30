import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';

import { Box, Button, FormControl, Grid, InputLabel, Typography, useMediaQuery, Select, MenuItem } from '@mui/material';

const FirebaseRegister = ({ ...others }) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);
  const navigate = useNavigate();
  const [registrationType, setRegistrationType] = useState('');
  const [error, setError] = useState(false);

  const handleChangeRegistration = (event) => {
    const selectedValue = event.target.value;
    setRegistrationType(selectedValue);
    setError(false);
  };

  const handleNext = () => {
    if (!registrationType) {
      setError(true);
      return;
    }

    let path = '';
    switch (registrationType) {
      case 'I am a club owner.':
        path = '/register/#/';
        break;
      case 'I am an athlete/ a coach. (only Thai citizen)':
        path = '/register/#/';
        // path = '/register/tef/';
        break;
      case 'I am a veterinarian.':
        path = '/register/vet/';
        break;
      default:
        return;
    }
    navigate(path);
  };

  return (
    <>
      <Grid container spacing={matchDownSM ? 0 : 2}>
        <Grid item xs={12} sm={12}>
          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth error={error}>
              <InputLabel id="registration-type-label" sx={{ display: 'flex' }} shrink>
                Registration type
                <Typography sx={{ color: 'red' }}> *</Typography>
              </InputLabel>
              <Select
                labelId="registration-type-label"
                id="registration-type"
                value={registrationType}
                onChange={handleChangeRegistration}
                label={
                  <span>
                    Registration type
                    <span style={{ color: 'red' }}>*</span>
                  </span>
                }
                displayEmpty
                renderValue={(value) =>
                  value ? (
                    <Typography>{value}</Typography>
                  ) : (
                    <Typography style={{ color: '#BDBDBD' }}>Please select registration form</Typography>
                  )
                }
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: error ? 'red' : 'inherit'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: error ? 'red' : 'inherit'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: error ? 'red' : 'inherit'
                  }
                }}
              >
                <MenuItem value="I am a club owner.">I am a club owner.</MenuItem>
                <MenuItem value="I am an athlete/ a coach. (only Thai citizen)">I am an athlete/ a coach. (only Thai citizen)</MenuItem>
                <MenuItem value="I am a veterinarian.">I am a veterinarian.</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button fullWidth size="large" variant="contained" color="TLO" onClick={handleNext}>
            {' '}
            NEXT
          </Button>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button
            fullWidth
            size="large"
            variant="outlined"
            sx={{
              color: '#0E2130', // สีตัวหนังสือ TLO
              borderColor: '#0E2130', // สีขอบ
              backgroundColor: 'transparent', // พื้นหลังโปร่งใส
            }}
            onClick={() => navigate('/')}
          >
            BACK TO SIGN IN
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
export default FirebaseRegister;
