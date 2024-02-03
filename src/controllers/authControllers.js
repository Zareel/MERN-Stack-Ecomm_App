import User from "../models/userSchema.js";
import mailHelper from "../utils/mailHelpers.js";
import crypto from "crypto";

export const cookieOptions = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

//signUp || method:post || route: /api/v1/auth/sighup
export const signUp = async (req, res) => {
  try {
    //destructure
    const { name, email, password, phone, address } = req.body;
    //validateion
    if (!name || !email || !password || !phone || !address) {
      res.status(400).json({
        success: false,
        message: "All the fields are required",
      });
    }
    //check if the user is already exists
    const existingUser = await User.findOne({ email });
    //if the user is existing send message
    if (existingUser) {
      res.status(200).json({
        success: false,
        message: "User already exists, please login",
      });
    }
    //if the user doesn't exists, create new user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      address,
    });
    //token
    const token = user.getJWTtoken();
    //safety
    user.password = undefined;
    //store this token in user's cookie
    res.cookie("token", token, cookieOptions);
    //send back response to user
    res.status(201).json({
      success: true,
      message: "User signed up successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in signing up",
      error,
    });
  }
};

//login || method:post || route: /api/v1/auth/login
export const login = async (req, res) => {
  try {
    //destructure
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found, Please signUp",
      });
    }
    //if use exists, compare password
    const isPasswordMatched = await user.comparePassword(password);

    // if password not matched, send msg
    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }
    //if password matched generate token
    const token = user.getJWTtoken();

    //flush out the password
    user.password = undefined;

    //setup the cookie
    res.cookie("token", token, cookieOptions);
    //console.log(token);

    res.status(200).json({
      success: true,
      message: "Login successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//logout || method:post || route: /api/v1/auth/logout
export const logOut = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log("Error in logout");
    res.status(500).json({
      success: false,
      message: "error in logging out",
      error,
    });
  }
};

//test
export const testController = (req, res) => {
  res.send("protected route");
};

//getUserProfile || method:get || route: /api/v1/auth/getProfile
export const getProfile = async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in getting userProfile",
      error,
    });
  }
};

/************************************************************
 * @FORGOT_PASSWORD
 * 





 
 * @route http://localhost:8000/api/v1/auth/password/forgot
 * @description User will submit email and we will generate token
 * @parameters email
 * @returns success message - email send
 ***********************************************************/

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.send(401).json({
        success: false,
        message: "Please provide email",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(40).json({
        success: false,
        message: "User not found",
      });
    }
    //reset token
    const resetToken = user.generateForgotPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/password/reset${resetToken}`;

    const text = `Your password reset url is
     \n\n  ${resetUrl} \n\n`;
    await mailHelper({
      email: user.email,
      subject: "Password reset email for website",
      text: text,
    });
    res.status(200).json({
      success: true,
      message: `Email send to ${user.email}`,
    });
  } catch (error) {
    //roll back, clear fields and save
    this.user.forgotPasswordToken = undefined;
    this.user.forgotPasswordToken = undefined;
    await this.user.save({ validateBeforeSave: false });

    console.log(error);
    res.status(500).json({
      success: false,
      message: "Email sent failure",
    });
  }
};

/************************************************************
 * @RESET_PASSWORD
 * @route http://localhost:8000/api/v1/auth/password/reset/:resetPasswordToken
 * @description User will be able to reset password based on url token
 * @parameters token from url, password, confirmPassword
 * @returns User Object
 ***********************************************************/

export const resetPassword = async (req, res) => {
  const { token: resetToken } = req.params;
  const { password, confirmPassword } = req.body;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    forgotPasswordToken: resetPasswordToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });
  if (!user) {
    res.status(400).json({
      success: false,
      message: "password token is invalid or expired",
    });
  }
  if (password !== confirmPassword) {
    res.status(400).json({
      success: false,
      message: "Password and confirm password does not match",
    });
  }
  user.password = password;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  await user.save();

  //create a token and send it as response
  const token = user.getJWTtoken();
  user.password = undefined;

  //helper method for cookie can be added
  res.cookie("token", token, cookieOptions);
  res.status(200).json({
    success: true,
    message: "Password has been updated",
    user,
  });
};

//todo create a controller for change password
