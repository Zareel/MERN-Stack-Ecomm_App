import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AuthContext from "../../context/authContext";
import axios from "axios";

const Header = () => {
  const [showList, setShowList] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  console.log(openMenu);

  const handleLogout = async () => {
    try {
      const { data } = await axios.post("/api/v1/auth/logout");
      if (data.success) {
        alert(data.message);
        setAuth({
          ...auth,
          user: null,
          token: "",
        });
        localStorage.removeItem("auth");
      }
    } catch (error) {
      console.log(error);
      alert("error in logging out");
    }
  };

  return (
    <header className="p-4 w-full ">
      <div className="max-w-7xl mx-auto flex justify-between h-16 ">
        <h1 className="flex items-center p-2 text-4xl font-semibold text-cyan-400 hover:text-cyan-600 cursor-pointer">
          ClickToCart
        </h1>
        <ul
          className={`items-stretch space-x-3 md:flex flex-row ${
            showList ? "flex flex-col absolute top-20 right-6 gap-4" : "hidden"
          }`}
        >
          <Link to="/" className="flex">
            <p className="flex items-center px-8 -mb-1 font-poppins text-lg text-gray-400 hover:text-gray-300 cursor-pointer">
              Home
            </p>
          </Link>

          {auth.user ? (
            <div className="flex relative">
              <Link to="/category" className="flex">
                <p className="flex items-center px-4 -mb-1 font-poppins text-lg text-gray-400 hover:text-gray-300 cursor-pointer">
                  Collection
                </p>
              </Link>
              <p className="flex items-center px-4 -mb-1 font-poppins text-lg text-gray-400 hover:text-gray-300 cursor-pointer">
                {auth.user.name}
              </p>

              <div
                onClick={() => setOpenMenu(!openMenu)}
                className="flex flex-col justify-center relative"
              >
                <p className="flex items-center px-4 -mb-1 font-poppins text-lg text-gray-400 hover:text-gray-300 cursor-pointer">
                  {auth.user.role} <ArrowDropDownIcon />
                </p>
                {openMenu ? (
                  <div className="flex flex-col absolute top-20 left-10 gap-4 text-lg ">
                    <Link
                      to={`/dashboard/${
                        auth.user.role === "ADMIN" ? "admin" : "user"
                      }`}
                      className="cursor-pointer text-gray-400 hover:text-gray-300"
                    >
                      Dashboard
                    </Link>
                    <p className="cursor-pointer text-gray-400 hover:text-gray-300">
                      Profile
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <Link to="/" onClick={handleLogout} className="flex">
                <p className="flex items-center px-4 -mb-1 font-poppins text-lg text-gray-400 hover:text-gray-300 cursor-pointer">
                  LogOut
                </p>
              </Link>
              <Link to="/cart" className="flex">
                <p className="flex items-center text-gray-400 px-4 -mb-1 hover:text-gray-300">
                  <ShoppingCartIcon /> <span>0</span>
                </p>
              </Link>
            </div>
          ) : (
            <div className="flex">
              <Link to="/login" className="flex">
                <p className="flex items-center px-4 -mb-1 font-poppins text-lg hover:text-gray-300 cursor-pointer">
                  Login
                </p>
              </Link>
              <Link to="/signup" className="flex">
                <p className="flex items-center px-4 -mb-1 font-poppins text-lg hover:text-gray-300 cursor-pointer">
                  SignUp
                </p>
              </Link>
            </div>
          )}
        </ul>
        <button
          onClick={() => {
            setShowList((open) => !open);
          }}
          className="flex justify-end p-4 md:hidden"
        >
          {showList ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
    </header>
  );
};

export default Header;
