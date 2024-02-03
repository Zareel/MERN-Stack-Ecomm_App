import express from "express";
import {
  logOut,
  login,
  signUp,
  testController,
} from "../controllers/authControllers.js";
import { isAdmin, isLoggedIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

//routes
//signup || method:post || /api/v1/auth/signup
router.post("/signup", signUp);

//login || method:post || /api/v1/auth/login
router.post("/login", login);
//logout || method:post || /api/v1/auth/logout
router.post("/logout", logOut);

//test || method:get || /api/v1/auth/test
router.get("/test", isLoggedIn, isAdmin, testController);

//protected user route || method:get || /api/v1/auth/user-auth
router.get("/user-auth", isLoggedIn, (req, res) => {
  res.status(200).json({ ok: true });
});

//protected admin route || method:get || /api/v1/auth/admin-auth
router.get("/admin-auth", isLoggedIn, isAdmin, (req, res) => {
  res.status(200).json({ ok: true });
});

export default router;
