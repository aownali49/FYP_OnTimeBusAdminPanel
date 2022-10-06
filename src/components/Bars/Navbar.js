import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { useAuth } from "../../contexts/AuthContext";
import pic from "../Login/images/signuppic.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "bulma/css/bulma.css";
import { auth, db } from "../../firebase";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const { setIsLoggedIn } = useAuth();
  const showSidebar = () => setSidebar(!sidebar);
  const { user } = useAuth();
  const [superAdmin, setSuperAdmin] = useState(false);
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/profile";
    navigate(path);
  };

  let navigates = useNavigate();
  const routeDashboard = () => {
    let path = "/";
    navigates(path);
  };

  useEffect(() => {
    console.log("Admin Details", user);

    db.collection('admins').doc(user?.uid)
      .get()
      .then((querySnapshot) => {
        console.log("QuerySnapShot", querySnapshot?.data());
        let adminDetails = querySnapshot?.data();
        adminDetails.superAdmin ? setSuperAdmin(true) : setSuperAdmin(false);
      })
      .catch(error => {
        console.log("Error", error);
      })
  }, [user])

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars className="mnu" onClick={showSidebar} />
          </Link>
          <img
            style={{
              height: "50px",
              borderRadius: "10%",
              maxWidth: "100%",
              position: "absolute",
              margin: "26%",
              backgroundColor: "#E8E8E8",

              cursor: "pointer",
            }}
            onClick={routeDashboard}
            src={pic}
          />
          <h1 className="heading">On Time Bus Admin</h1>
          {/* <button className="buton" onClick={() => setIsLoggedIn(false)}>
          < FiLogOut.FiLogOut />
          </button> */}
          <div
            className="navbar-item has-dropdown is-hoverable mr-6"
            style={{
              backgroundColor: "#8624DB",
            }}
          >
            <a
              style={{
                backgroundColor: "#8624DB",
                color: "white",
              }}
              className="navbar-link"
            >
              <figure className="image is-50x50 is-rounded">
                <img
                  style={{
                    backgroundColor: "#8624DB",
                    color: "white",
                  }}
                  className="is-rounded"
                  src="https://thumbs.dreamstime.com/b/customer-customer-icon-146530250.jpg"
                // "https://avatars.dicebear.com/v2/initials/usman.svg"
                />
              </figure>
            </a>
            <div>
              <div
                style={{ backgroundColor: "#8624DB", color: "white " }}
                className="navbar-dropdown  is-right"
              >
                <div id="button" className="navbar-item" onClick={routeChange}>
                  <FontAwesomeIcon style={{ color: "white" }} icon={faUser} />
                  <a style={{ color: "white " }}>Profile</a>
                </div>

                <div
                  id="button"
                  onClick={() => {
                    auth.signOut();
                  }}
                  className="navbar-item"
                >
                  <FontAwesomeIcon
                    style={{ color: "white" }}
                    icon={faSignOut}
                  />
                  <a style={{ color: "white " }}>Logout</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav
          style={{ zIndex: 999 }}
          className={sidebar ? "nav-menu active" : "nav-menu"}
        >
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose className="cross" />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (

                <li
                  style={{
                    display: (item.path === '/admins' || item.path === '/signup') && !superAdmin ? 'none' : 'block',
                  }}
                  key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            }
            )}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
