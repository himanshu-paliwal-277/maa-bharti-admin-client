const response = require("../../config/response");
const videoGallery = require("../../model/videoGallery");
const { Validator } = require("node-input-validator");
const helper = require("../../helper/helper");
const slugify = require("slugify");
const mongoose= require('mongoose');

module.exports.getVideo = async (req, res) => {
  try{
    let getList;
    let totalPages=1;
    if(req.body.page&&req.body.limit){
    const page = parseInt(req.body.page);
    const limit = parseInt(req.body.limit);
    const skip = (page - 1) * limit;
     getList = await videoGallery.aggregate([
    
      { $skip: skip },
      { $limit: limit },
      { $sort: { createdAt: -1 } },
    ]);
    const totalCount = await videoGallery.countDocuments();
    totalPages = Math.ceil(totalCount / limit);
  }else{
    getList = await videoGallery.aggregate([
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



module.exports.addVideo = async (req, res) => {
  try {
    //check unique name

    const data = new videoGallery(req.body);
    await data.save();
    return response.returnTrue(req, res, "Added Successfully", []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.deleteVideo = async (req, res) => {
  try {
    const vId =new mongoose.Types.ObjectId(req.params.id); 
    await videoGallery.findByIdAndDelete(vId);

    return response.returnTrue(req, res,"Deleted Successfully", []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.updateVideo = async (req, res) => {
  try {
 

    await videoGallery.findByIdAndUpdate(new mongoose.Types.ObjectId(req.body.id), req.body);
    return response.returnTrue(req, res, "update_success", []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
