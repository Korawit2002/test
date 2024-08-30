

const mongoose = require("mongoose");

const meetingTypeSchema = new mongoose.Schema({
    type_id: {
        type: String,
    },
    type_name: {
        type: String,
    },
    obj_created_date: {
        type: String,
    },
    obj_created_user_id: {
        type: String,
    },
    obj_update_date: {
        type: String,
    },
    obj_update_user_id: {
        type: String,
    },
    company_id: {
        type: String,
    },

});
module.exports = meeting_type = mongoose.model("meeting_type", meetingTypeSchema);