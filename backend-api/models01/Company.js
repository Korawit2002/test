const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  company_id: {
    type: String,
  },
  company_name: {
    type: String,
  },
  obj_status: {
    type: String,
  },
  obj_created_date: {
    type: String,
  },
  obj_created_user_id: {
    type: String,
  },
  obj_update_date: {
    type: String,
  },
  obj_update_user_id: {
    type: String,
  }
});
module.exports = company = mongoose.model("company",companySchema);