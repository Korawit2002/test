const mongoose = require("mongoose");

const currentQuorumSchema = new mongoose.Schema({
    current_id: {
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
        type : String,
    }
});
module.exports = current_quorum = mongoose.model("current_quorum", currentQuorumSchema);