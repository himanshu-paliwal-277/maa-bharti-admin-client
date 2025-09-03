const response = require("../../config/response");
const imageGallery = require("../../model/imageGallery");
const mongoose = require('mongoose');

module.exports.getImages = async (req, res) => {
  try {
    let getList;
    let totalPages = 1;
    
    if (req.body.page && req.body.limit) {
      const page = parseInt(req.body.page);
      const limit = parseInt(req.body.limit);
      const skip = (page - 1) * limit;
      
      getList = await imageGallery.aggregate([
        { $skip: skip },
        { $limit: limit },
        { $sort: { createdAt: -1 } },
      ]);
      
      const totalCount = await imageGallery.countDocuments();
      totalPages = Math.ceil(totalCount / limit);
    } else {
      getList = await imageGallery.aggregate([
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
  } catch(err) {
    return response.returnFalse(
      req,
      res,
      err.message,
      []
    );
  }
};

module.exports.addImage = async (req, res) => {
  try {
    if (req.file && req.file.filename) {
      req.body.image = process.env.IMAGE_PATH + req.file.filename;
    }
    
    const data = new imageGallery(req.body);
    await data.save();
    
    return response.returnTrue(req, res, "Image Added Successfully", []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.deleteImage = async (req, res) => {
  try {
    const imgId = new mongoose.Types.ObjectId(req.params.id); 
    await imageGallery.findByIdAndDelete(imgId);

    return response.returnTrue(req, res, "Image Deleted Successfully", []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.updateImage = async (req, res) => {
  try {
    if (req.file) {
      const image = req.file?.filename;
      if (image) {
        req.body.image = process.env.IMAGE_PATH + image;
      }
    }
    
    await imageGallery.findByIdAndUpdate(
      new mongoose.Types.ObjectId(req.body.id), 
      req.body
    );
    
    return response.returnTrue(req, res, "Image Updated Successfully", []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};