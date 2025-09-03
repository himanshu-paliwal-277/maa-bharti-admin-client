const mongoose = require('mongoose');
const constants = require("../config/constants");
const DistrictTehsilSchema = mongoose.Schema({
 
    district: { 
        type: String,
        required: true,
    },
    tehsils:{
        type:Array,
        default:[]
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('districtTehsil', DistrictTehsilSchema);