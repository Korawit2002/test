 
 const { Binary } = require("mongodb");
const mongoose = require("mongoose");
 const CommandFileSchema = new mongoose.Schema(
 {
    
     meeting_id:{
         type: String,
     },
    description:{
        type: String,
    },
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
    command_order:{
        type: String,
    },
 }
 );
 module.exports = command_file = mongoose.model("command_file", CommandFileSchema);