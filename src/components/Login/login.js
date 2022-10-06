import React from "react";
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import pic from "../Login/images/signuppic.png";
import pic from "./images/signuppic.png";
import { useAuth } from "../../contexts/AuthContext"
import { useState } from "react";
import "./login.css";
import { auth, sendPasswordResetEmail } from "../../firebase"
// import { Email } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const paperStyle = {
    padding: 20,
    height: "65vh",
    width: 280,
    margin: "50px",
    webkitfilter: "blur(8px)",
    backdropfilter: "blur(8px)",
  };

  // const [loading, setLoading] = useState(false)
  // useEffect(() => {
  //   setLoading(true)
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, 5000)
  // }, [])


  const avatarStyle = { backgroundColor: "#FF9066" };
  const [errorMessage, seterrorMessage] = useState("");
  const [flag, setFlag] = useState(true);
  const { setIsLoggedIn } = useAuth();
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const [data, setData] = useState({
    username: '',
    password: ''
  })
  const handleSignIn = () => {

    auth
      .signInWithEmailAndPassword(data.username, data.password)
      .then(userCredentials => {
        setData({
          username: '',
          password: ''
        });
        // navigation.replace('tabs')

        setIsLoggedIn(true)

      })

      .catch(error => {

        setShowLoginModal(true)
        // setModalVisible(!modalVisible)
        // setAlert({
        //     title: 'Error',
        //     message: error.message
        // })
      })
  }


  const handleModal = () => {


    setShowErrorModal(true);

    setTimeout(() => {
      setShowErrorModal(false);
    }, 2000);
  }



  const handleRoute = () => {

    setTimeout(() => {
      route();
    }, 2000);
  }



  let navigates = useNavigate();
  const route = () => {
    let path = "/";
    navigates(path);
  };



  return (
    <div style={{ height: window.innerHeight }} id="login">
      <div
        style={{
          flex: 0.15,
        }}
      >
        <img
          style={{
            height: "100px",
            borderRadius: "15%",
            maxWidth: "100%",
            position: "absolute",
            top: "30px",
            left: "30px",
            opacity: "0.9"
          }}
          src={pic}
        />
      </div>
      <Grid
        style={{
          flex: 0.1,
          marginLeft: "600px"
        }}
      >
        <Paper elevation={10} style={paperStyle} className="paper">
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <br />
            <h2 style={{ color: "black", fontSize: "x-large" }}>
              <strong>Sign In</strong>
            </h2>
          </Grid>
          <br />
          <TextField
            label="Username"
            placeholder="Enter Username"
            name="username"
            onChange={(e) => {
              setData({
                ...data,
                username: e.target.value
              })
            }}
            fullWidth
            value={data.username}
            required
          />
          <br />
          <br />
          <TextField
            label="Password"
            placeholder="Enter Password"
            name="password"
            type={flag ? "password" : "text"}
            security="false"
            value={data.password}

            onChange={(e) => {
              setData({
                ...data,
                password: e.target.value
              })
            }}
            fullWidth
            required
          />
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
          <br />
          <br />
          <Button
            onClick={() => handleSignIn()}
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
          >
            SIGN IN
          </Button>
          <br /><br />
          <button className="fpbtn" onClick={() => setShowForgotModal(true)}>Forgot Password ?</button>
          <br />
          <br />
        </Paper>


        {showLoginModal && (
          <div class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-card">
              <header style={{ backgroundColor: "#8624DB" }} class="modal-card-head">
                <p class="modal-card-title"><strong></strong></p>
                <button
                  onClick={() => setShowLoginModal(false)}
                  class="delete"
                  aria-label="close"
                ></button>
              </header>
              <section class="modal-card-body">

                <h1 style={{
                  color: "black",
                  fontSize: 25,
                  textAlign: "center",
                }}  >
                  <strong>Invalid Username/Password</strong>
                  <p>Please provide valid username/password</p>
                </h1>
              </section>
            </div>
          </div>
        )}


        {showErrorModal && (
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
                <span
                  onClick={() => {
                    setShowErrorModal(false);
                  }}
                  class="delete"
                  aria-label="close"
                ></span>
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


        {showForgotModal && (
          <div class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-card">
              <header style={{ backgroundColor: "#8624DB", color: "black" }} class="modal-card-head">
                <p class="modal-card-title"><strong>Enter Your Email for Reset Password Link</strong></p>
                <button
                  onClick={() => setShowForgotModal(false)}
                  class="delete"
                  aria-label="close"
                ></button>
              </header>
              <section class="modal-card-body">

                <TextField
                  label="Email"
                  placeholder="Enter Email "
                  name="Email"

                  onChange={(e) => {
                    setData({
                      ...data,
                      username: e.target.value
                    })
                  }}
                  fullWidth

                  required
                />
                {/* <h1 style={{
                  color: "black",
                  fontSize: 25,
                  
                }}  >
                  <strong>Invalid Username/Password</strong>
                  <p>Please provide valid username/password</p>
                </h1> */}
                <br /><br />
                <Button

                  style={{ textAlign: "center" }}
                  // const useremail={data.username}
                  onClick={() => {
                    auth.sendPasswordResetEmail(data.username)
                    setShowForgotModal(false);
                    seterrorMessage("Password Reset Email Sent.");
                    handleModal();
                    handleRoute();
                  }}

                  // onClick={() => sendPasswordResetEmail(auth, email)}
                  type="submit"
                  color="primary"
                  variant="contained"
                  fullWidth
                >
                  Send
                </Button>
              </section>
            </div>
          </div>
        )
        }

      </Grid >
    </div >
  );
};

export default Login;
