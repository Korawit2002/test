const mongoose = require("mongoose");
const setupEmailSchema = new mongoose.Schema(
{
    user_id:{
        type: String,
    },
    email_name:{
        type: String,
    },
    sender_name:{
        type: String,
    },
    company_id:{
        type: String,
    },
    obj_created_date:{
        type: String,
    },
    obj_created_date:{
        type: String,
    },
}
);
module.exports = setup_emails = mongoose.model("setup_emails", setupEmailSchema);