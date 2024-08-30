// import React, { useState, useEffect } from 'react';
// import { Typography, Paper, Box } from '@mui/material';

// // project imports

// const Veterinarian = () => {
//   return (
//     <Paper elevation={0}>
//       <Box sx={{ flexGrow: 1, p: 3 }}>
//         <Paper>
//           <div
//             style={{
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               height: '100vh'
//               // width: '100vw'
//             }}
//           >
//             <Typography variant="body1" sx={{ fontSize: 30 }}>
//               Comming soon........
//             </Typography>
//           </div>
//         </Paper>
//       </Box>
//     </Paper>
//   );
// };

// export default Veterinarian;
import React, { useState } from 'react';
import { Typography, Paper, Box, Tabs, Tab,Grid } from '@mui/material';
import AllNotifications from './AllNotifications';
import UnreadNotifications from './UnreadNotifications';

const Notification = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper elevation={0}>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h2" gutterBottom>
          Notification
        </Typography>
        <Grid item xs={12}>
        <Box sx={{ width: '100%', height: '2px', backgroundColor: '#0E5F9C' }} />
      </Grid>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="All" />
          <Tab label="Haven't read yet" />
        </Tabs>
        {value === 0 && <AllNotifications />}
        {value === 1 && <UnreadNotifications />}
      </Box>
    </Paper>
  );
};

export default Notification;