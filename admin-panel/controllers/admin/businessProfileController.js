const mongoose = require("mongoose");
const response = require("../../config/response");
const business = require("../../model/businessProfile");


const { Validator } = require("node-input-validator");
const helper = require("../../helper/helper");

const slugify = require("slugify");

module.exports.getAllBusiness = async (req, res) => {
  try {
    const page = parseInt(req.body.page);
    const limit = parseInt(req.body.limit);
    const skip = (page - 1) * limit;
    const getList = await business.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "CategoryId",
          foreignField: "_id",
          as: "category_details",
        },
      },
      {
        $lookup: {
          from: "subcategories",
          localField: "SubCategoryId",
          foreignField: "_id",
          as: "subCategory_details",
        },
      },
      { $skip: skip },
      { $limit: limit },
    ]);
    const totalCount = await business.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    if (getList.length > 0) {
      return response.returnTrue(req, res, "Record Found", getList, totalPages);
    } else {
      return response.returnFalse(req, res, "No Record Found", []);
    }
  } catch (err) {
    return response.returnFalse(req, res, err.message, []);
  }
};

module.exports.addbusiness = async (req, res) => {
  try {
     console.log(req.body);
    let v = new Validator(req.body,{
      name: "required|string",
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
    if(req.body.CategoryId.length>0){
      delete req.body.CategoryId;
      console.log("deleted category")
    }
    if(req.body.SubCategoryId.length>0){
      delete req.body.SubCategoryId;
      console.log("deleted sub catgeory")

    }
    if(req.body.metaKeyword){
      delete req.body.metaKeyword;
    }

    console.log(req.body);
    const data = new business(req.body);
    await data.save();

    return response.returnTrue(req, res, " Added Successfully", data);
  } catch (err) {
    return response.returnFalse(req, res, err.message, []);
  }
};

module.exports.deleteBusiness = async (req, res) => {
  try {
    const productId =new mongoose.Types.ObjectId(req.params.id); 
    await business.findByIdAndDelete(productId); 
    return response.returnTrue(req, res, "Record Deleted Successfully", []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports.updateBusiness = async (req, res) => {
  console.log(req.body);
  try {
    const checkData = await business.findOne({
      _id: new mongoose.Types.ObjectId(req.body.id.trim()),
    });

    if(!checkData){
      return response.returnFalse(
        req,
        res,
        "No product Found Of Such Id",
        []
      )
    }

    req.body.slug = slugify(req.body.name ?? "");
    req.body.name ??= "";
    
    if(!(req.body.email)) {
      delete req.body.email;
    }
    if(!(req.body.mobile_no)) {
      delete req.body.mobile_no;
    }
    if(!(req.body.password)) {
      delete req.body.password;
    }
    if(!(req.body.businessTitle)) {
      delete req.body.businessTitle;
    }
    if(!(req.body.businessTitle)) {
      delete req.body.businessTitle;
    }

    if(!(req.body.businessTitle)) {
      delete req.body.businessTitle;
    }

   
    if(!(req.body.CategoryId)|| req.body.CategoryId=="undefined") {
      delete req.body.CategoryId;
    }
    if(!(req.body.SubCategoryId)) {
      delete req.body.SubCategoryId;
    }
    if(!(req.body.gstin_no)) {
      delete req.body.gstin_no;
    }
    if(!(req.body.country)) {
      delete req.body.country;
    }
    if(!(req.body.state)) {
      delete req.body.state;
    }
    if(!(req.body.city)) {
      delete req.body.city;
    }
    if(!(req.body.city)) {
      delete req.body.city;
    }
    if(!(req.body.location)) {
       delete req.body.location;
    }
    if(!(req.body.pincode)) {
      delete req.body.pincode;
   }
   if(!(req.body.area)) {
    delete req.body.area;
 }
 if(!(req.body.businessAddress)) {
  delete req.body.businessAddress;
}
if(!(req.body.googleMap)) {
 req.body.googleMap="";
}
if(!(req.body.whatsappNo)) {
 delete req.body.whatsappNo;
 }

 if(!(req.body.website)) {
  delete req.body.website;
  }
  if(!(req.body.businessEmail)) {
    delete req.body.businessEmail;
  }
  if(!(req.body.facebook)) {
   req.body.facebook="";
  }
  if(!(req.body.instagram)) {
    req.body.instagram="";
   }
   if(!(req.body.twitter)) {
    req.body.twitter="";
   }
   if(!(req.body.linkedin)) {
    req.body.linkedin="";
   }
   if(!(req.body.youtube)) {
    req.body.youtube="";
   }
   if(!(req.body.mondayOpening)) {
    delete req.body.mondayOpening;
  }
  if(!(req.body.mondayClosing)) {
    delete req.body.mondayClosing;
  }
  if(!(req.body.tuesdayOpening)) {
    delete req.body.tuesdayOpening;
  }
  if(!(req.body.tuesdayClosing)) {
    delete req.body.tuesdayClosing;
  }
  if(!(req.body.wednesdayOpening)) {
    delete req.body.wednesdayOpening;
  }
  if(!(req.body.wednesdayClosing)) {
    delete req.body.wednesdayClosing;
  }
  if(!(req.body.thursdayOpening)) {
    delete req.body.thursdayOpening;
  }
  if(!(req.body.thursdayClosing)) {
    delete req.body.thursdayClosing;
  }
  if(!(req.body.fridayOpening)) {
    delete req.body.fridayOpening;
  }
  if(!(req.body.fridayClosing)) {
    delete req.body.fridayClosing;
  }
  if(!(req.body.saturdayOpening)) {
    delete req.body.saturdayOpening;
  }
  if(!(req.body.saturdayClosing)) {
    delete req.body.saturdayClosing;
  }

    if(!(req.body.shortDescription)) {
     req.body.shortDescription="";
    }
    if(!(req.body.longDescription)) {
      req.body.longDescription="";
    }


    if(!(req.body.accountNo)) {
      delete req.body.accountNo;
    }
    if(!(req.body.accountHolderName)) {
      delete req.body.accountHolderName;
    }
    if(!(req.body.bankName)) {
      delete req.body.bankName;
    }
    if(!(req.body.branchName)) {
      delete req.body.branchName;
    }

    if(!(req.body.ifscCode)) {
      delete req.body.ifscCode;
    }

    if(!(req.body.documentType)) {
      delete req.body.documentType;
    }
    if(!(req.body.documentIdNo)) {
      delete req.body.documentIdNo;
    }
   

    if(!(req.body.metaKeyword)) {
     req.body.metaKeyword="";
    }else{
      req.body.metaKeyword=JSON.parse(req.body.metaKeyword);
    }
    


    if (req.files?.documentImage!=undefined) {
      req.body.documentImage = process.env.IMAGE_PATH + req.files.documentImage[0].filename;
    }else{
      delete req.body.documentImage
    }
      if (req.files?.logo!=undefined) {
        req.body.logo = process.env.IMAGE_PATH + req.files.logo[0].filename;
      }else{
        delete req.body.logo
      }
      if (req.files?.banner!=undefined) {
        req.body.banner = process.env.IMAGE_PATH + req.files.banner[0].filename;
      }else{
        delete req.body.banner;
      }
      if(!(req.body.status)) {
        delete req.body.status;
      }

   let data= await business.findByIdAndUpdate(
      new mongoose.Types.ObjectId(req.body.id),
      req.body
    );
    return response.returnTrue(req, res, "update_success",data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


