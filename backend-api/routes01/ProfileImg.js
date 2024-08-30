const express = require("express");
const router = express.Router();

const {uploadProfileImage,show_profile,remove_profile,uploadProfileImageAdmin,show_profile_admin,remove_profile_admin} = require("../controllers/profile_image");
const {profile_img} = require("../middleware/profileimg");

router.post("/api/v1/uploadProfileImage",profile_img,uploadProfileImage);
router.get("/api/v1/show_profile/:user_id",show_profile);
router.post("/api/v1/remove_profile/",remove_profile);

//admin
router.post("/api/v1/uploadProfileImageAdmin",profile_img,uploadProfileImageAdmin);
router.get("/api/v1/show_profile_admin/:admin_id",show_profile_admin);
router.post("/api/v1/remove_profile_admin/",remove_profile_admin);


module.exports = router;