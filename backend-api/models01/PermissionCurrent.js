const mongoose = require("mongoose");
const PermissionCurrentSchema = new mongoose.Schema(
{
    meeting_id: {
        type: String,
    },
    user_id:{
        type: String,
    },
    obj_created_date: {
        type: String,
    },
    obj_update_date: {
        type: String,
    },
}
);
module.exports = pms_current = mongoose.model("pms_current", PermissionCurrentSchema);