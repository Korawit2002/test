const mongoose = require("mongoose");

const meetingDraftSchema = new mongoose.Schema({
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
    obj_state: {
        type: String,
    },
    obj_created_date: {
        type: String,
    },
    obj_created_user_id: {
        type: String,
    },
    obj_modified_date: {
        type: String,
    },
    obj_modified_user_id: {
        type: String,
    },
    company_id: {
        type: String,
    },
});
module.exports = meeting_draft = mongoose.model("meeting_draft", meetingDraftSchema);