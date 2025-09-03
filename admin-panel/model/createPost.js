const mongoose = require("mongoose");
const constants = require("../config/constants");
const CreatePostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    // unique: true,
    maxLength: 150,
  },
  categoryId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  postCategory:{
    type:String,
    required:true
  },
  image: {
    type: String,
    default: "",
  },
  video: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  description: {
    type: String,
    default: "",
  },
  time: {
    type: String,
    default: "",
  },
  postType:{
    type: String,
    default: "",
  },
  slug: {
    type: String,
    required: true,
    // unique: true,
    maxLength: 150,
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

module.exports = mongoose.model("createPost", CreatePostSchema);
