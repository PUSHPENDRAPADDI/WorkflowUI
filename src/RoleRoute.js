import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthProviderContext';

const RoleRoute = ({ element, allowedRoles, ...rest }) => {
  const { role } = useAuth();
  const renderElement = allowedRoles.includes(role) ? element : <Navigate to="/" replace />;
  return <Route {...rest} element={renderElement} />;
};

export default RoleRoute;