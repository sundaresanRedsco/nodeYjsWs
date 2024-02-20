const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 150,
    },
    username: {
      type: String,
      maxlength: 50,
      required: true,
      unique: true,
      
    },
    email: {
      type: String,
      required: true,
      maxlength: 150,
      unique: true,
    },
    designation: {
      type: String,
      maxlength: 150,
    },
    phone: {
      type: String,
      maxlength: 10,
    },
    profile_pic: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);

module.exports = User;
