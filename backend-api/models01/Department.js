const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
code: {
    type: String,
  },
  name_th: {
    type: String,
  },
  name_en: {
    type: String,
  },
 
  createdAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  },

});
module.exports = department = mongoose.model("department", DepartmentSchema);
