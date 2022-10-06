import React, { useState } from "react";
import PasswordChecklist from "react-password-checklist";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { auth, db } from "../../firebase";
import {
  Avatar,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { Link } from "react-router-dom";

const Signup = () => {
  const paperStyle = { padding: "20px 20px", width: 1000, margin: "auto" };
  const avatarStyle = { backgroundColor: "#FF9066" };
  const [flag, setFlag] = useState(true);

  const [showSignupModal, setShowSignupModal] = useState(false);

  // const [isVisible, setIsVisible]= useState(false);


  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [isFormValid, setFormIsValid] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [userInFo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: '',
    confirm_password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true
  });

  const handleModal = () => {

    setShowSignupModal(true)

    setTimeout(() => {
      setShowSignupModal(false);
      auth.signOut();
    }, 1000);
  }

  const handleSignUp = () => {

    if (userInFo.username == "" || userInFo.email === "" || userInFo.password === "" || userInFo.confirm_password == "" || userInFo.phone == "" || userInFo.address == "") {
      seterrorMessage("Please enter all credentials.");
      handleModal(true);
    }
    else {

      auth
        .createUserWithEmailAndPassword(userInFo.email, userInFo.password)
        .then((userCredential) => {
          // Signed in 
          userCredential.user.sendEmailVerification();
          var user = userCredential.user;
          // console.log("New User created is:",user)
          addUser(user);
          seterrorMessage("New Admin Created Succesfully")
          handleModal();
          // Sign out
          // handleSignout();


          // seterrorMessage("New Admin Created Succesfully")
          // setShowSignupModal(true)
          // ...
        })
        .catch((error) => {
          var errorMessage = error.message;
          seterrorMessage(errorMessage)
          handleModal();

          // ..
        });
    }
  }

  function addUser(userDetails) {
    let userData =
    {
      "username": userInFo.username,
      "email": userInFo.email,
      "phone": userInFo.phone,
      "address": userInFo.address,
      "superAdmin": isSuperAdmin,
    }
    console.log("User Info", userData);
    db.collection('admins').doc(userDetails.uid).set(userData)
      .then((result) => {
        console.log("Admin Saved Successfully", result);
      })
      .catch(error => { console.log("error", error); })
  }

  return (
    <div
      style={{
        height: "70vh",
        width: "100%",
        marginTop: 5,
        backgroundColor: "#F0F0F0"
      }}
    >
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center" backgroundColor="#BEBEBE">
            <Avatar style={avatarStyle}>
              <AddCircleOutlineOutlinedIcon />
            </Avatar>

            <h2 style={{ color: "black", fontSize: "large" }}>
              <strong>Add new Admin</strong>
            </h2>
            <Typography
              variant="caption"
              style={{ color: "black", fontSize: "small" }}
            >
              Please fill this form to create new Admin !
            </Typography>
          </Grid>
          <form>
            <FormControlLabel
              control={
                <Checkbox
                  name="checkedB"
                  color="primary"
                  onClick={() => setIsSuperAdmin(!isSuperAdmin)}
                />
              }
              label="Super Admin"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "coloumn",
                flex: "50%",
                gap: "10px",
                paddingLeft: "2px",
                paddingRight: "2px",

              }}
            >
              <TextField
                fullWidth
                required

                type={"text"}
                name='username'
                value={userInFo.username}
                onChange={(e) => {
                  setUserInfo({
                    ...userInFo,
                    'username': e.target.value
                  })
                }}
                placeholder="Enter Username"
                label="Username"
              />

              <TextField
                fullWidth
                required

                type={"email"}
                name='Email'
                value={userInFo.email}
                onChange={(e) => {
                  setUserInfo({
                    ...userInFo,
                    'email': e.target.value
                  })
                }}
                placeholder="Enter Email"
                label="Email"
              />
            </div>
            <br />
            <div
              style={{
                display: "flex",
                flexDirection: "coloumn",
                flex: "50%",
                gap: "10px",
                paddingLeft: "2px",
                paddingRight: "2px",

              }}
            >
              <TextField
                fullWidth
                required

                type={"number"}
                name='phone'
                value={userInFo.phone}
                onChange={(e) => {
                  setUserInfo({
                    ...userInFo,
                    'phone': e.target.value
                  })
                }}
                placeholder="Enter Phone Number"
                label="Phone Number"
              />

              <TextField
                fullWidth
                required

                type={"text"}
                name='Address'
                value={userInFo.address}
                onChange={(e) => {
                  setUserInfo({
                    ...userInFo,
                    'address': e.target.value
                  })
                }}
                placeholder="Enter Address"
                label="Address"
              />
            </div>
            <br />
            <div
              style={{
                display: "flex",
                flexDirection: "coloumn",
                flex: "50%",
                gap: "10px",
                paddingLeft: "2px",
                paddingRight: "2px",

              }}>
              <TextField
                name='Password'
                fullWidth
                required
                value={userInFo.password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setUserInfo({
                    ...userInFo,
                    'password': e.target.value
                  })
                }}

                type={flag ? "password" : "text"}
                placeholder="Enter Password"
                label="Password"
              />

              <TextField
                fullWidth
                required

                name='confirm_Password'
                type={flag ? "password" : "text"}

                value={userInFo.confirm_password}
                onChange={(e) => {
                  setPasswordAgain(e.target.value);

                  setUserInfo({
                    ...userInFo,
                    'confirm_password': e.target.value
                  })
                }}

                placeholder="Enter Confirm Password"
                label="Confirm Password"
              />
            </div>
            <br />


            <FormControlLabel
              control={
                <Checkbox
                  name="checkedB"
                  color="primary"
                  onClick={() => setFlag(!flag)}
                />
              }
              label="Show Password"
            />

            <strong>
              <PasswordChecklist
                style={{ color: "black" }}
                rules={[
                  "minLength",
                  "specialChar",
                  "number",
                  "capital",
                  "match",
                ]}
                minLength={6}
                value={password}
                valueAgain={passwordAgain}
                onChange={(isValid) => { setFormIsValid(isValid) }}
              />
            </strong>
            <br />

            <Button
              disabled={!isFormValid}
              variant="contained"
              color="primary"
              onClick={handleSignUp}
              fullWidth
            >
              Sign up
            </Button>

            <br />
          </form>
          {showSignupModal && (
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
                      setShowSignupModal(false);
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
                    <strong>{errorMessage}</strong>
                  </h1>
                </section>
              </div>
            </div>
          )}
        </Paper>
      </Grid>
    </div>
  );
};
export default Signup;
