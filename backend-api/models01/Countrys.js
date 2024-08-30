const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({

   country_id: {
    type: String,
  },
  name: {
    type: String,
  },
  enName: {
    type: String,
  },
  alpha2: {
    type: String,
  },
  alpha3: {
    type: String,
  },
  numeric_s: {
    type: String,
  },
});
module.exports = countrys = mongoose.model("countrys",CountrySchema);