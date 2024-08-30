import { useState, useRef, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  ClickAwayListener,
  Divider,
  Grid,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  Paper,
  Popper,
  Stack,
  Switch,
  Typography
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import UpgradePlanCard from './UpgradePlanCard';
import User1 from 'assets/images/users/user-round.svg';

// assets
import { IconLogout, IconSearch, IconSettings, IconUser } from '@tabler/icons-react';

// ==============================|| PROFILE MENU ||============================== //
import { logout, get_vet_by_id } from 'component/function/auth';
const ProfileSection = () => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const navigate = useNavigate();

  const [sdm, setSdm] = useState(true);
  const [value, setValue] = useState('');
  const [notification, setNotification] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const anchorRef = useRef(null);
  const IMAGE_BASE_URL = process.env.REACT_APP_API_URL_IMG?.replace(/\/$/, '') || 'http://localhost:3301';
  const id = localStorage.getItem('username');

  useEffect(() => {
    if (id) {
      fetchVeterinarianData();
    } else {
      setError('No veterinarian ID provided');
      setLoading(false);
    }
  }, [id]);

  const fetchVeterinarianData = async () => {
    try {
      setLoading(true);
      const response = await get_vet_by_id(id);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching veterinarian data:', error);
      setError('Failed to fetch veterinarian data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (event, index, route = '') => {
    setSelectedIndex(index);
    handleClose(event);

    if (route && route !== '') {
      navigate(route);
    }
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Chip
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            '& svg': {
              stroke: theme.palette.primary.light
            }
          },
          '& .MuiChip-label': {
            lineHeight: 0
          }
        }}
        icon={
          <Avatar
            src={`${IMAGE_BASE_URL}/${formData.photo?.filepath}`}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer'
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <Box sx={{ p: 2 }}>
                    <Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography variant="h4">User Profile</Typography>
                      </Stack>
                    </Stack>

                    <Grid item xs={4} sm={4} md={4} lg={4} mt={2}>
                      {/* <Box>
                        <Avatar src={`${IMAGE_BASE_URL}/${formData.photo?.filepath}`} alt="Uploaded Image" />
                      </Box>
                      <Box>
                        <ListItemText primary={<Typography variant="body2">VET ID</Typography>} />
                        <ListItemText primary={<Typography variant="body2">Name</Typography>} />
                        <ListItemText primary={<Typography variant="body2">E-mail</Typography>} />
                      </Box>
                      <Box>
                        <ListItemText primary={<Typography variant="body2">TEF1234</Typography>} />
                        <ListItemText primary={<Typography variant="body2">UTEF</Typography>} />
                        <ListItemText primary={<Typography variant="body2">UTEF@tlogical.com</Typography>} />
                      </Box> */}
                      <Box sx={{ display: 'flex' }}>
                        <Avatar src={`${IMAGE_BASE_URL}/${formData.photo?.filepath}`} alt="Uploaded Image" />
                        <Grid sx={{ pl: 4 }}>
                          <Grid sx={{ display: 'flex' }}>
                            <Typography variant="body2">VET ID</Typography>
                            <Typography sx={{ pl: 2 }} variant="body2">
                              {formData.vet_id || ''}
                            </Typography>
                          </Grid>
                          <Grid sx={{ display: 'flex' }}>
                            <Typography variant="body2">Name</Typography>
                            <Typography sx={{ pl: 2 }} variant="body2">
                              {formData.first_name_en || ''} {formData.last_name_en || ''}
                            </Typography>
                          </Grid>
                          <Grid sx={{ display: 'flex' }}>
                            <Typography variant="body2">E-mail</Typography>
                            <Typography sx={{ pl: 2 }} variant="body2">
                              {formData.email || ''}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  </Box>
                  <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
                    <Box sx={{ p: 2 }}>
                      <List
                        component="nav"
                        sx={{
                          width: '100%',
                          maxWidth: 350,
                          minWidth: 300,
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: '10px',
                          [theme.breakpoints.down('md')]: {
                            minWidth: '100%'
                          },
                          '& .MuiListItemButton-root': {
                            mt: 0.5
                          }
                        }}
                      >
                        {/* <ListItemButton
                          sx={{ borderRadius: `${customization.borderRadius}px` }}
                          selected={selectedIndex === 0}
                          onClick={(event) => handleListItemClick(event, 0, '#')}
                        >
                          <ListItemIcon>
                            <IconSettings stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant="body2">Account Settings</Typography>} />
                        </ListItemButton> */}

                        <ListItemButton
                          sx={{ borderRadius: `${customization.borderRadius}px` }}
                          selected={selectedIndex === 4}
                          onClick={handleLogout}
                        >
                          <ListItemIcon>
                            <IconLogout stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                        </ListItemButton>
                      </List>
                    </Box>
                  </PerfectScrollbar>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
