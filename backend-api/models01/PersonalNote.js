const mongoose = require("mongoose");
const personalNoteSchema = new mongoose.Schema(
{
    meeting_id: {
        type: String,
    },
    user_id:{
        type: String,
    },
    note:{
        type: String,
    },
    company_id:{
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
module.exports = personal_note = mongoose.model("personal_note", personalNoteSchema);