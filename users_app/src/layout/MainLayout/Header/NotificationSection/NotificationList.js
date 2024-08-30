

// // export default NotificationList;
// import React, { useEffect, useState } from 'react';
// import { useTheme, styled } from '@mui/material/styles';
// import {
//   List,
//   Grid,
//   Typography,
//   Box,
//   Paper
// } from '@mui/material';

// import { getUserNotifications } from 'component/function/auth';

// const NotificationBox = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(2),
//   marginBottom: theme.spacing(2),
//   minHeight: 100, // กำหนดความสูงขั้นต่ำ
//   cursor: 'pointer',
//   '&:hover': {
//     backgroundColor: theme.palette.action.hover,
//   },
// }));

// const EmptyNotificationBox = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(2),
//   minHeight: 200, // กำหนดความสูงขั้นต่ำสำหรับกรณีไม่มีการแจ้งเตือน
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   backgroundColor: theme.palette.background.default,
// }));

// const NotificationList = () => {
//   const theme = useTheme();
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const username = localStorage.getItem('username');

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       if (!username) return;
      
//       try {
//         setLoading(true);
//         const response = await getUserNotifications(username);
//         if (response.success) {
//           const sortedNotifications = response.data
//             .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
//             .slice(0, 5);
//           setNotifications(sortedNotifications);
//         } else {
//           setError(response.message || 'Failed to fetch notifications');
//         }
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//         setError('Failed to fetch notifications. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, [username]);

//   if (loading) return <Typography>Loading...</Typography>;
//   if (error) return <Typography color="error">{error}</Typography>;

//   return (
//     <Box sx={{ width: '100%', maxWidth: 600, minWidth: 300, margin: 'auto',padding: '0 16px',  }}>
//       {notifications.length > 0 ? (
//         <List>
//           {notifications.map((notification) => (
//             <NotificationBox key={notification._id} elevation={1}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <Typography variant="body1">
//                     {notification.notification_id.title.en}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Typography variant="caption" color="text.secondary">
//                     {new Date(notification.created_at).toLocaleString()}
//                   </Typography>
//                 </Grid>
//               </Grid>
//             </NotificationBox>
//           ))}
//         </List>
//       ) : (
//         <EmptyNotificationBox elevation={1}>
//           <Typography variant="body1" color="text.secondary">
//             No notifications available
//           </Typography>
//         </EmptyNotificationBox>
//       )}
//     </Box>
//   );
// };

// export default NotificationList;
import React, { useEffect, useState } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import {
  List,
  Grid,
  Typography,
  Box,
  Paper
} from '@mui/material';

import { getUserNotifications } from 'component/function/auth';

const NotificationBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  minHeight: 100,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const EmptyNotificationBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: 200,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
}));

const NotificationList = ({ onUnreadCountChange }) => {
  const theme = useTheme();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!username) return;
      
      try {
        setLoading(true);
        const response = await getUserNotifications(username);
        if (response.success) {
          const sortedNotifications = response.data
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 5);
          setNotifications(sortedNotifications);
          
          // Calculate unread count
          const unreadCount = sortedNotifications.filter(notification => !notification.is_read).length;
          onUnreadCountChange(unreadCount);
        } else {
          setError(response.message || 'Failed to fetch notifications');
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setError('Failed to fetch notifications. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [username, onUnreadCountChange]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ width: '100%', maxWidth: 600, minWidth: 300, margin: 'auto', padding: '0 16px' }}>
      {notifications.length > 0 ? (
        <List>
          {notifications.map((notification) => (
            <NotificationBox key={notification._id} elevation={1}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    {notification.notification_id.title.en}
                  </Typography>
                </Grid>
                {/* <Grid item xs={12}>
                  <Typography variant="body2">
                    {notification.notification_id.message.en}
                  </Typography>
                </Grid> */}
                <Grid item xs={12}>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(notification.created_at).toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            </NotificationBox>
          ))}
        </List>
      ) : (
        <EmptyNotificationBox elevation={1}>
          <Typography variant="body1" color="text.secondary">
            No notifications available
          </Typography>
        </EmptyNotificationBox>
      )}
    </Box>
  );
};

export default NotificationList;