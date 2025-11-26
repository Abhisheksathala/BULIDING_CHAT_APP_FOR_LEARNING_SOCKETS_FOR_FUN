import React from 'react';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const ProtectRoute = ({ children, user, redirect = '/userauthentication/login' }) => {
  if (!user) {
    return <Navigate to={redirect} />;
  }

  return <div>{children ? children : <Outlet />}</div>;
};

export default ProtectRoute;
