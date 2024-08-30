const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
 
partners_id: {
    type: String,
  },
  pseudo_code: {
    type: String,
  },
  number: {
    type: String,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  nickname: {
    type: String,
  },
  position: {
    type: String,
  },
  department: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  status_delete: {
    type:String,
  },
  auto_id: {
    type:String,
  },
  createdBy: {
    type:String,
  },
  updatedBy: {
    type:String,
  },
  deletedBy: {
    type:String,
  },
  createdAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  },
});
module.exports = contact_person = mongoose.model("contact_persons",ContactSchema);