const mongoose = require("mongoose");

const customerGroupsSchema = new mongoose.Schema({
  group_id: {
    type: String,
  },
  group_code: {
    type: String,
  },
  group_name: {
    type: String,
  },
 
});
module.exports = customer_group = mongoose.model("customer_groups", customerGroupsSchema);
