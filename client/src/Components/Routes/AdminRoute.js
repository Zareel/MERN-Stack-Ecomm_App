import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/authContext";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Loader from "../Loader";
export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const AuthChech = async (req, res) => {
      const { data } = await axios.get("/api/v1/auth/admin-auth");
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
