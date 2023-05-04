const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();

//required variables
let algorithm = process.env.CRYPTO_ALGO;
let key = process.env.CRYPTO_KEY;
let iv = process.env.CRYPTO_IV;

//signup user
module.exports.userSignUp = async (req, res) => {
  try {
    const { username, token, password } = req.body;
    if (!username || !token || !password) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }

    const userRegistered = await userModel.findOne({ username: username });
    if (userRegistered) {
      return res.status(400).json({
        message: "User already registered",
      });
    }

    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encryptedToken =
      cipher.update(token, "utf8", "hex") + cipher.final("hex");

    const hashedPassword = await bcrypt.hash(password, 10);
    let data = await userModel.create({
      username,
      token: encryptedToken,
      password: hashedPassword,
    });

    const cookieToken = jwt.sign({ id: data._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    res.cookie("TOKEN", cookieToken, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      sameSite: "strict",
    });
    return res.status(200).json({
      message: "register success",
      auth: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

//sign in user
module.exports.userSignIn = async function userSignIn(req, res) {
  try {
    let { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }
    const user = await userModel.findOne({ username: username });
    if (!user) {
      return res.status(400).json({
        message: "please register",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });
      let decipher = crypto.createDecipheriv(algorithm, key, iv);
      let decrypted =
        decipher.update(user.token, "hex", "utf8") + decipher.final("utf8");

      res.cookie("TOKEN", token, {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      });

      return res.status(200).json({
        message: "User signed in successfully",
        auth: true,
      });
    } else {
      return res.status(400).json({
        message: "wrong credentials",
      });
    }
  } catch (err) {
    return res.status(500).json({
      err,
      message: "Internal server error",
    });
  }
};

//is authenticated or not
module.exports.isAuthenticated = async function isAuthenticated(req, res) {
  try {
    const { TOKEN } = req.cookies;
    if (!TOKEN) {
      return res.status(401).json({
        message: "Please login ",
      });
    }
    const { id } = jwt.verify(TOKEN, process.env.JWT_SECRET);
    const user = await userModel.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    } else {
      return res.status(201).json({
        message: "registered user",
        user,
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: "Please login to continue",
    });
  }
};
