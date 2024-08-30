const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema(
{
    role_id:{
        type: String,
    },
    role_name:{
        type: String,
    },
    obj_created_date:{
        type: String,
    },
    obj_created_user_id:{
        type: String,
    },
    obj_update_date:{
        type: String,
    },
    obj_update_user_id:{
        type: String,
    },
    company_id:{
        type: String,
    },
}
);
module.exports = roles = mongoose.model("roles", roleSchema);