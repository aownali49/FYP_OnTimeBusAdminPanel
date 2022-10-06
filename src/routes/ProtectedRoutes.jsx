import { useLocation } from "react-router";
import { Navigate, Outlet } from "react-router-dom";
import React from "react";

import { useAuth } from "../contexts/AuthContext";

const ProtectedRoutes = () => {
  const { isUserLoggedIn, isLoggedIn } = useAuth();

  const location = useLocation();

  return isLoggedIn !== undefined && isUserLoggedIn() === true ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;
