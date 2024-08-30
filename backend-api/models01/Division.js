const mongoose = require("mongoose");

const DivisionSchema = new mongoose.Schema({
code: {
    type: String,
  },
  name_th: {
    type: String,
  },
  name_en: {
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
module.exports = division = mongoose.model("division", DivisionSchema);
