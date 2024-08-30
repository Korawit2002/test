const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
    meeting_id: {
        type: String,
    },
    type_id: {
        type: String,
    },
    meeting_name: {
        type: String,
    },
    meeting_date: {
        type: String,
    },
    time_start: {
        type: String,
    },
    time_end: {
        type: String,
    },
    meeting_room: {
        type: String,
    },
    location: {
        type: String,
    },
    note: {
        type: String,
    },
    conference: {
        type: String,
    },
    url_conference: {
        type: String,
    },
    status: {
        type: String,
    },
    obj_status: {
        type: String,
    },
    priority: {
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
    request_user: {
        type: String,
    },
});
module.exports = meeting = mongoose.model("meetings", meetingSchema);