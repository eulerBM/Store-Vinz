import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteAdmin = ({ children }) => {
    
  const token = localStorage.getItem('token');
  const getInfosUser = JSON.parse(localStorage.getItem("userInfo"));

  if (!token) {

    return <Navigate to="/login" />;
    
  }

  if (!["ADMIN", "SUPER"].includes(getInfosUser.role)){

    return <Navigate to="/" />;

  }

  

  return children;
  
};

export default ProtectedRouteAdmin;

