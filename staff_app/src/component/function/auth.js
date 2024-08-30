import axios from 'axios';
const baseUrl = `${process.env.REACT_APP_API_URL}`;
export const baseEmail = `${process.env.REACT_APP_URL_EMAIL}`;
export const baseLogin = `${process.env.REACT_APP_URL_LOGIN}`;

//export const login = async (values) => await axios.post(`${baseUrl}/login_admin`, values);
export const login = async (values) => await axios.post(`${baseUrl}/login`, values);

export const login_officer = async (values) => {
  const { email, password } = values;
  return await axios.post(`${baseUrl}/login_officer`, { 
    e_mail: email,  // เปลี่ยนจาก email เป็น e_mail
    password 
  });
};




export const logout = async () => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
  } catch (error) {
    console.error('Logout error:', error);
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


//veterinarian การจัดการข้อมูลสัตวแพทย์
export const createVeterinarian = async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}/veterinarians`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const get_all_vet = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  return await axios.get(`${baseUrl}/get_all_vet?${queryString}`);
};

export const get_vet_by_id = async (id) => await axios.get(`${baseUrl}/get_vet_by_id/${id}`);

export const send_approval_email = async (emailData) => {
  try {
    const response = await axios.post(`${baseUrl}/send-approval-email`, emailData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateVetInfoAndSendEmail = async (approvalData) => {
  try {
    const response = await axios.post(`${baseUrl}/send-approval-email`, approvalData);
    return response.data;
  } catch (error) {
    console.error('Error updating veterinarian info and sending email:', error);
    throw error;
  }
};

export const approvalVetRenew = async (approvalData) => {
  try {
    const response = await axios.post(`${baseUrl}/approvalVetRenew`, approvalData);
    return response.data;
  } catch (error) {
    console.error('Error updating veterinarian info and sending email:', error);
    throw error;
  }
};

//router.post('/api/v1/approvalVetRenew', approvalVetRenew);
export const update_Deny_SendEmail = async (denyData) => {
  try {
    const response = await axios.post(`${baseUrl}/deny`, denyData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchVeterinarians = async (searchParams) => {
  const {
    searchTerm,
    startDate,
    endDate,
    approve_status,
    vet_status,
    page = 1,
    limit = 10
  } = searchParams;

  const params = new URLSearchParams();
  if (searchTerm) params.append('searchTerm', searchTerm);
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  if (approve_status) params.append('approve_status', approve_status);
  if (vet_status) params.append('vet_status', vet_status);
  params.append('page', page);
  params.append('limit', limit);

  return await axios.get(`${baseUrl}/veterinarians/search`, { params });
};






