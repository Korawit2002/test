const mongoose = require("mongoose");

const subCustomerGroupsSchema = new mongoose.Schema({
  sub_group_id: {
    type: String,
  },
  group_id: {
    type: String,
  },
  sub_group_name: {
    type: String,
  },
});
module.exports = sub_customer_groups = mongoose.model("sub_customer_groups", subCustomerGroupsSchema);