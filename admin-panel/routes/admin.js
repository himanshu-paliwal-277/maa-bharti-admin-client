const express = require("express");
const router = express.Router();
const adminAuthController= require("../controllers/admin/authController");
const adminAuthMiddleware = require("../middleware/auth");
const userController = require("../controllers/admin/userController");
const statesController=require("../controllers/admin/stateController");
const districtTehsilController=require("../controllers/admin/districtTehsilController");
const createPostController = require('../controllers/admin/createPostController');
const blogController = require("../controllers/admin/blogController");
// const eventDetailController = require("../controllers/admin/eventDetailController");
const registrationFormController= require("../controllers/admin/registrationFormController");

const contactController= require("../controllers/admin/contactController")
const imageGalleryController= require("../controllers/admin/imageGalleryController")

const videoGalleryController= require("../controllers/admin/videoGalleryController")
const imageCategoryController= require("../controllers/admin/imageCategoryController")



// image upload
const multer = require("multer");
const { updateThought } = require("../controllers/admin/thoughtsController");

//Setting storage engine
const storageEngine = multer.diskStorage({
  destination: "./images",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});
//initializing multer
const upload = multer({
  storage: storageEngine,
});

////category start
router.post(
  "/adminLogin",
  adminAuthController.adminLogin
)

router.post(
  "/changePassword",
  adminAuthMiddleware.adminAuthentication,
  adminAuthController.changePassword
)

// states 
router.get(
  "/getALLState",
  adminAuthMiddleware.adminAuthentication,
  statesController.getALLState
);

router.post(
  '/thought',
  adminAuthMiddleware.adminAuthentication,
  updateThought
)

router.post(
  '/getUserList',
  adminAuthMiddleware.adminAuthentication,
  userController.getAllUser
)

router.get(
  '/changesUserStatus/:id',
  adminAuthMiddleware.adminAuthentication,
  userController.changesUserStatus
)
// user

// Event start 
router.post(
  '/add-blog',
  upload.single("image"),
  adminAuthMiddleware.adminAuthentication,
  blogController.addblog
)
router.delete(
  '/delete-blog/:id',
  adminAuthMiddleware.adminAuthentication,
  blogController.deleteblog
)
router.post(
  '/get-blog',
  adminAuthMiddleware.adminAuthentication,
  blogController.getblog
)
router.post(
  '/getrss-blog',
  adminAuthMiddleware.adminAuthentication,
  blogController.getRSSblog
)

router.post(
  '/getnew-blog',
  adminAuthMiddleware.adminAuthentication,
  blogController.getNewblog
)


router.post(
  '/update-blog',
  upload.single("image"),
  adminAuthMiddleware.adminAuthentication,
  blogController.updateblog
)
// end Event 
router.post(
  '/getmahapurush-blog',
  adminAuthMiddleware.adminAuthentication,
  blogController.getMahapurushblog
)
// posts 
router.post(
  '/addPosts',
  upload.single("image"),
  adminAuthMiddleware.adminAuthentication,
  createPostController.addPosts
)
router.delete(
  '/deletePost/:id',
  adminAuthMiddleware.adminAuthentication,
  createPostController.deletePost
)
router.post(
  '/getPosts',
  adminAuthMiddleware.adminAuthentication,
  createPostController.getPosts
)
router.post(
  '/updatePost',
  upload.single("image"),
  adminAuthMiddleware.adminAuthentication,
  createPostController.updatePost
)
// end posts 

// // event details 
// router.post(
//   '/addEventDetails',
//   adminAuthMiddleware.adminAuthentication,
//   eventDetailController.addEventDetails
// )
// router.delete(
//   '/deleteEventDetails/:id',
//   adminAuthMiddleware.adminAuthentication,
//   eventDetailController.deleteEventDetails
// )
// router.post(
//   '/getEventDetail',
//   adminAuthMiddleware.adminAuthentication,
//   eventDetailController.getEventDetail
// )
// router.post(
//   '/getEventDetailById/:id',
//   adminAuthMiddleware.adminAuthentication,
//   eventDetailController.getEventDetailById
// )
// router.post(
//   '/updateEventDetails',
//   adminAuthMiddleware.adminAuthentication,
//   eventDetailController.updateEventDetails
// )
// // end event details 

// registration 

router.post(
  '/getAllRegistration',
  adminAuthMiddleware.adminAuthentication,
  registrationFormController.getAllRegistration
)
router.delete(
  '/deleteRegistration/:id',
  adminAuthMiddleware.adminAuthentication,
  registrationFormController.deleteRegistration
)

// contact List 

router.post(
  '/getAllContacts',
  adminAuthMiddleware.adminAuthentication,
  contactController.getAllContacts
)
router.delete(
  '/deleteContact/:id',
  adminAuthMiddleware.adminAuthentication,
  contactController.deleteContact
)

// images 
router.post(
  '/addImage',
  upload.single("image"),
  adminAuthMiddleware.adminAuthentication,
  imageGalleryController.addImage
)
router.post(
  '/getImages',
  adminAuthMiddleware.adminAuthentication,
  imageGalleryController.getImages
)
router.delete(
  '/deleteImage/:id',
  adminAuthMiddleware.adminAuthentication,
  imageGalleryController.deleteImage
)
router.post(
  '/updateImage',
  upload.single("image"),
  adminAuthMiddleware.adminAuthentication,
  imageGalleryController.updateImage
)
// video 
router.post(
  '/addVideo',
  adminAuthMiddleware.adminAuthentication,
  videoGalleryController.addVideo
)
router.post(
  '/getVideo',
  adminAuthMiddleware.adminAuthentication,
  videoGalleryController.getVideo
)
router.delete(
  '/deleteVideo/:id',
  adminAuthMiddleware.adminAuthentication,
  videoGalleryController.deleteVideo
)
router.post(
  '/updateVideo',
  adminAuthMiddleware.adminAuthentication,
  videoGalleryController.updateVideo
)
// image category 
router.post(
  '/addImageCategory',
  adminAuthMiddleware.adminAuthentication,
  imageCategoryController.addImageCategory
)
router.post(
  '/getImageCategory',
  adminAuthMiddleware.adminAuthentication,
  imageCategoryController.getImageCategory
)
router.delete(
  '/deleteImageCategory/:id',
  adminAuthMiddleware.adminAuthentication,
  imageCategoryController.deleteImageCategory
)
router.post(
  '/updateImageCategory',
  adminAuthMiddleware.adminAuthentication,
  imageCategoryController.updateImageCategory
)
module.exports = router;
