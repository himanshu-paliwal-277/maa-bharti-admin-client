const mongoose = require("mongoose");
const constants = require("../config/constants");

const VideoGallerySchema = mongoose.Schema({
 
  video:{
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
module.exports = mongoose.model("videoGallery", VideoGallerySchema);
