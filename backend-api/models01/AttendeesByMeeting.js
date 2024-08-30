const mongoose = require("mongoose");

const attendeesMeetingSchema = new mongoose.Schema({
    meeting_id: {
        type: String,
    },
    user_id: {
        type: String,
    },
    title: {
        type: String,
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    name_listname: {
        type: String,
    },
    email: {
        type: String,
    },
    obj_created_date: {
        type: String,
    },
    obj_update_date: {
        type: String,
    },
    status_response: {//มาประชุม/ออนไลน์/ไม่มาประชุม
        type: String,
    }
    ,status_certification: {//รับรองการประชุม /รับรองไม่รับรอง
        type: String,
    },
    position_name:{
        type: String,
    },
    delegate_title:{ 
        type: String,

    },
    delegate_name:{ //ชื่อผู้เข้าประชุมแทน
        type: String,

    },
    delegate_lastname:{ //ชื่อผู้เข้าประชุมแทน
        type: String,

    },

    delegate_email:{ //email เข้าประชุมแทน
        type: String,

    },
    delegate_position:{ //ตำแหน่งเข้าประชุมแทน
        type: String,
    },
    status:{ 
        type: String,
    },
    permission_current:{ //สิทธ์ปัจจุบัน
        type: String,
    },
    type_attendees:{ //ผู้เข้าร่วม/องค์ประชุม
        type: String,
    },
    status_request:{ 
        type: String,
    },
    user_id_delegate: {
        type: String,
    },
    note:{
        type: String,

    }

});
module.exports = attendees_meetings = mongoose.model("attendees_meetings", attendeesMeetingSchema);