const response = require("../../config/response");
const thoughts = require("../../model/thoughts");
const { Validator } = require("node-input-validator");
const helper = require("../../helper/helper");
const slugify = require("slugify");
const mongoose= require('mongoose');
const user = require("../../model/user");
module.exports.updateThought = async (req, res) => {
  try {
    if(!req.body.text){
      delete req.body.text;
    }
   let ans= await user.findByIdAndUpdate(new mongoose.Types.ObjectId(req.user.id), {thought:req.body.text});
    return response.returnTrue(req, res, "update_success", []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
