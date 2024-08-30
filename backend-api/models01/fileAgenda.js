 
 const mongoose = require("mongoose");
 const fileAgendaSchema = new mongoose.Schema(
 {
    file_agenda_id:{
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
 module.exports = file_agenda = mongoose.model("file_agenda", fileAgendaSchema);