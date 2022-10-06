import React, { useState } from "react";

import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

const PublicRoutes = () => {
  const { isUserLoggedIn, isLoggedIn } = useAuth();

  return isUserLoggedIn() === true ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
