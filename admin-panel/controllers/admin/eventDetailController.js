// const response = require("../../config/response");
// const eventDetails = require("../../model/blog");
// const { Validator } = require("node-input-validator");
// const helper = require("../../helper/helper");
// const slugify = require("slugify");
// const mongoose= require('mongoose');

// module.exports.getEventDetail = async (req, res) => {
//   try{
//     let getList;
//     let totalPages=1;
//     if(req.body.page&&req.body.limit){
//     const page = parseInt(req.body.page);
//     const limit = parseInt(req.body.limit);
//     const skip = (page - 1) * limit;
//      getList = await eventDetails.aggregate([
//       {
//         $lookup:{
//           from: "events",
//           localField: "eventId",
//           foreignField: "_id",
//           as: "Event",
//         }
//       },
//       { $skip: skip },
//       { $limit: limit },
//       { $sort: { createdAt: -1 } },
//     ]);
//     const totalCount = await eventDetails.countDocuments();
//     totalPages = Math.ceil(totalCount / limit);
//   }else{
//     getList = await eventDetails.aggregate([
//       {
//         $lookup:{
//           from: "events",
//           localField: "eventId",
//           foreignField: "_id",
//           as: "Event",
//         }
//       },
//       { $sort: { createdAt: -1 } },
//     ]);
//  }
//     if (getList.length > 0) {
//       return response.returnTrue(
//         req,
//         res,
//        "record_found",
//         getList,
//         totalPages
//       );
//     } else {
//       return response.returnFalse(req, res, "No Record Found", []);
//     }
//   }catch(err){
//    return response.returnFalse(
//     req,
//     res,
//     err.message,
//     []
//    )
//   }

// };

// module.exports.addEventDetails = async (req, res) => {
//   try {
//     //check unique name
//     console.log(req.body);

//     let v = new Validator(req.body, {
//       details: "required|string",
//     });
//     let matched = await v.check();
//     if (!matched) {
//       return response.returnFalse(
//         req,
//         res,
//         helper.validationErrorConvertor(v),
//         {}
//       );
//     }
//     const data = new eventDetails(req.body);
//     await data.save();
//     return response.returnTrue(req, res, "Added Successfully", []);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
// module.exports.getEventDetailById = async (req, res) => {
//   try {
//     const event   = await eventDetails.aggregate([
//       {
//         $match: { eventId: new mongoose.Types.ObjectId(req.params.id) }
//       },
//       {
//         $lookup:{
//           from: "events",
//           localField: "eventId",
//           foreignField: "_id",
//           as: "Event",
//         }
//       },
//       { $sort: { createdAt: -1 } },
//     ]);
//     if (!event) {
//       return response.returnFalse(req, res, "No Event Found", []);
//     }
//     return response.returnTrue(req, res, "record_found", event);
//   } catch (err) {
//     return response.returnFalse(req, res, err.message, []);
//   }
// }

// module.exports.deleteEventDetails = async (req, res) => {
//   try {
//     const eventId =new mongoose.Types.ObjectId(req.params.id); 
//     await eventDetails.findByIdAndDelete(eventId);

//     return response.returnTrue(req, res,"Deleted Successfully", []);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// module.exports.updateEventDetails = async (req, res) => {
//   try {
//     let obj = {};
//     if (req.body.details) {
//       obj.details=req.body.details;
      
//     }
//    if(req.body.date){
//     obj.date=req.body.date;
//    }
//      if(req.body.eventId){
//     obj.eventId=req.body.eventId;
//    }
//    if(req.body.status){
//     obj.status=req.body.status;
//    }
  
//     await eventDetails.findByIdAndUpdate(new mongoose.Types.ObjectId(req.body.id), obj);
//     return response.returnTrue(req, res, "update_success", []);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
