const mongoose = require("mongoose");

const submenuSchema = new mongoose.Schema({
    sub_menu_id: {
        type: String,
    },
    title: {
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
module.exports = sub_menu = mongoose.model("sub_menu", submenuSchema);