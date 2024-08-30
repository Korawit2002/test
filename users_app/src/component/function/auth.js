import axios from 'axios';
const baseUrl = `${process.env.REACT_APP_API_URL}`;
export const baseEmail = `${process.env.REACT_APP_URL_EMAIL}`;
export const baseLogin = `${process.env.REACT_APP_URL_LOGIN}`;



// export const login = async (values) => {
//   const { username, password } = values;
  
//   try {
//     const response = await axios.post('https://student.crru.ac.th/651463014/api/login.php', {
//       username,
//       password
//     });
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

export const logout = async () => {
  try {
    localStorage.removeItem('token');

  } catch (error) {
    throw error;
  }
};

export const currentUser = async (authtoken) =>
  await axios.post(
    `${baseUrl}/current-admin`,
    {},
    {
      headers: {
        authtoken
      }
    }
  );
export const verifyToken = async () => {
  const token = localStorage.getItem('token');
  if (!token) return { isValid: false };

  try {
    const response = await axios.get(`${baseUrl}/verify-token`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return { isValid: true, user: response.data.user };
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Token หมดอายุหรือไม่ถูกต้อง
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    }
    return { isValid: false, error: error.response?.data?.message || 'Token verification failed' };
  }
};
export const sendResetPasswordEmail = async (email) => {
  try {
    const response = await axios.post(`${baseUrl}/forgot_password`, { e_mail: email });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const validateResetToken = async (token, expiry) => {
  try {
    const response = await axios.get(`${baseUrl}/validate-reset-token`, { params: { token, expiry } });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(`${baseUrl}/reset-password`, { token, newPassword });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

//Provinces
export const getProvince = async () => await axios.get(`${baseUrl}/Provinces`);
export const getAmpur = async (id) => await axios.get(`${baseUrl}/Amphures/${id}`);
export const getTambon = async (id) => await axios.get(`${baseUrl}/Tombons/${id}`);
export const getZipcode = async (id) => await axios.get(`${baseUrl}/Zipcode/${id}`);



export const get_vet_by_id = async (id) => await axios.get(`${baseUrl}/get_by_vet_id/${id}`);


export const updateVetInfo = async (vetId) => {
  try {
    const response = await axios.post(`${baseUrl}/updateVetInfo`, { id: vetId });
    return response.data;
  } catch (error) {
    console.error('Error updating veterinarian info:', error);
    throw error;
  }
};

export const updatePassword = (oldPassword, newPassword, vet_id) =>axios.post(`${baseUrl}/update-password`, { oldPassword, newPassword, vet_id });

export const updateStatusRenew = async (vet_id) => {
  try {
    const response = await axios.put(`${baseUrl}/update_status_Renew`, { vet_id });
    return response.data;
  } catch (error) {
    console.error('Error updating status renew:', error);
    throw error;
  }
};

//notification
//router.get('/api/v1/getUserNotifications', getUserNotifications);
export const getUserNotifications = async (username) => {
  try {
    const response = await axios.get(`${baseUrl}/getUserNotifications`, {
      params: { username }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user notifications:', error);
    throw error;
  }
};

export const updateNotificationStatus = async (notificationId, isRead) => {
  try {
    const response = await axios.put(`${baseUrl}/updateNotificationStatus/${notificationId}/status`, { isRead });
    return response.data;
  } catch (error) {
    console.error('Error updating notification status:', error);
    throw error;
  }
};