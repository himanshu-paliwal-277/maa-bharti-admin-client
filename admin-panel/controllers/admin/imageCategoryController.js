const response = require("../../config/response");
const imageCategory = require("../../model/imageCategory");
const { Validator } = require("node-input-validator");
const helper = require("../../helper/helper");
const slugify = require("slugify");
const mongoose= require('mongoose');

module.exports.getImageCategory = async (req, res) => {
  try{
    let getList;
    let totalPages=1;
    if(req.body.page&&req.body.limit){
    const page = parseInt(req.body.page);
    const limit = parseInt(req.body.limit);
    const skip = (page - 1) * limit;
     getList = await imageCategory.aggregate([
    
      { $skip: skip },
      { $limit: limit },
      { $sort: { createdAt: -1 } },
    ]);
    const totalCount = await imageCategory.countDocuments();
    totalPages = Math.ceil(totalCount / limit);
  }else{
    getList = await imageCategory.aggregate([
      { $sort: { createdAt: -1 } },
    ]);
 }
    if (getList.length > 0) {
      return response.returnTrue(
        req,
        res,
       "record_found",
        getList,
        totalPages
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



module.exports.addImageCategory = async (req, res) => {
  try {
    //check unique name
    const checkUniqueName = await imageCategory.findOne({
      name: req.body.name,
    });
    if (checkUniqueName !== null) {
      return response.returnFalse(req, res, "Category  name must be unique", []);
    }
    let v = new Validator(req.body, {
      name: "required|string",
    });
    let matched = await v.check();
    if (!matched) {
      return response.returnFalse(
        req,
        res,
        helper.validationErrorConvertor(v),
        {}
      );
    }
    const data = new imageCategory(req.body);
    await data.save();
    return response.returnTrue(req, res, "Added Successfully", []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.deleteImageCategory = async (req, res) => {
  try {
    const CategoryId =new mongoose.Types.ObjectId(req.params.id); 
    await imageCategory.findByIdAndDelete(CategoryId);

    return response.returnTrue(req, res,"Deleted Successfully", []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.updateImageCategory = async (req, res) => {
  try {
    if(!req.body.name){
      delete req.body.name;
    }
    await imageCategory.findByIdAndUpdate(new mongoose.Types.ObjectId(req.body.id), req.body);
    return response.returnTrue(req, res, "update_success", []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
