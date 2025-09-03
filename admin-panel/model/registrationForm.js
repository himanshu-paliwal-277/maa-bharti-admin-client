const mongoose = require("mongoose");
const constants = require("../config/constants");

const RegistrationFormSchema = mongoose.Schema({
  apply_for: {
    type: String,
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name:{
    type: String,
    required: true,
  },
  age:{
    type: String,
    required: true,
  },
  gender:{
    type: String,
    required: true,
  },
  mobile_no: {
    type: String,
    required: true,
    // unique: true,
    maxLength: 150,
  },
  email: {
    type: String,
    //required: true,
    default: "",
    //unique: true
  },
  state: {
    type: String,
    //required: true,
    default: "",
    //unique: true
  },
  district: {
    type: String,
    //required: true,
    default: "",
    //unique: true
  },
  town: {
    type: String,
    //required: true,
    default: "",
    //unique: true
  },
  jerseyNo:{
    type: String,
    default: "",
  },
  jerseyName:{
    type: String,
    default: "",
  },
  jerseySize:{
    type: String,
    default: "",
  },
  identityId:{
    type: String,
    default: "",
  },
  photo:{
    type: String,
    default: "",
  },
  resume:{
    type: String,
    default: "",
  },
  feeScreenShot:{
    type: String,
    default: "",
  },
status: {
    type: String,
    enum: [
      "Active",
      "Inactive",
    ],
    default: "Active",
  },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("registrations", RegistrationFormSchema);
