const mongoose = require('mongoose');
const constants = require("../config/constants");
const EventSchema = mongoose.Schema({
 
    name: { 
        type: String,
        required: true,
        // unique: true,
        maxLength: 150 
    },

    titleText: { 
        type: String,
       default:""
    },
    altText:{
        type: String,
        default:""

    },
    order:{
        type:Number,
    },
    description:{
     type:String,
     default:""
    },
    image:{
        type:String,
        default:""
    },
    
    slug: { 
        type: String,
        required: true,
        unique: true,
        maxLength: 150 
    },
     isDeleted:{
      type:Boolean,
      default:false
     },
    status: {
        type: String,
        enum: [constants.CONST_DB_STATUS_ACTIVE, constants.CONST_DB_STATUS_INACTIVE],
        default: constants.CONST_DB_STATUS_ACTIVE
    },
 
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Event', EventSchema);