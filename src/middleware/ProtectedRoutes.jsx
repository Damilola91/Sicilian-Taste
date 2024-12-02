import HomePage from "../components/Pages/HomePage/HomePage";

import { Outlet } from "react-router-dom";

export const isAuth = () => {
  return JSON.parse(localStorage.getItem("Authorization"));
};

const ProtectedRoutes = () => {
  const isAuthorized = isAuth();

  return isAuthorized ? <Outlet /> : <HomePage />;
};

export default ProtectedRoutes;
