const mongoose = require("mongoose");

require("dotenv").config();

const userSchema = new mongoose.Schema(
  {
    strNickname: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 200,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
