 
 const mongoose = require("mongoose");
 const companyPhotoSchema = new mongoose.Schema(
 {
    partners_id:{
         type: String,
     },
     pseudo_code:{
         type: String,
     },
     filename:{
         type: String,
     },
     originalname:{
         type: String,
     },
     type:{
         type: String,
     },
     filename:{
         type: String,
     },
     size:{
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
    },
    createBy:{
        type: String,
    },
    updateBy:{
        type: String,
    },
    deleteBy:{
        type: String,
    },
 }
 );
 module.exports = companyPhoto = mongoose.model("company_photos", companyPhotoSchema);