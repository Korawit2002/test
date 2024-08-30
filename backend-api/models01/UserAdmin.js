const mongoose = require("mongoose");
const Schema = mongoose.Schema
ObjectId = Schema.ObjectId
const userAdminSchema = new mongoose.Schema({
    admin_id: {
        type: String,
    },
    title: {
        type: String,
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
    },
    phone_number: {
        type: String,
    },
    spare_numbe: {
        type: String,
    },
    address: {
        type: String,
    },
    province_id: {
        type: String,
    },
    province: {
        type: String,
    },
    amphures_id: {
        type: String,
    },
    amphures: {
        type: String,
    },
    tombons_id: {
        type: String,
    },
    tombons: {
        type: String,
    },
    zip_code: {
        type: String,
    },
    line_id: {
        type: String,
    },
    profile: {
        type: String,
    },

    main_stucture_id: {
        type: String,
    },
    main_stucture_name: {
        type: String,
    },
    sub_stucture_id: {
        type: String,
    },
    sub_stucture_name: {
        type: String,
    },

    child_stucture_id: {
        type: String,
    },
    child_stucture_name: {
        type: String,
    },
    child_stucture_four_id: {
        type: String,
    },
    child_stucture_four_name: {
        type: String,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    random: {
        type: String,
    },
    status: {
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
    position_meeting_name: {
        type: String,
    },
    position_meeting: {
        type: String,
    },
    role_id: {
        type: String,
    },
    role_name: {
        type: String,
    },
    delegate_position: {
        type: String,
    },
    status_login: {
        type: String,
    },
});
module.exports = users_admin = mongoose.model("users_admin", userAdminSchema);