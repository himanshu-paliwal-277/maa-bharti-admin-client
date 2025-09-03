const mongoose = require("mongoose");
const constants = require("../config/constants");
const BusinessProfileSchema = mongoose.Schema({

  // user details 
  name: {
    type: String,
    required: true,
    unique: true,
    maxLength: 150,
  },
  email:{
   type:String,
    required: true,
    unique: true,
    maxLength: 150,
  },
  mobile_no:{
  type:Number,
  required: true,
  },
  password:{
  type:String,
  required: true,
  },

  // business detail 
  businessTitle:{
    type:String,
    default:""
  },

  CategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    
  },
  SubCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",

  },

  gstin_no:{
    type:String,
    default:""
  },

  // contact details 
  country:{
   type:String,
   default:"",
  },
  state:{
    type:String,
    default:"",
  },
  city:{
    type:String,
    default:"",
  },
  location:{
    type:String,
    default:"",
  },
  pincode:{
    type:String,
    default:"",
  },
  area:{
    type:String,
    default:"",
  },
  businessAddress:{
    type:String,
    default:"",
  },
  googleMap:{
    type:String,
    default:"",
  },

  // social media information 
  whatsappNo:{
    type:String,
    default:"",
  },
  website:{
    type:String,
    default:"",
  },
  businessEmail:{
    type:String,
    default:"",
  },
  facebook:{
    type:String,
    default:"",
  },
  instagram:{
    type:String,
    default:"",
  },
  twitter:{
    type:String,
    default:"",
  },
  linkedin:{
    type:String,
    default:"",
  },
  youtube:{
    type:String,
    default:"",
  },


  // business image 

  logo:{
 type:String,
 default:""
  },
  banner:{
    type:String,
    default:""
  },


  // business hour 
  mondayOpening:{
   type:String,
    default:""
  },
  mondayClosing:{
    type:String,
    default:""
  },
  tuesdayOpening:{
    type:String,
     default:""
   },
   tuesdayClosing:{
     type:String,
     default:""
   },
   wednesdayOpening:{
    type:String,
     default:""
   },
   wednesdayClosing:{
     type:String,
     default:""
   },
   thursdayOpening:{
    type:String,
     default:""
   },
   thursdayClosing:{
     type:String,
     default:""
   },
   fridayOpening:{
    type:String,
     default:""
   },
   fridayClosing:{
     type:String,
     default:""
   },
   saturdayOpening:{
    type:String,
     default:""
   },
   saturdayClosing:{
     type:String,
     default:""
   },
// meta Keyword 
   metaKeyword:{
    type:Array,
    default:[]
  },
  //  business description 
  shortDescription: {
    type: String,
    default:""
  },
 
  longDescription:{
    type:String,
    default:""
  },

  //  bank details 

  accountNo:{
    type:String,
    default:""
  },
  accountHolderName:{
     type:String,
    default:""
  },
  bankName:{
    type:String,
    default:""
  },
  branchName:{
    type:String,
    default:""
  },
  ifscCode:{
    type:String,
    default:""
  },


  // KYC details 
  
documentType:{
  type:String,
  default:""
},
documentIdNo:{
  type:String,
  default:""
},
documentImage:{
  type:String,
  default:""
},
status: {
  type: String,
  enum: [
      constants.CONST_DB_STATUS_ACTIVE,
      constants.CONST_DB_STATUS_INACTIVE,
  ],
  default: constants.CONST_DB_STATUS_ACTIVE,
},

  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("BusinessProfile", BusinessProfileSchema);
