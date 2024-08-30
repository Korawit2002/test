// import React, { createContext, useState, useEffect, useContext } from 'react';
// import { verifyToken } from '../component/function/auth';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   //   const checkAuth = async () => {
//   //     const result = await verifyToken();
//   //     if (result.isValid) {

//   //       setUser(result.user);
//   //     } else {
//   //       setUser(null);
//   //     }
//   //     setLoading(false);
//   //   };
//   const checkAuth = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setUser(null);
//       setLoading(false);
//       return;
//     }
  
//     try {
//       const result = await verifyToken();
//       if (result.isValid) {
//         setUser(result.user);
//       } else {
//         localStorage.removeItem('token');
//         localStorage.removeItem('username');
//         setUser(null);
//       }
//     } catch (error) {
//       console.error('Error verifying token:', error);
//       localStorage.removeItem('token');
//       localStorage.removeItem('username');
//       setUser(null);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     checkAuth();
//     const interval = setInterval(checkAuth, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   const value = {
//     user,
//     setUser,
//     loading,
//     checkAuth
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => useContext(AuthContext);
