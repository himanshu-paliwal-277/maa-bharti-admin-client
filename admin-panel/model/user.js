const mongoose = require("mongoose");
const constants = require("../config/constants");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    trim: true,
    maxLength: 15,
  },
  role: {
    type: String,
    required: true,
    enum: [constants.CONST_USER_ROLE, constants.CONST_ADMIN_ROLE],
    default: constants.CONST_USER_ROLE,
  },
  thought:{
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: true,
  },

  profileImage: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: [
      constants.CONST_DB_STATUS_ACTIVE,
      constants.CONST_DB_STATUS_INACTIVE,
    ],
    default: constants.CONST_DB_STATUS_ACTIVE,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports=mongoose.model("User",UserSchema)