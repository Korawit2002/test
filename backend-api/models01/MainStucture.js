const mongoose = require("mongoose");


const minstuctureSchema = new mongoose.Schema({
    main_stucture_id: {
        type: String,
    },
    slug: {
        type: String,
    },
    title: {
        type: String,
    },
    meta_title: {
        type: String,
    },
    meta_description: {
        type: String,
    },
    icon: {
        type: String,
    },
    bg_color: {
        type: String,
    },
    obj_priority: {
        type: String,
    },
    obj_lang: {
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
   

});
module.exports = main_stuctures = mongoose.model("main_stuctures", minstuctureSchema);