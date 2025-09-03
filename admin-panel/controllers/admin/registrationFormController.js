const response = require("../../config/response");
const User = require("../../model/user");

const { Validator } = require("node-input-validator");
const helper = require("../../helper/helper");
const mongoose = require("mongoose");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("keyforencryption");
module.exports.getAllRegistration = async (req, res) => {
  try {
    let userList;
    let totalPages = 1;
    if (req.body.page && req.body.limit) {
      const page = parseInt(req.body.page);
      const limit = parseInt(req.body.limit);
      const skip = (page - 1) * limit;
      userList = await User.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      const totalCount = await User.countDocuments();
      totalPages = Math.ceil(totalCount / limit);
    } else {
      userList = await User.find().sort({ createdAt: -1 });
    }
    if (userList.length > 0) {
      return response.returnTrue(req, res, "record_found", userList, totalPages);
    } else {
      return response.returnFalse(req, res, "No Record Found", []);
    }
  } catch (err) {
    return response.returnFalse(req, res, err.message, []);
  }
};


module.exports.addRegistration = async (req, res) => {
  try {
    let v = new Validator(req.body, {
      name: "required|string",
      username: "required|string|maxLength:15",
      password: "required|string",
    });
    let matched = await v.check();
    if (!matched) {
      return response.returnFalse(req, res, helper.validationErrorConvertor(v), {});
    }
    if (req.files?.profileImage?.length > 0) {
      req.body.profileImage = process.env.IMAGE_PATH + req.files?.profileImage[0]?.filename;
    } else {
      delete req.body.profileImage;
    }
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      password:req.body.password,
      role: 1, // Setting role to 1
      thought: req.body.thought || "",
      profileImage: req.body.profileImage || "",
      state: req.body.state || "",
      city: req.body.city || "",
      status: req.body.status || "Active",
    });

    await newUser.save();
    return response.returnTrue(req, res, "User Added Successfully", []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.deleteRegistration = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.id);
    await User.findByIdAndDelete(userId);
    return response.returnTrue(req, res, "Deleted Successfully", []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

