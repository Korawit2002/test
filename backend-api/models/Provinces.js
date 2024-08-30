const mongoose = require("mongoose");

const provincesSchema = new mongoose.Schema(
{
    id:{
        type: String,
    },
    name_th:{
        type: String,
    },
    name_en:{
        type: String,
    },
    geography_id:{
        type: String,
    },
    created_at:{
        type: String,
    },
    updated_at:{
        type: String,
    },
}
);
module.exports = provinces = mongoose.model("thai_provinces", provincesSchema);