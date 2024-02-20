const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserOTPVerificationSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
    },
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const UserOTPVerification = mongoose.model(
  "UserOTPVerification",
  UserOTPVerificationSchema
);
module.exports = UserOTPVerification;
