const response = require("../../config/response");
const CreatePost = require("../../model/createPost");
const { Validator } = require("node-input-validator");
const helper = require("../../helper/helper");
const slugify = require("slugify");
const mongoose= require('mongoose');

module.exports.getPosts = async (req, res) => {
  try{
    let getList;
    let totalPages=1;
    if(req.body.page&&req.body.limit){
    const page = parseInt(req.body.page);
    const limit = parseInt(req.body.limit);
    const skip = (page - 1) * limit;
     getList = await CreatePost.aggregate([
      {
        $lookup:{
          from: "imagecategories",
          localField: "categoryId",
          foreignField: "_id",
          as: "subcategory",
        }
      },
      { $skip: skip },
      { $limit: limit },
      { $sort: { createdAt: -1 } },
    ]);
    const totalCount = await CreatePost.countDocuments();
    totalPages = Math.ceil(totalCount / limit);
  }else{
    getList = await CreatePost.aggregate([
      {
        $lookup:{
          from: "imagecategories",
          localField: "categoryId",
          foreignField: "_id",
          as: "subcategory",
        }
      },
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

module.exports.addPosts = async (req, res) => {
  try {
    //check unique name

    console.log("req.body",req.body);
    const checkUniqueName = await CreatePost.findOne({
      title: req.body.title,
    });
    if (checkUniqueName !== null) {
      return response.returnFalse(req, res, "name must be unique", []);
    }
    let v = new Validator(req.body, {
      title: "required|string",
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
    req.body.slug = slugify(req.body.title);
    // console.log("filename", req.file.filename);
    if(req.file?.filename){
      req.body.image = process.env.IMAGE_PATH + req.file.filename;
    }

    const data = new CreatePost(req.body);
    await data.save();
    return response.returnTrue(req, res, "Added Successfully", []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.deletePost = async (req, res) => {
  try {
    const categoryId =new mongoose.Types.ObjectId(req.params.id); 
    await CreatePost.findByIdAndDelete(categoryId);

    return response.returnTrue(req, res,"Deleted Successfully", []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.updatePost = async (req, res) => {
  try {
    let obj = {};
    if (req.body.title) {
      obj.title=req.body.title;
      req.body.slug = slugify(req.body.title);
    }
   if(req.body.video){
    obj.video=req.body.video;
   }
   if(req.body.date){
    obj.date=req.body.date;
   }
   if(req.body.time){
    obj.time=req.body.time;
   }
   if(req.body.postType){
    obj.postType=req.body.postCategory;
   }
   if(req.body.postCategory){
    obj.postCategory= req.body.postCategory;
   }
   if(req.body.categoryId){
    obj.categoryId=req.body.categoryId;
   }

   if(req.body.description){
    obj.description=req.body.description;
   }
   if(req.body.status){
    obj.status=req.body.status;
   }
   if(req.file){
    const image = req.file?.filename;
    if (image) {
      obj.image = process.env.IMAGE_PATH + image;
    }
   }
    await CreatePost.findByIdAndUpdate(new mongoose.Types.ObjectId(req.body.id), obj);
    return response.returnTrue(req, res, "update_success", []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
