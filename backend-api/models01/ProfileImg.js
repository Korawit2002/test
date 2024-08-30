 
 const { Binary } = require("mongodb");
 const mongoose = require("mongoose");
  const ProfileImgSchema = new mongoose.Schema(
  {
     file:{
         type: String
     },
      filename:{
          type: String,
      },
      originalname:{
          type: String,
      },
      content_type:{
          type: String,
      },
      size:{
          type: String,
      },
      user_id:{
         type: String,
     },
     company_id:{
         type: String,
     },
      statusDelete:{
         type: String,
     },
     createDate:{
         type: String,
     },
     updateDate:{
         type: String,
     }
  }
  );
  module.exports = profile_img = mongoose.model("profile_img", ProfileImgSchema);