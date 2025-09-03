const express = require("express");
const router = express.Router();
// const eventController = require('../controllers/admin/eventController');
const createPostController = require('../controllers/admin/createPostController');
const eventDetailController = require("../controllers/admin/eventDetailController")
const statesController = require("../controllers/admin/stateController");
const districtTehsilController= require("../controllers/admin/districtTehsilController");
const registrationFormController= require("../controllers/admin/registrationFormController");
const contactController= require("../controllers/admin/contactController")
const imageGalleryController= require("../controllers/admin/imageGalleryController")
const videoGalleryController= require("../controllers/admin/videoGalleryController")
const imageCategoryController= require("../controllers/admin/imageCategoryController")
const blogController = require("../controllers/admin/blogController");



// image upload
const multer = require("multer");

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

// router.post(
//   '/getEvent',
//   eventController.getEvent
// )
router.post(
  '/getPosts',
  createPostController.getPosts
)
// router.post(
//   '/getEventDetailById/:id',
//   eventDetailController.getEventDetailById
// )
router.get(
  "/getALLState",
  statesController.getALLState
);
router.get(
  "/getAllDistrictTehsil",
  districtTehsilController.getAllDistrictTehsil
);
router.post(
  '/addRegistration',
  upload.single("profileImage"),
  registrationFormController.addRegistration
)
router.post(
  '/getAllRegistration',
  registrationFormController.getAllRegistration
)
router.post(
  '/addContact',
  contactController.addContact
)
router.post(
  '/get-blog',
  blogController.getblog
)
router.post(
  '/getrss-blog',
  blogController.getRSSblog
)
router.post(
  '/getmahapurush-blog',
  blogController.getMahapurushblog
)
router.post(
  '/getnew-blog',
  blogController.getNewblog
)
router.post(
  '/getblogbyslug',
  blogController.getBlogBySlug
)
router.post(
  '/getImages',
  imageGalleryController.getImages
)
router.post(
  '/getVideo',
  videoGalleryController.getVideo
)

router.post(
  '/getImageCategory',
  imageCategoryController.getImageCategory
)
router.get(
  '/getHomeBannerBlogs',
  blogController.getHomeBannerBlogs
)



module.exports = router;
