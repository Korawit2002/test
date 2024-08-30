const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({

 meeting_id: {
    type: String,
  },
  sub_agenda_id: {
    type: String,
  },
  text_comment: {
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
child_stucture_four_name: {
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

});
module.exports = comments = mongoose.model("comments",CommentsSchema);