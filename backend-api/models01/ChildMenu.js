const mongoose = require("mongoose");

const childmenuSchema = new mongoose.Schema({
    child_menu_id: {
        type: String,
    },
    title: {
        type: String,
    },
    sub_menu_id: {
        type: String,
    },
    menu_id: {
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
module.exports = child_menu = mongoose.model("child_menu", childmenuSchema);