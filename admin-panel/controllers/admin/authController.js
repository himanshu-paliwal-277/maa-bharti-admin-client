const User = require("../../model/user");
const response = require("../../config/response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const helper = require("../../helper/helper");
const { Validator } = require("node-input-validator");
const constants = require("../../config/constants");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("keyforencryption");

// const companyProfile = require("../../model/companyProfile");
const mongoose = require("mongoose");

module.exports.adminLogin = async (req, res, next) => {
  try {
    // Check if admin user exists
    const userDefaultInfo = await User.findOne({ role: "2" });

    // If admin user does not exist, create it
    if (!userDefaultInfo) {
      const postData = {
        username: "admin",
        name: "admin",
        role: "2",
        password: "123456", // Plain text password
      };

      const user = new User(postData);
      await user.save();

      return response.returnTrue(req, res, "Admin user created", {});
    }

    // Validate input
    const data = req.body;
    const v = new Validator(data, {
      username: "required",
      password: "required",
    });

    const matched = await v.check();
    if (!matched) {
      return response.returnFalse(
        req,
        res,
        helper.validationErrorConvertor(v),
        {}
      );
    }

    // Find user by username
    const userInfo = await User.findOne({ username: data.username });
    if (!userInfo) {
      return response.returnFalse(req, res, "User does not exist", {});
    }

    // Compare plain text password
    if (data.password !== userInfo.password) {
      return response.returnFalse(req, res, "Invalid password", {});
    }

    // Generate token
    const token = jwt.sign(
      { id: userInfo._id },
      process.env.JWT_TOKEN_KEY,
      { expiresIn: constants.CONST_VALIDATE_SESSION_EXPIRE }
    );

    const tempObj = {
      _id: userInfo._id,
      username: userInfo.username,
      name: userInfo.name,
      token: token,
      role: userInfo.role,
    };

    return response.returnTrue(req, res, "Login successfully", tempObj);
  } catch (err) {
    return response.returnFalse(req, res, err.message, []);
  }
};


module.exports.changePassword = async (req, res, next) => {
  const body = req.body;

  const v = new Validator(req.body, {
    // id: 'required',
    old_pass: "required",
    new_pass: "required",
  });

  let matched = await v.check();

  if (!matched) {
    return response.returnFalse(
      req,
      res,
      helper.validationErrorConvertor(v),
      {}
    );
  }

  try {
    const userInfo = await User.findById(req.user.id);
    const validPassword = body.old_pass == cryptr.decrypt(userInfo.password);

    if (!validPassword) {
      return response.returnFalse(
        req,
        res,
        res.translate("invalid_password"),
        {}
      );
    }

    // const salt = await bcrypt.genSalt(10);
    let password = await cryptr.encrypt(body.new_pass);

    const updateInfo = await User.updateOne(
      { _id: req.user.id },
      { $set: { password: password } }
    );

    if (updateInfo.modifiedCount == 1) {
      return response.returnTrue(req, res, "password changed successfully", {});
    } else {
      return response.returnFalse(req, res, "oops please try again", {});
    }
  } catch (e) {
    return response.returnFalse(req, res, "oops please try again", {});
  }
};

module.exports.viewProfile = async (req, res, next) => {
  try {
    // console.log(req.user.id);
    const userInfo = await User.findById(req.user.id);
    if (userInfo) {
      return response.returnTrue(req, res, "Record Found", userInfo);
    } else {
      return response.returnFalse(req, res, "No Record Found", {});
    }
  } catch (e) {
    return response.returnFalse(req, res, "Oops please try again", {});
  }
};

module.exports.updateInfo = async (req, res, next) => {
  const body = req.body;
  const v = new Validator(req.body, {
    name: "required",
    post: "required",
    mobile_no: "required",
    state: "required",
    city: "required",
  });

  let matched = await v.check();
  if (req.file) {
    const image = req.file?.filename;
    if (image) {
      req.body.profileImage = process.env.IMAGE_PATH + image;
    }
  }
  if (!matched) {
    return response.returnFalse(
      req,
      res,
      helper.validationErrorConvertor(v),
      {}
    );
  }

  try {
    if (!req.body.name) {
      delete req.body.name;
    }
    if (!req.body.mobile_no) {
      delete req.body.mobile_no;
    }
    if (!req.body.city) {
      delete req.body.city;
    }
    if (!req.body.state) {
      delete req.body.state;
    }
    if (!req.body.post) {
      delete req.body.post;
    }
    const updateInfo = await User.updateOne({ _id: req.user.id }, req.body);

    return response.returnTrue(req, res, "Profile updated success");
  } catch (e) {
    return response.returnFalse(req, res, e.message, {});
  }
};

module.exports.forgotPassword = async (req, res, next) => {
  const body = req.body;
  let obj = {};

  const v = new Validator(req.body, {
    mobile_no: "required",
  });

  let matched = await v.check();

  if (!matched) {
    return response.returnFalse(
      req,
      res,
      helper.validationErrorConvertor(v),
      {}
    );
  }

  try {
    const userInfo = await User.findOne({ mobile_no: body.mobile_no });
    if (userInfo) {
      // const salt = await bcrypt.genSalt(10);
      // const newPassword = helper.generateRandomPassword();
      // const password = await bcrypt.hash(newPassword, salt);
      // let otp = Math.floor(1000 + Math.random() * 9000);

      // const updateInfo = await User.updateOne(
      //   { email: body.email },
      //   { $set: { otp: otp } }
      // );

      // if (updateInfo.modifiedCount == 1) {
      // console.log(userInfo.email);
      // let verify_code = cryptr.encrypt(userInfo.email);
      // let link = `${constants.CONST_APP_URL}verifyEmail/${verify_code}`;

      let templateDir = "./templates/";
      let messageBody = pug.renderFile(`${templateDir}forgot_password.pug`, {
        name: userInfo.name,
        email: userInfo.email,
        // link: link,
        password: cryptr.decrypt(userInfo.password),
      });
      sendMail(
        userInfo.email.toLowerCase(),
        "forgot_password_reset",
        messageBody
      );
      obj.email = userInfo.email;

      return response.returnTrue(
        req,
        res,
        "Sent password to your registered  email address",
        obj
      );
      // }
    } else {
      return response.returnFalse(
        req,
        res,
        "Email address is not registered kindly contact to administrator",
        {}
      );
    }
  } catch (e) {
    return response.returnFalse(req, res, e.message, {});
  }
};
