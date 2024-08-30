import React, { useState, useEffect } from 'react';
import { Typography, Paper, Box, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const Performance = () => {
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);

  useEffect(() => {
    axios.get('https://student.crru.ac.th/651463014/API/maintenancerequests.php')
      .then((response) => {
        // ตรวจสอบข้อมูลที่ได้รับจาก API
        console.log(response.data); // ดูข้อมูลใน Console
        if (response.data && Array.isArray(response.data.succeed)) {
          setMaintenanceRequests(response.data.succeed);
        } else {
          setMaintenanceRequests([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching maintenance requests:', error);
        setMaintenanceRequests([]); // ตั้งค่าเป็น array ว่างถ้ามีข้อผิดพลาด
      });
  }, []);

  return (
    <Paper elevation={0}>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Paper>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              overflowY: 'auto'
            }}
          >
            <List>
              {maintenanceRequests.length > 0 ? (
                maintenanceRequests.map((request) => (
                  <ListItem key={request.request_id}>
                    <ListItemText
                      primary={`Room ${request.room_number}: ${request.issue_description}`}
                      secondary={`Status: ${request.maintenance_status} | Date: ${request.request_date}`}
                    />
                  </ListItem>
                ))
              ) : (
                <Typography variant="body1" sx={{ fontSize: 30 }}>
                  ไม่มีข้อมูล
                </Typography>
              )}
            </List>
          </div>
        </Paper>
      </Box>
    </Paper>
  );
};

export default Performance;
