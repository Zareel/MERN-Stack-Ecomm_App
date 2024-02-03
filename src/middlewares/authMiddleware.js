import User from "../models/userSchema.js";
import config from "../config/index.js";
import JWT from "jsonwebtoken";
import AuthRoles from "../utils/AuthRoles.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }
    //if token found(loggedIn)
    const decodedJWTpayload = JWT.verify(token, config.JWT_SECRET);
    //req.user = decoded;
    req.user = decodedJWTpayload;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in middleware",
      error,
    });
  }
};

export const authorize =
  (...requiredRoles) =>
  async (req, res, next) => {
    try {
      if (!requiredRoles.includes(req.user.role)) {
        res.status(401).json({
          success: false,
          message: "You are not authorized to access this resource",
        });
      }
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error in authorization",
      });
    }
  };

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== AuthRoles.ADMIN) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Error in Admin Middleware",
      error,
    });
  }
};
