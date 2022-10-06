import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [user, setUser] = useState(null);
  const [isadmin, setIsAdmin] = useState(true);
  const [loading, setLoading] = useState(false);

  console.log("In Auth Provider Context");
  function isUserLoggedIn() {
    return isLoggedIn;
  }

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      user ? setIsLoggedIn(true) : setIsLoggedIn(false);
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  function currentUsers() {
    return currentUsers?.email;
  }

  // useEffect(() => {
  //   let token = localStorage.getItem("token")?.toString() || "";

  //   try {
  //     let u = jwt_decode(token);
  //     if (u) {
  //       setIsLoggedIn(true);
  //       setUser(u);
  //     }
  //   } catch (error) {
  //     setIsLoggedIn(false);
  //   }
  // }, [isLoggedIn]);

  const value = {
    setIsLoggedIn,
    isUserLoggedIn,
    isLoggedIn,
    // user,
    setIsAdmin,
    isadmin,
    setCurrentUser,
    currentUsers,
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
