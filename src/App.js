import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./routes/MainRoutes";
import Navbar from "../src/components/Bars/Navbar";
import { useAuth } from "./contexts/AuthContext";
import { auth, db } from "./firebase";
import { useEffect } from "react";
import { useState } from "react";

function App() {

  const { isUserLoggedIn } = useAuth();
  console.log(isUserLoggedIn);


  return (
    <div style={{ marginBottom: -25 }}>
      <BrowserRouter>
        {isUserLoggedIn() ? (
          <>

            <Navbar />
            <MainRoutes />
          </>
        ) : (
          <MainRoutes />
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
