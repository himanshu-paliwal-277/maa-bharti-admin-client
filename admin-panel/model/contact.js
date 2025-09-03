const mongoose = require("mongoose");
const constants = require("../config/constants");

const ContactSchema = mongoose.Schema({

  name:{
    type: String,
    required: true,
  },
  
  mobile_no: {
    type: String,
    required: true,
    // unique: true,
    maxLength: 150,
  },
 subject:{
    type: String,
    default: "",
  },
 message:{
    type: String,
    maxLength: 1000,
  },
 
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("contact", ContactSchema);
