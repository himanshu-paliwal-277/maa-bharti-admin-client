const mongoose = require("mongoose");
const constants = require("../config/constants");

const ImageGallerySchema = mongoose.Schema({
//  categoryId:{
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "imagecategories",
//   required: true,
//  },
  image:{
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
module.exports = mongoose.model("imageGallery", ImageGallerySchema);
