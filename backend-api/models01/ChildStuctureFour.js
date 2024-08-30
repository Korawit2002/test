const mongoose = require("mongoose");

const ChildStuctureFourSchema = new mongoose.Schema({
    child_stucture_four_id: {
        type: String,
    },
    title: {
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
});
module.exports = child_stucture_fours = mongoose.model("child_stucture_fours", ChildStuctureFourSchema);