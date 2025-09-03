const response = require("../../config/response");
const blog = require("../../model/blog");
const { Validator } = require("node-input-validator");
const helper = require("../../helper/helper");
const mongoose = require('mongoose');

module.exports.getblog = async (req, res) => {
  try {
    let getList;
    let totalPages = 1;

    if (req.body.page && req.body.limit) {
      const page = Number(req.body.page);
      const limit = Number(req.body.limit);
      const skip = (page - 1) * limit;

      getList = await blog.aggregate([
        { $match: { type: { $nin: ["rss", "mahapurush","new"] } } },
        { $sort: { blogSerialNo: 1 } },
        { $skip: skip },
        { $limit: limit }
      ]);

      const totalCount = await blog.countDocuments( { type: { $nin: ["rss", "mahapurush","new"] } });
      totalPages = Math.ceil(totalCount / limit);
    } else {
      getList = await blog.aggregate([
        { $match: { type: { $nin: ["rss", "mahapurush","new"] } } },
        { $sort:{ blogSerialNo: 1 }}
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
  } catch (err) {
    return response.returnFalse(req, res, err.message, []);
  }
};

module.exports.getHomeBannerBlogs = async (req, res) => {
  try {
    let getList;
      getList = await blog.aggregate([
        { $match: {homeblog: true } },
        { $sort: { orderForHomeBlog: 1 } },
      ]);

    if (getList.length > 0) {
      return response.returnTrue(
        req,
        res,
        "record_found",
        getList
      );
    } else {
      return response.returnFalse(req, res, "No Record Found", []);
    }
  } catch (err) {
    return response.returnFalse(req, res, err.message, []);
  }
};

module.exports.getRSSblog = async (req, res) => {
  try {
    let rssBlogs;
    let totalPages = 1;

    if (req.body.page && req.body.limit) {
      const page = Number(req.body.page);
      const limit = Number(req.body.limit);
      const skip = (page - 1) * limit;

      rssBlogs = await blog.aggregate([
        { $match: { type: "rss" } },
        { $sort: { rssSerialNo: 1 } },
        { $skip: skip },
        { $limit: limit }
      ]);

      const totalCount = await blog.countDocuments({ type: "rss" });
      totalPages = Math.ceil(totalCount / limit);
    } else {
      rssBlogs = await blog.aggregate([
        { $match: { type: "rss" } },
        { $sort: { rssSerialNo: 1 } }
      ]);
    }

    if (rssBlogs.length > 0) {
      return response.returnTrue(
        req,
        res,
        "record_found",
        rssBlogs,
        totalPages
      );
    } else {
      return response.returnFalse(req, res, "No Record Found", []);
    }
  } catch (err) {
    return response.returnFalse(req, res, err.message, []);
  }
};

module.exports.getMahapurushblog = async (req, res) => {
  try {
    let rssBlogs;
    let totalPages = 1;

    if (req.body.page && req.body.limit) {
      const page = Number(req.body.page);
      const limit = Number(req.body.limit);
      const skip = (page - 1) * limit;

      rssBlogs = await blog.aggregate([
        { $match: { type: "mahapurush" } },
        { $sort: { mahapurushSerialNo: 1 } },
        { $skip: skip },
        { $limit: limit }
      ]);

      const totalCount = await blog.countDocuments({ type: "mahapurush" });
      totalPages = Math.ceil(totalCount / limit);
    } else {
      rssBlogs = await blog.aggregate([
        { $match: { type: "mahapurush" } },
        { $sort: { mahapurushSerialNo: 1 } }
      ]);
    }

    if (rssBlogs.length > 0) {
      return response.returnTrue(
        req,
        res,
        "record_found",
        rssBlogs,
        totalPages
      );
    } else {
      return response.returnFalse(req, res, "No Record Found", []);
    }
  } catch (err) {
    return response.returnFalse(req, res, err.message, []);
  }
};

module.exports.getNewblog = async (req, res) => {
  try {
    let rssBlogs;
    let totalPages = 1;

    if (req.body.page && req.body.limit) {
      const page = Number(req.body.page);
      const limit = Number(req.body.limit);
      const skip = (page - 1) * limit;

      rssBlogs = await blog.aggregate([
        { $match: { type: "new" } },
        { $sort: { newSerialNo: 1 } },
        { $skip: skip },
        { $limit: limit }
      ]);

      const totalCount = await blog.countDocuments({ type: "new" });
      totalPages = Math.ceil(totalCount / limit);
    } else {
      rssBlogs = await blog.aggregate([
        { $match: { type: "new" } },
        { $sort: { newSerialNo: 1 } }
      ]);
    }

    if (rssBlogs.length > 0) {
      return response.returnTrue(
        req,
        res,
        "record_found",
        rssBlogs,
        totalPages
      );
    } else {
      return response.returnFalse(req, res, "No Record Found", []);
    }
  } catch (err) {
    return response.returnFalse(req, res, err.message, []);
  }
};

module.exports.addblog = async (req, res) => {
  try {
    console.log("Processing blog request", req?.file?.filename || "No file uploaded");
    
    if (!req.body.title) {
      return response.returnFalse(req, res, "Blog title is required", {});
    }
    
    const checkUniqueName = await blog.findOne({
      title: req.body.title,
      ...(req.body.id ? { _id: { $ne: req.body.id } } : {})
    });
    
    if (checkUniqueName) {
      return response.returnFalse(req, res, "Blog title must be unique", {});
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
    
    if (req?.file?.filename) {
      req.body.image = process.env.IMAGE_PATH + req.file.filename;
    }
    
    req.body.slug = await createHindiSlug(req.body.title);
    
    if (req.body.id) {
      const updatedBlog = await blog.findByIdAndUpdate(
        req.body.id,
        {
          $set: {
            title: req.body.title,
            description: req.body.description,
            navigationUrl: req.body.navigationUrl,
            date: req.body.date,
            slug: req.body.slug,
            ...(req.body.image ? { image: req.body.image } : {})
          }
        },
        { new: true }
      );
      
      if (!updatedBlog) {
        return response.returnFalse(req, res, "Blog not found", {});
      }
      
      return response.returnTrue(req, res, "Blog updated successfully", updatedBlog);
    }
    
    const newBlog = new blog(req.body);
    const savedBlog = await newBlog.save();
    
    return response.returnTrue(req, res, "Blog added successfully", savedBlog);
  } catch (err) {
    console.error("Error in addblog function:", err);
    return res.status(500).json({ success: false, message: "Server error occurred", error: err.message });
  }
};

module.exports.getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.body;
    const foundBlog = await blog.findOne({ slug });
    return response.returnTrue(req, res, "Blog fetched successfully", foundBlog);
  } catch (err) {
    console.error("Error in getBlogBySlug:", err);
  }
};

module.exports.deleteblog = async (req, res) => {
  try {
    const blogId = new mongoose.Types.ObjectId(req.params.id); 
    await blog.findByIdAndDelete(blogId);

    return response.returnTrue(req, res,"Deleted Successfully", []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.updateblog = async (req, res) => {
  try {
    let obj = {};
    if (req.body.title) {
      obj.title = req.body.title;
      obj.slug = await createHindiSlug(req.body.title);
    }
    if(req.body.description){
      obj.description = req.body.description;
    }
    if(req.body.date){
      obj.date = req.body.date;
    }
    if(req.body.rssSerialNo){
      obj.rssSerialNo = req.body.rssSerialNo;
    }
    if(req.body.blogSerialNo){
      obj.blogSerialNo = req.body.blogSerialNo;
    }
    if(req.body.mahapurushSerialNo){
      obj.mahapurushSerialNo = req.body.mahapurushSerialNo;
    }
    if(req.file){
      const image = req.file?.filename;
      if (image) {
        obj.image = process.env.IMAGE_PATH + image;
      }
    }
    await blog.findByIdAndUpdate(new mongoose.Types.ObjectId(req.body.id), obj);
    return response.returnTrue(req, res, "update_success", []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Hindi to English transliteration mapping
const hindiToEnglishMap = {
  // Vowels
  'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ii', 'उ': 'u', 'ऊ': 'uu',
  'ऋ': 'ri', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
  
  // Consonants
  'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'ङ': 'nga',
  'च': 'cha', 'छ': 'chha', 'ज': 'ja', 'झ': 'jha', 'ञ': 'nya',
  'ट': 'ta', 'ठ': 'tha', 'ड': 'da', 'ढ': 'dha', 'ण': 'na',
  'त': 'ta', 'थ': 'tha', 'द': 'da', 'ध': 'dha', 'न': 'na',
  'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma',
  'य': 'ya', 'र': 'ra', 'ल': 'la', 'व': 'va', 'श': 'sha',
  'ष': 'sha', 'स': 'sa', 'ह': 'ha', 'क्ष': 'ksha', 'त्र': 'tra',
  'ज्ञ': 'gya',
  
  // Vowel signs (matras)
  'ा': 'aa', 'ि': 'i', 'ी': 'ii', 'ु': 'u', 'ू': 'uu',
  'ृ': 'ri', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au',
  
  // Special characters
  '्': '', // Virama (halant)
  'ं': 'n', // Anusvara
  'ः': 'h', // Visarga
  'ँ': 'n', // Chandrabindu
};

function transliterateHindiToEnglish(text) {
  let result = '';
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    
    if (i < text.length - 1) {
      const compound = char + text[i + 1];
      if (hindiToEnglishMap[compound]) {
        result += hindiToEnglishMap[compound];
        i++;
        continue;
      }
    }
    
    if (hindiToEnglishMap[char]) {
      result += hindiToEnglishMap[char];
    } else if (/[a-zA-Z0-9]/.test(char)) {
      result += char;
    } else if (char === ' ') {
      result += ' ';
    }
  }
  
  return result;
}

function createHindiSlug(title) {
  const transliterated = transliterateHindiToEnglish(title);
  
  return transliterated
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}