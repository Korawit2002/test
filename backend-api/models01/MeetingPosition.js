

const mongoose = require("mongoose");

const meetingPositionSchema = new mongoose.Schema({
    position_id: {
        type: String,
    },
    position_name: {
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
    company_id:{
        type: String,
    }
   

});
module.exports = meeting_position = mongoose.model("meeting_position", meetingPositionSchema);