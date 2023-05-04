const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: [true, "token is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;
