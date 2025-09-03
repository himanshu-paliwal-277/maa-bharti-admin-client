const response = require("../../config/response");
const districtTehsil = require("../../model/districtTehsil");
const mongoose= require("mongoose");
module.exports.getAllDistrictTehsil = async (req, res) => {
    try {
      let  getList = await districtTehsil.find({}).sort({ createdAt: -1 });
      if (getList.length > 0) {
        return response.returnTrue(req, res, "Record Found", getList);
      } else {
        return response.returnFalse(req, res, "No Record Found", []);
      }
    } catch (err) {
      return response.returnFalse(req, res, err.message, []);
    }
  };

  // module.exports.updateTehsils = async (req, res) => {
  //   try {
  //     let data = await districtTehsil.findOne({ district: req.body.district });
  //     if (!data) {
  //       return response.returnFalse(req, res, "District not found", []);
  //     }
  
  //     let tehsils = [...data.tehsils]; // create a new array
  //     if (!tehsils.includes(req.body.tehsil)) {
  //       tehsils.push(req.body.tehsil);
  //     }
  
  //     let obj = { tehsils }; // create an object with the updated tehsils array
  
  //     const updatedData = await districtTehsil.findByIdAndUpdate(
  //       new mongoose.Types.ObjectId(data._id),
  //       obj,
  //       { new: true }
  //     );
  
  //     return response.returnTrue(req, res, "successfully updated", updatedData);
  //   } catch (err) {
  //     res.status(500).json({ error: err.message });
  //   }
  // };

