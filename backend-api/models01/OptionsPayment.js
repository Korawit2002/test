const mongoose = require("mongoose");
const OptionsPaymentSchema = new mongoose.Schema(
{
    options_payment_id:{
        type: String,
    },
    options_payment_name:{
        type: String,
    },
}
);
module.exports = options_payment = mongoose.model("options_payments", OptionsPaymentSchema);