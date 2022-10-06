import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";
import Home from "../pages/Dashboard/Home";
// import userjourney from '../pages/Tables/UserJourney'
import UserQueries from "../pages/Tables/Userqueries";
import Users from "../pages/Tables/Users";
// import UserJourney from '../pages/Tables/Userjourney';
// import userqueries from '../pages/Tables/UserQueries';
import Login from "../components/Login/login";
import Signup from "../pages/Tables/Signup";
import Error404 from "../pages/Error/Error404";
import Profile from "../pages/Profile/Profile";
import Stops from "../pages/Tables/Stops";
import Admins from "../pages/Tables/Admins";
import UserJourney from "../pages/Tables/UserJourney";
// import { currentUser } from "../contexts/AuthContext";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import Error401 from "../pages/Error/Error401";
import Useracount from "../pages/Tables/Useracount";

function MainRoutes() {
  const { user } = useAuth();
  const [superAdmin, setSuperAdmin] = useState(false);
  useEffect(() => {
    console.log("Admin Details", user);

    db.collection('admins').doc(user?.uid)
      .get()
      .then((querySnapshot) => {
        let adminDetails = querySnapshot?.data();
        adminDetails.superAdmin ? setSuperAdmin(true) : setSuperAdmin(false);
      })
      .catch(error => {
        console.log("Error", error);
      })
  }, [user])
  return (
    <>
      <Routes>
        {/** Protected Routes */}
        {/** Wrap all Route under ProtectedRoutes element */}
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          {/* <Route path='/userjourney' element={<UserJourney />} /> */}
          <Route path="/users" element={<Users />} />
          <Route path="/userqueries" element={<UserQueries />} />
          <Route path="/useracount" element={<Useracount />} />

          <Route path="/stops" element={<Stops />} />
          <Route
            path="/signup"
            element={
              superAdmin ? <Signup /> : <Error401 />
            }
          />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/admins" element={<Admins />} /> */}
          <Route path="/userjourney" element={<UserJourney />} />
          <Route
            path="/admins"
            element={
              superAdmin ? <Admins /> : <Error401 />
            }
          />
        </Route>

        {/** Public Routes */}
        {/** Wrap all Route under PublicRoutes element */}
        <Route path="" element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/** Error404 routes */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default MainRoutes;
