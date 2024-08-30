const mongoose = require("mongoose");

const attendeesSchema = new mongoose.Schema({
    attendees_id: {
        type: String,
    },
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
    main_stucture: {
        type: String,
    },
    sub_stucture: {
        type: String,
    },
    child_stucture: {
        type: String,
    },
    email: {
        type: String,
    },
    phone_number: {
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
    status_response: {//มาประชุม/ออนไลน์/ไม่มาประชุม
        type: String,
    }
    ,status_certification: {//รับรองการประชุม /รับรองไม่รับรอง
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
    position_name:{ //ตำแหน่ง
        type: String,
    },
    status:{ 
        type: String,
    },
    attendee_order:{
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
module.exports = attendees = mongoose.model("attendees", attendeesSchema);