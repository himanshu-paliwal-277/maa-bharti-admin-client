const express = require("express");
const router = express.Router();
const authMiddleWare = require("../middleware/auth");
const authController = require("../controllers/admin/authController");


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

router.post(
  "/change-password",
  authMiddleWare.authenticateToken,
  authController.changePassword
);
router.get(
  "/view-profile",
  authMiddleWare.authenticateToken,
  authController.viewProfile
);

router.post(
  "/update-profile",
  upload.single("profileImage"),
  authMiddleWare.authenticateToken,
  authController.updateInfo
);
router.post(
  "/forgot-password",
  authController.forgotPassword
);





// order end 
module.exports = router;
