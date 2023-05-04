const express = require("express");
const { userSignUp, userSignIn } = require("../controllers/authController");

const authRouter = express.Router();

authRouter.route("/signup").post(userSignUp);
authRouter.route("/signin").post(userSignIn);

// authRouter.route("/isAuth").get(isAuthenticated);
module.exports = authRouter;
