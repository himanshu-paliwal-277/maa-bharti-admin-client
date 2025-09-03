const response = require("../../config/response");
const contact = require("../../model/contact");
const { Validator } = require("node-input-validator");
const helper = require("../../helper/helper");
const slugify = require("slugify");
const mongoose= require('mongoose');

module.exports.getAllContacts = async (req, res) => {
  try{
    let getList;
    let totalPages=1;
    if(req.body.page&&req.body.limit){
    const page = parseInt(req.body.page);
    const limit = parseInt(req.body.limit);
    const skip = (page - 1) * limit;
     getList = await contact.aggregate([
      { $skip: skip },
      { $limit: limit },
      { $sort: { createdAt: -1 } },
    ]);
    const totalCount = await contact.countDocuments();
    totalPages = Math.ceil(totalCount / limit);
  }else{
    getList = await contact.aggregate([
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

module.exports.addContact = async (req, res) => {
  try {
    //check unique name
    console.log(req.body);

    let v = new Validator(req.body, {
      name: "required|string",
      mobile_no:"required",
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
  
    const data = new contact(req.body);
    await data.save();
    return response.returnTrue(req, res, "Added Successfully", []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.deleteContact = async (req, res) => {
  try {
    const contactId =new mongoose.Types.ObjectId(req.params.id); 
    await contact.findByIdAndDelete(contactId);

    return response.returnTrue(req, res,"Deleted Successfully", []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


