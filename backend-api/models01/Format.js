const mongoose = require("mongoose");

const FormatsSchema = new mongoose.Schema({

  formats_id: {
    type: String,
  },
  formats_name: {
    type: String,
  },
  stucture: {
    type: String,
  },
  meeting_id: {
    type: String,
  }
});
module.exports = table_formats = mongoose.model("table_formats",FormatsSchema);