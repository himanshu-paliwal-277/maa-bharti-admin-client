const constants = require("../../config/constants");
const response = require("../../config/response");
const metaKeyword = require("../../model/metaKeywords");
const { Validator } = require("node-input-validator");
const helper = require("../../helper/helper");
const slugify = require("slugify");
const mongoose= require('mongoose');

module.exports.getMetaKeywords = async (req, res) => {
  try{
    const getList = await metaKeyword.find({}).sort({ createdAt: -1 });
    if (getList.length > 0) {
      return response.returnTrue(
        req,
        res,
       "record_found",
        getList
      );
    } else {
      return response.returnFalse(req, res, "No Record Found", []);
    }
  }catch(err){
    return response.returnFalse(
      req,
      res,
      err.message,
      []
    )

  }

};

module.exports.addMetaKeyword = async (req, res) => {
  try {
    let keyword=req.body.keyword;
    for (const val of keyword){
      const data= new metaKeyword({keyword:val});
      await data.save();
    }

    return response.returnTrue(req, res, "Added Successfully", []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.deleteMetaKeyword = async (req, res) => {
  try {
    await metaKeyword.findByIdAndDelete(new mongoose.Types.ObjectId(req.params.id));
    return response.returnTrue(req, res,"Deleted Successfully", []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.updateColor = async (req, res) => {
  try {

    console.log(req.body);
    let obj = {};
    if (req.body.keyword) {
      obj.keyword=req.body.keyword;
    }
   if(req.body.status){
    obj.status=req.body.status;
   }
    await metaKeyword.findByIdAndUpdate(new mongoose.Types.ObjectId(req.body.id), obj);
    return response.returnTrue(req, res, "update_success", []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
