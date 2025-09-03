const mongoose = require("mongoose");
const profileSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role:{
   type: String,
   required: true,
  },
  gender:{
    type:String,
    required: true,
  },
  state:{
    type: String,
    required: true,
  },
  city:{
    type: String,
    required: true,
  },
  post:{
    type: String,
    required: true,
  },
  image:{
    type: String,
    required: true,
  },
  mobile_no: {
    type: String,
    required: true,
    // unique: true,
    maxLength: 150,
  },
  password:{
    type: String,
    required: true,
    minLength: 4,
    maxLength: 150,
  }
});
module.exports = mongoose.model("Profile", profileSchema);
