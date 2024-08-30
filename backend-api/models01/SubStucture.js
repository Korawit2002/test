const mongoose = require("mongoose");

const substuctureSchema = new mongoose.Schema({
    sub_stucture_id: {
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
module.exports = sub_stuctures = mongoose.model("sub_stuctures", substuctureSchema);