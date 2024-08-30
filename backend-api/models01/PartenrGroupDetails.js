const mongoose = require("mongoose");

const groupDetailSchema = new mongoose.Schema(
{
    pseudo_code:{
        type: String,
    },
    partners_id:{
        type: String,
    },
    group_id:{
        type: String,
    },
    group_name:{
        type: String,
    },
    sub_group_id:{
        type: String,
    },
    sub_group_name:{
        type: String,
    },
   
}
);
module.exports = partenr_group_detail = mongoose.model("partenr_group_details", groupDetailSchema);