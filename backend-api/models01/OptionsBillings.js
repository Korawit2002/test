const mongoose = require("mongoose");
const OptionsBillingsSchema = new mongoose.Schema(
{
    options_billing_id:{
        type: String,
    },
    options_billing_name:{
        type: String,
    },
}
);
module.exports = options_billing = mongoose.model("options_billings", OptionsBillingsSchema);