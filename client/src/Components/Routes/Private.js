import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/authContext";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const AuthChech = async (req, res) => {
      const { data } = await axios.get("/api/v1/auth/user-auth");
      if (data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) AuthChech();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Loader />;
}
