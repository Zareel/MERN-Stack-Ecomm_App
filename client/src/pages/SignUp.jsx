import React, { useContext } from "react";
import AuthContext from "../context/authContext";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    phone,
    setPhone,
    address,
    setAddress,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/auth/signup", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data.success) {
        alert(data.message);
        navigate("/login");
      } else {
        alert(data.error.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="w-full h-full">
        <div className="max-w-7xl mx-auto flex flex-col justify-center items-center">
          <h1 className="text-4xl font-semibold py-6 text-cyan-500 mb-6">
            SignUp
          </h1>
          <div className="w-full">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col items-center gap-6 "
            >
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-[40%] py-2 px-6 bg-gray-800 text-white shadow-lg rounded-md text-md  border-none outline-none"
                required
              />
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
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Mobile no:"
                className="w-[40%] py-2 px-6 bg-gray-800 text-white shadow-lg rounded-md text-md  border-none outline-none"
                required
              />
              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address:"
                className="w-[40%] py-2 px-6 bg-gray-800 text-white shadow-lg rounded-md text-md  border-none outline-none"
                required
              />

              <div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-500 to-slate-600 hover:bg-gray-600 font-semibold rounded-md text-xl px-8 py-2 text-gray-200 mt-6"
                >
                  Signup
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
