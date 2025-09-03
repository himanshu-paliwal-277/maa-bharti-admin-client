const mongoose = require("mongoose");
const blogDetailsSchema = mongoose.Schema({
  description: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: "",
  },
  homeblog: {
    type: Boolean,
    default: false,
  },
  orderForHomeBlog: {
    type: Number,
    default: 0,
  },
  rssSerialNo:{
    type: Number,
    default: 0,
  },
  mahapurushSerialNo:{
    type: Number,
    default: 0,
  },
  blogSerialNo:{
    type: Number,
    default: 0,
  },
  newSerialNo:{
 type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: "",
  },
  slug: {
    type: String,
    unique:true,
    default: "",
  },

  title: {
    type: String,
    default: ""
  },
  navigationUrl: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: ""
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("blogDetails", blogDetailsSchema);
