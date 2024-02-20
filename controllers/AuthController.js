const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserOTPVerification = require("../models/UserOTPVerification");
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "testn5624@gmail.com",
    pass: "avqfjpbjqgwtichz",
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready for message");
    console.log(success);
  }
});

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      let user = new User({
        name: null,
        username: req.body.username,
        email: req.body.email,
        designation: null,
        phone: null,
        password: hashedPass,
        verified: false,
      });

      user
        .save()
        .then((result) => {
          // res.json({
          //   message: "user Added Successfully",
          // });
          sendVerificationEmail(result, res);
        })
        .catch((error) => {
          res.json({
            message: error.message,
            // message: "An error occured!",
          });
        });
    }
  });
};

const sendVerificationEmail = async ({ _id, email }, res) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const mailOptions = {
      from: "testn5624@gmail.com",
      to: email,
      subject: "Verify Your Email",
      html: `<p>Enter <b>${otp}</b> in the app to verify your email address and compelete</p>This code <b>expires in 1 hour</b><p>`,
    };
    const saltRounds = 10;
    const hashedOTP = await bcrypt.hash(otp, saltRounds);
    const newOTPverification = new UserOTPVerification({
      userId: _id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });

    await newOTPverification.save().then((result) => {
      console.log("teet");

      transporter.sendMail(mailOptions);
      res.json({
        status: "pending",
        message: "Vefification otp email sent",
        data: {
          userId: _id,
          email,
        },
      });
    });
  } catch (error) {
    res.json({
      status: "Failed",
      message: error,
    });
  }
};

const verifyotp = async (req, res) => {
  try {
    console.log("test1");
    const { userId, otp } = req.body;
    if (!userId || !otp) {
      res.json({ error: "Empty otp details are not allowed" });
    } else {
      const UserOTPVerificationRecords = await UserOTPVerification.find({
        userId,
      });
      if (UserOTPVerificationRecords.length <= 0) {
        res.json({
          error:
            "Account record doesn't exist or has been verified already.please signup or login ",
        });
      } else {
        const { expiresAt } = UserOTPVerificationRecords[0];
        const hashedOTP = UserOTPVerificationRecords[0].otp;
        if (expiresAt < Date.now()) {
          await UserOTPVerification.deleteMany({ userId });
          res.json({ error: "Code has expired. Please request again." });
        } else {
          const validOTP = await bcrypt.compare(otp, hashedOTP);
          if (!validOTP) {
            res.json({ error: "Invalid code passed. check your inbox" });
          } else {
            await User.updateOne({ _id: userId }, { verified: true });
            await UserOTPVerification.deleteMany({ userId });
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: "Failed",
      message: error,
    });
  }
};

const login = (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ $or: [{ email: username }] }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          res.json({
            error: err,
          });
        }
        if (result) {
          let token = jwt.sign({ name: user.name }, "secretValue", {
            expiresIn: "2h",
          });
          let refreshtoken = jwt.sign(
            { name: user.name },
            "secretrefreshValue",
            {
              expiresIn: "2h",
            }
          );
          res.json({
            mesage: "login Successful",
            token,
            refreshtoken,
            userId: user.id,
          });
        } else {
          res.json({
            message: "Password does not matched!",
          });
        }
      });
    } else {
      res.json({
        message: "no User Found",
      });
    }
  });
};

// upadate an user
const updateuser = (req, res, next) => {
  let userId = req.body.userId;

  let updatedData = {
    name: req.body.name,
    username: req.body.username,
    phone: req.body.phone,
    designation: req.body.designation,
    profile_pic: req.body.profile_pic,
  };

  User.findByIdAndUpdate(userId, { $set: updatedData })
    .then(() => {
      res.json({
        message: "user updated successfuly!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error Occured!",
      });
    });
};

const refreshToken = (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  jwt.verify(refreshToken, "secretrefreshValue", function (err, decode) {
    if (err) {
      res.status(400).json({
        err,
        c,
      });
    } else {
      let token = jwt.sign({ name: jwt.decode.name }, "secretValue", {
        expiresIn: "2h",
      });
      let refreshToken = req.body.refreshToken;
      res.status(200).json({
        mesage: "Token refreshed successfully!",
        token,
        refreshToken,
      });
    }
  });
};

module.exports = {
  register,
  verifyotp,
  login,
  updateuser,
  refreshToken,
};
