const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
  club_id: {
    type: String,
  },
  club_name: {
    type: String,
  },
  address: {
    type: String,
  },
  subdistrict: {
    type: String,
  },
  district: {
    type: String,
  },
  province: {
    type: String,
  },
  post_number: {
    type: String,
  },
  manager: {
    type: String,
  },
  contact_number: {
    type: String,
  }
});
module.exports = mongoose.model("club", clubSchema, "club");