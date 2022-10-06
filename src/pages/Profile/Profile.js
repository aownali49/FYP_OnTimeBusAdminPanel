import React, { useEffect } from "react";
import { useState } from "react";
import "./Profile.css";
import profile from "../Profile/Images/profile.jpg";
import call from "../Profile/Images/call.png";
import email from "../Profile/Images/email.png";
import contact from "../Profile/Images/contact.png";
import userpic from "../Profile/Images/user.png";
// import call from '../Images/call.png'
import edit from "../Profile/Images/edit.png";
import location from "../Profile/Images/location.png";
import { auth, db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

function Profile() {
  const { user } = useAuth();
  var userId = user?.uid;
  console.log("User ID", userId);

  var userEmail = user?.email;
  console.log("Email ", userEmail);


  const [superAdmin, setSuperAdmin] = useState(false);



  const [profileInFO, setProfileInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleModal = () => {
    setShowUpdateModal(true);

    setTimeout(() => {
      setShowUpdateModal(false);
    }, 1000);
  };

  useEffect(() => {
    // setProfileInfo({
    //     ...profileInFO,
    //     email: userEmail,
    // })z
    db.collection("admins")
      .doc(userId)
      .get()
      .then((querySnapshot) => {
        let oIncomingData = querySnapshot.data();
        if (oIncomingData) {
          console.log("querySnapshot", querySnapshot.data());
          setProfileInfo({
            ...profileInFO,
            name: oIncomingData.username,
            phone: oIncomingData.phone,
            address: oIncomingData.address,
            email: userEmail,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user]);


  db.collection("admins")
    .doc(userId)
    .get()
    .then((querySnapshot) => {
      let oIncomingData = querySnapshot.data();
      if (oIncomingData) {
        console.log("querySnapshot", querySnapshot.data());
        if (oIncomingData.superAdmin) {
          setSuperAdmin(true);
          console.log("Super Admin : ", superAdmin);
        }
      }
    });

  function handleUpdate() {
    console.log("Profile Informaiton to be updated", profileInFO);
    var userId = auth.currentUser.uid;
    console.log("User ID", userId);
    db.collection("admins")
      .doc(userId)
      .update({
        username: profileInFO.name,
        email: profileInFO.email,
        phone: profileInFO.phone,
        address: profileInFO.address,
      })
      .then((user) => {
        console.log("User updated Successfully", user);
        // setShowUpdateModal(true);
        handleModal();
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }

  return (
    <div className="profile">
      <div className="profile_header"></div>
      <div className="profile_body">
        <div className="body_left">
          <div className="body_left_header">
            <img src={userpic} alt="boy img" className="left_profile_img" />
            <div className="profile_card">
              <h3 className="profile_name">{profileInFO.name}</h3>
              {superAdmin ? <span style={{ fontWeight: "bold", color: "black" }}>Super Admin</span> : <span style={{ fontWeight: "bold", color: "black" }}>Admin</span>}

            </div>
          </div>
          <div className="body_left_body">
            <img src={contact} alt="" className="left_profile_img" />
            <span
              style={{ fontSize: "xx-large" }}
              className="body_right_header"
            >
              Contact
            </span>
            <div className="contact_text">
              <div className="card">
                <img
                  style={{ color: "black", fontWeight: "bold" }}
                  src={call}
                  alt=""
                  className="icon"
                />
                <span style={{ color: "black", fontWeight: "bold" }}>
                  {profileInFO.phone}
                </span>
              </div>
              <br />
              <div className="card">
                <img src={email} alt="" className="icon" />
                <span style={{ color: "black", fontWeight: "bold" }}>
                  {profileInFO.email}
                </span>
              </div>
              <br />
              <div className="card">
                <img src={location} alt="" className="icon" />
                <span style={{ color: "black", fontWeight: "bold" }}>
                  {profileInFO.address}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="body_right">
          <div className="card">
            <img src={edit} alt="" className="left_profile_img" />
            <span className="body_right_header">Edit</span>
          </div>
          <br />
          <div className="body_right_inner">
            <div className="body_inner_left">
              <span style={{ color: "black", fontWeight: "bold" }}>
                User_Name
              </span>

              <input
                type="text"
                name="Name"
                className="v-fields"
                placeholder=" User Name"
                value={profileInFO.name}
                onChange={(e) => {
                  setProfileInfo({
                    ...profileInFO,
                    name: e.target.value,
                  });
                }}
              />
              <br />

              <h4 style={{ color: "black", fontWeight: "bold" }}>Email</h4>
              <input
                disabled={true}
                type="text"
                name="email"
                className="v-fields"
                placeholder="xyz@abc.com"
                value={profileInFO.email}
                onChange={(e) => {
                  setProfileInfo({
                    ...profileInFO,
                    email: e.target.value,
                  });
                }}
              />

              <br />

              <h4 style={{ color: "black", fontWeight: "bold" }}>Phone</h4>
              <input
                type="tel"
                name="Phone"
                className="v-fields"
                placeholder="03**-********"
                value={profileInFO.phone}
                onChange={(e) => {
                  setProfileInfo({
                    ...profileInFO,
                    phone: e.target.value,
                  });
                }}
              />
              <br />
              <h4 style={{ color: "black", fontWeight: "bold" }}>Address</h4>
              <input
                type="text"
                name="address"
                id="v-fields"
                placeholder=" Address"
                value={profileInFO.address}
                onChange={(e) => {
                  setProfileInfo({
                    ...profileInFO,
                    address: e.target.value,
                  });
                }}
              />
              <br />
            </div>
            <div>
              <img src={profile} alt="" className="right_profile_img" />
            </div>
            <div className="body_inner_right">
              <button
                className="button v-button"
                onClick={() => {
                  handleUpdate();
                }}
              >
                update
              </button>
            </div>
          </div>
        </div>
      </div>
      {showUpdateModal && (
        <div class="modal is-active">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header
              style={{ backgroundColor: "#8624DB" }}
              class="modal-card-head"
            >
              <p class="modal-card-title">
                <strong></strong>
              </p>
              <button
                onClick={() => {
                  setShowUpdateModal(false);
                }}
                class="delete"
                aria-label="close"
              ></button>
            </header>
            <section class="modal-card-body">
              <h1
                style={{
                  color: "black",
                  fontSize: 25,
                  textAlign: "center",
                }}
              >
                <strong>Updated Successfully</strong>
              </h1>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
