import React, { useState, useEffect } from 'react';
import { Typography, Paper, Box, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, Pagination, Select, MenuItem } from '@mui/material';

// api
import { getUserNotifications, updateNotificationStatus } from '../../../src/component/function/auth';

const UnreadNotifications = () => {
  const [open, setOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [notificationsPerPage, setNotificationsPerPage] = useState(5);

  const handleClickOpen = (notification) => {
    setSelectedNotification(notification);
    setOpen(true);
  };

  const handleClose = async () => {
    if (selectedNotification) {
      try {
        const result = await updateNotificationStatus(selectedNotification._id, true);
        if (result.success) {
          setNotifications(prevNotifications =>
            prevNotifications.filter(n => n._id !== selectedNotification._id)
          );
        } else {
          console.error('Failed to update notification status:', result.message);
        }
      } catch (error) {
        console.error('Error updating notification status:', error);
      }
    }
    setOpen(false);
    setSelectedNotification(null);
  };

  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!username) return;

      try {
        setLoading(true);
        const response = await getUserNotifications(username);
        if (response.success) {
          const unreadNotifications = response.data.filter(notification => !notification.is_read);
          setNotifications(unreadNotifications);
        } else {
          setError('Failed to fetch notifications');
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setError('Failed to fetch notifications. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [username]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleChangeNotificationsPerPage = (event) => {
    setNotificationsPerPage(event.target.value);
    setPage(1);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 2 }}>
        {error}
      </Typography>
    );
  }

  const indexOfLastNotification = page * notificationsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
  const currentNotifications = notifications.slice(indexOfFirstNotification, indexOfLastNotification);

  return (
    <Box sx={{ flexGrow: 1, mt: 2 }}>
      {currentNotifications.length === 0 ? (
        <Typography sx={{ mt: 2 }}>No unread notifications.</Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {currentNotifications.map((notification) => (
              <Grid item xs={12} key={notification._id}>
                <Paper elevation={1} sx={{ p: 2, cursor: 'pointer' }} onClick={() => handleClickOpen(notification)}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {notification.notification_id.title.en}
                  </Typography>
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    {new Date(notification.created_at).toLocaleString()}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Pagination
              count={Math.ceil(notifications.length / notificationsPerPage)}
              page={page}
              onChange={handleChangePage}
            />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" component="span">
                Show:
              </Typography>
              <Select
                value={notificationsPerPage}
                onChange={handleChangeNotificationsPerPage}
                sx={{ ml: 1 }}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
              </Select>
            </Box>
          </Box>
        </>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedNotification?.notification_id.title.en}</DialogTitle>
        <DialogContent>
          {selectedNotification && (
            <>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {selectedNotification.notification_id.message.en}
              </Typography>
              <Typography variant="caption" display="block" sx={{ mt: 2 }}>
                Type: {selectedNotification.type}
              </Typography>
              <Typography variant="caption" display="block">
                Document Type: {selectedNotification.notification_id.documentType}
              </Typography>
              <Typography variant="caption" display="block">
                Date: {new Date(selectedNotification.created_at).toLocaleString()}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UnreadNotifications;