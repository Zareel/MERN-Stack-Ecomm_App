import React, { useState, useContext } from "react";
import Layout from "../Components/Layout/Layout";
import AuthContext from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (data.success) {
        alert(data.message);
        setAuth({
          ...auth,
          user: data.user,
          token: data.token,
        });
        localStorage.setItem("auth", JSON.stringify(data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert("Error in Login");
    }
  };
  return (
    <Layout>
      <div className="w-full h-full">
        <div className="max-w-7xl mx-auto flex flex-col justify-center items-center py-14">
          <h1 className="text-5xl font-bold py-6 text-cyan-500">Login</h1>
          <div className="w-full">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col items-center gap-6 "
            >
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-[40%] py-2 px-6 bg-gray-800 text-white shadow-lg rounded-md text-md  border-none outline-none"
                required
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-[40%] py-2 px-6 bg-gray-800 text-white shadow-lg rounded-md text-md  border-none outline-none"
                required
              />

              <div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-500 to-slate-600 hover:bg-gray-600 font-semibold rounded-md text-2xl px-8 py-2 text-gray-200"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
