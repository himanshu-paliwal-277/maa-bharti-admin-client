const mongoose = require("mongoose");
const constants = require("../config/constants");

const thoughtsSchema = mongoose.Schema({
 
  text:{
    type: String,
    default: "",
  },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("thoughts", thoughtsSchema);
