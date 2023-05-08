const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const crypto = require("crypto");
require("dotenv").config();

const algorithm = process.env.CRYPTO_ALGO;
const key = process.env.CRYPTO_KEY;
const iv = process.env.CRYPTO_IV;

module.exports.authMiddleware = async (req, res, next) => {
  try {
    let { TOKEN } = req.cookies;
    if (req.headers.authorization === "" && !TOKEN) {
      //return if token is not there in the header or cookie
      return res.status(401).json({
        message: "Please login first",
      });
    }
    if (TOKEN === undefined) {
      //getting the token from the header if it is not there in the cookie
      TOKEN = req.headers.authorization.split(" ")[1];
    }
    const { id } = jwt.verify(TOKEN, process.env.JWT_SECRET);
    const user = await userModel.findById(id).select("-password");
    if (user) {
      let decipher = crypto.createDecipheriv(algorithm, key, iv);
      let decrypted =
        decipher.update(user.token, "hex", "utf8") + decipher.final("utf8");
      req.userToken = `Bearer ${decrypted}`;
      next();
    } else {
      next();
    }
  } catch (err) {
    return res.status(400).json({
      message: "Invalid token",
    });
  }
};
